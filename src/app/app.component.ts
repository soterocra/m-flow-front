import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mflow-chat';

  menuOpen = true;

  selectedIndex: number = -1;
  selectedContact: any = {};

  message: any = {};

  hirerName: string = 'Conceito Ateliê';
  hirerLogo: string = '../assets/img/logo-coneito.png';

  expanded = true;

  contacts = [
    {
      "id": "3a95ada53s127b62fb178",
      "userId": "56217251",
      "userName": "soterocra",
      "name": "Rafael Sotero",
      "preferredName": "",
      "apt2ActiveMessage": true,
      "channel": "WhatsApp",
      "lastMessage": "Olá, gostaria de verificar o status do meu pedido.",
      "active": true,
      "telephones": [
        {
          "id": "21dds87190981asd23",
          "ddi": 55,
          "ddd": 34,
          "phone": "996480888",
          "description": "Telefone capturado do whatsapp automaticamente",
          "hot": true,
          "active": true,
        }
      ]
    },
    {
      "id": "3a95ada53127b62fb178",
      "userId": "56217251",
      "userName": "soterocra",
      "name": "Rafael Sotero",
      "preferredName": "",
      "apt2ActiveMessage": true,
      "channel": "WhatsApp",
      "lastMessage": "Olá, gostaria de verificar o status do meu pedido.",
      "active": true,
      "telephones": [
        {
          "id": "21dds87190981asd23",
          "ddi": 55,
          "ddd": 34,
          "phone": "996480888",
          "description": "Telefone capturado do whatsapp automaticamente",
          "hot": true,
          "active": true,
        }
      ]
    },
    {
      "id": "3a95ada587b6d62fb178",
      "userId": "56215312",
      "userName": "paty",
      "name": "Patricia M. S. R.",
      "preferredName": "",
      "apt2ActiveMessage": false,
      "active": true,
      "channel": "Telegram",
      "lastMessage": "Certo, nesse caso o qual o valor do blazer? Poderia me informar por favor?",
      "telephones": [
        {
          "id": "21dds87190123asd23",
          "ddi": 55,
          "ddd": 34,
          "phone": "981231232",
          "description": "Telefone cadastrado no fluxo",
          "hot": true,
          "active": true,
        }
      ]
    },
    {
      "id": "3a95ada587b09092fb178",
      "userId": "562134551",
      "userName": "",
      "name": "",
      "preferredName": "",
      "apt2ActiveMessage": false,
      "active": true,
      "channel": "Whatsapp",
      "lastMessage": "Pode por favor me passar para o seu gerente?",
      "telephones": []
    },
    {
      "id": "3a95ada587123d62fb178",
      "userId": "56213222",
      "userName": "wladteixeira",
      "name": "Wladimir Teixeira",
      "preferredName": "Wlad",
      "apt2ActiveMessage": true,
      "active": true,
      "channel": "Telegram",
      "lastMessage": "Muito bom, obrigado por tudo.",
      "telephones": []
    }
  ]

  messages = [
    {
      "id": "3a95ada53127b62fb178",
      "messages": [
        {
          "from": "3a95ada53127b62fb178",
          "content": "Olá, quero falar no atendimento.",
          "timestamp": 829138912
        },
        {
          "from": "admin",
          "content": "Estou aqui, em que posso ajudar?",
          "timestamp": 291381232
        }
      ]
    },
    {
      "id": "3a95ada587b6d62fb178",
      "messages": [
        {
          "from": "3a95ada587b6d62fb178",
          "content": "Olá, quero falar no atendimento.",
          "timestamp": 829138912
        },
        {
          "from": "admin",
          "content": "Estou aqui, em que posso ajudar?",
          "timestamp": 291381232
        },
        {
          "from": "admin",
          "content": "Olá?",
          "timestamp": 291381232
        },
        {
          "from": "admin",
          "content": "Por falta de comunicação, encerro esse chat.",
          "timestamp": 291381232
        }
      ]
    }
]

  selectContactById(id: string) {
    for (var i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id === id) {
        this.selectedIndex = i;
        this.selectedContact = this.contacts[i];
      }
    }

    let messagesFound = false;
    for (var i = 0; i < this.messages.length; i++) {      
      if (this.messages[i].id === id) {
        this.message = this.messages[i];
        messagesFound = true;
      }
    }

    if (!messagesFound) {
      this.message = {}
    }
  }

  getContactNameInitials(contact) {
    return contact.name;
  }

  toggleExpand() {
    this.expanded = !this.expanded;
  }

}
