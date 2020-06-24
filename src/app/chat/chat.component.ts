import { Component, OnInit, OnChanges, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ContactsService } from './chat-contacts.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { interval, Subscription } from 'rxjs';

import { Contact } from './Contacts';
import { MessagesService } from './chat-messages.service';
import { MessagesRoot } from './Messages';
import { ReplyService } from './chat-reply.service';
import { Reply } from './Reply';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  title = 'mflow-chat';
  
  @ViewChild('filterInput') filterInput: ElementRef;
  @ViewChild('writedMessageInput') writedMessageInput: ElementRef;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  subscription: Subscription;

  menuOpen = true;
  forceMenuOpenedStyle: boolean = true;
  matcher: MediaQueryList;
  
  selectedIndex: number = -1;
  selectedContact: any = {};
  
  message: any = {};
  
  hirerName: string = 'Conceito Ateliê';
  hirerLogo: string = '../assets/img/logo-coneito.png';
  
  searchTerm: any;

  contactsFiltered: Contact[];
  
  isCloseConversationOpen = false;
  isConfigOpen = false;

  serviceContacts: ContactsService;
  serviceMessages: MessagesService;
  serviceReply: ReplyService;

  writedMessage: string;

  constructor(public mediaMatcher: MediaMatcher, public httpClient: HttpClient) {}

  ngOnInit(): void {    
    this.matcher = this.mediaMatcher.matchMedia('(min-width: 735px)');
    this.matcher.addListener(this.myListener);
    this.serviceContacts = new ContactsService(this.httpClient);
    this.serviceMessages = new MessagesService(this.httpClient);
    this.serviceReply = new ReplyService(this.httpClient);
    this.findAllContacts();

    const source = interval(10000);
    this.subscription = source.subscribe(val => this.findAllContacts());  
  }

  ngOnDestroy() {
    this.matcher.removeListener(this.myListener);
    this.subscription.unsubscribe();
  }

  myListener(event) {
    console.log(event.matches);
    console.log(this.menuOpen);
    this.forceMenuOpenedStyle = !event.matches;
    // console.log( ? 'match' : 'no match');
  }

  // contacts = [
    // {
    //   "id": "3a95ada53127b62fb178",
    //   "userId": "8989122",
    //   "userName": "soterocra",
    //   "name": "Rafael Sotero",
    //   "preferredName": "",
    //   "apt2ActiveMessage": true,
    //   "channel": "WhatsApp",
    //   "lastMessage": "Olá, gostaria de verificar o status do meu pedido.",
    //   "active": true,
    //   "telephones": [
    //     {
    //       "id": "21dds87190981asd23",
    //       "ddi": 55,
    //       "ddd": 34,
    //       "phone": "996480888",
    //       "description": "Telefone capturado do whatsapp automaticamente",
    //       "hot": true,
    //       "active": true,
    //     }
    //   ]
    // },
    // {
    //   "id": "3a95ada587b6d62fb178",
    //   "userId": "56215312",
    //   "userName": "paty",
    //   "name": "Patricia M. S. R.",
    //   "preferredName": "",
    //   "apt2ActiveMessage": false,
    //   "active": true,
    //   "channel": "Telegram",
    //   "lastMessage": "Certo, nesse caso o qual o valor do blazer? Poderia me informar por favor?",
    //   "telephones": [
    //     {
    //       "id": "21dds87190123asd23",
    //       "ddi": 55,
    //       "ddd": 34,
    //       "phone": "981231232",
    //       "description": "Telefone cadastrado no fluxo",
    //       "hot": true,
    //       "active": true,
    //     }
    //   ]
    // },
    // {
    //   "id": "3a95ada587b09092fb178",
    //   "userId": "562134551",
    //   "userName": "",
    //   "name": "",
    //   "preferredName": "",
    //   "apt2ActiveMessage": false,
    //   "active": true,
    //   "channel": "Whatsapp",
    //   "lastMessage": "Pode por favor me passar para o seu gerente?",
    //   "telephones": []
    // },
    // {
    //   "id": "3a95ada587123d62fb178",
    //   "userId": "56213222",
    //   "userName": "wladteixeira",
    //   "name": "Wladimir Teixeira",
    //   "preferredName": "Wlad",
    //   "apt2ActiveMessage": true,
    //   "active": true,
    //   "channel": "Telegram",
    //   "lastMessage": "Muito bom, obrigado por tudo.",
    //   "telephones": []
    // }
  // ]

  contacts: Contact[];

  // messages = [
  //   {
  //     "userId": "3a95ada53127b62fb178",
  //     "messages": [
  //       {
  //         "from": "3a95ada53127b62fb178",
  //         "content": "Olá, quero falar no atendimento.",
  //         "timestamp": 829138912
  //       },
  //       {
  //         "from": "admin",
  //         "content": "Estou aqui, em que posso ajudar?",
  //         "timestamp": 291381232
  //       }
  //     ]
  //   },
  //   {
  //     "userId": "whatsapp:+553496480888",
  //     "messages": [
  //       {
  //         "from": "whatsapp:+553496480888",
  //         "content": "Olá, quero falar no atendimento.",
  //         "timestamp": 829138912
  //       },
  //       {
  //         "from": "admin",
  //         "content": "Estou aqui, em que posso ajudar?",
  //         "timestamp": 291381232
  //       },
  //       {
  //         "from": "admin",
  //         "content": "Olá?",
  //         "timestamp": 291381232
  //       },
  //       {
  //         "from": "admin",
  //         "content": "Por falta de comunicação, encerro esse chat.",
  //         "timestamp": 291381232
  //       }
  //     ]
  //   }
  // ]

  messages: MessagesRoot[];

  findAllContacts(): void {
    this.serviceContacts.findAll().subscribe(
      data => {
        this.contacts = data;
        this.contactsFiltered = this.contacts;
        this.findAllMessages();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao listar contatos ' + error.message)
      }
    )    
  }

  findAllMessages(): void {
    this.serviceMessages.findAll().subscribe(
      data => {
        this.messages = data;
        // console.log(this.selectedContact);
        if (this.selectedContact != null && this.selectedIndex >= 0) {
          this.selectContactById(this.selectedContact.userId)
          this.scrollToBottom();
        } 
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao listar mensagens ' + error.message)
      }
    )    
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  
  selectContactById(id: string) {
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].userId === id) {
        this.selectedIndex = i;
        this.selectedContact = this.contacts[i];
      }
    }

    let messagesFound = false;
    for (var i = 0; i < this.messages.length; i++) {      
      if (this.messages[i].userId === id) {
        this.message = this.messages[i];
        messagesFound = true;
      }
    }

    if (!messagesFound) {
      this.message = {}
    }

    this.menuOpen = false;
  }

  getContactNameInitials(contact) {
    return contact.name;
  }

  search(): void {
    this.menuOpen = true;
    this.filterInput.nativeElement.focus();
    let term = this.searchTerm || "";
    this.contactsFiltered = this.contacts.filter(function(item) {
      return (item.userName.toLowerCase().indexOf(term.toLowerCase()) >= 0 || 
              item.userId.toLowerCase().indexOf(term.toLowerCase()) >= 0 ||
              item.lastMessage.toLowerCase().indexOf(term.toLowerCase()) >= 0);
    })
    // this.filterInput.nativeElement.select();
  }

  alerta() {
    alert('ação')
  }

  showNameAndLastMessage(): Boolean {
    return this.menuOpen || this.forceMenuOpenedStyle;
  }

  reply() {
    
    let reply: Reply = new Reply();
    reply.Body = this.writedMessage;
    reply.From = 'whatsapp:+553131810689';
    reply.To = this.selectedContact.userId;

    this.serviceReply.save(reply).subscribe(
      data => {
        this.writedMessageInput.nativeElement.value = "";
        this.findAllMessages();
        console.log('Mensagem enviada com sucesso.')
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao enviar a mensagem ' + error.message);
      }
    );
  }

}
