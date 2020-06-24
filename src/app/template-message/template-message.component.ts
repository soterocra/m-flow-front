import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Template } from './Template';
import { TemplateService } from './template.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-template-message',
  templateUrl: './template-message.component.html',
  styleUrls: ['./template-message.component.css']
})
export class TemplateMessageComponent implements OnInit {

  title: string = 'Mflow - Gerenciar templates'

  isConfigOpen = false;
  isAddTemplateOpen = false;
  isEditTemplateOpen = false;
  isDeleteTemplateOpen = false;
  isDeleteSelectedTemplateOpen = false;

  selectedIndex: number = -1;
  selectedTemplate: Template = new Template();

  service: TemplateService;

  templateToInsert: Template = new Template();

  templates: Template[] = [
    // {
    //   "id": 1,
    //   "name": "Maria",
    //   "email": "sotero@crudtec.com.br",
    //   "password": "123456",
    //   "profile": "ADMINISTRATOR"
    // },
    // {
    //   "id": 2,
    //   "name": "João",
    //   "email": "sotero@crudtec.com.br",
    //   "password": "123456",
    //   "profile": "OPERATOR"
    // }
  ]
  
  constructor(public httpClient: HttpClient, public auth: AuthService) { }

  ngOnInit(): void {
    this.service = new TemplateService(this.httpClient);
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(
      data => {
        this.templates = data;
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao listar templates ' + error.message)
      }
    )    
  }

  save(): void {
    this.service.save(this.templateToInsert).subscribe(
      data => {
        alert('Template inserido com sucesso!');
        this.findAll();
        this.isAddTemplateOpen = false;
        this.templateToInsert = new Template();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao inserir o template ' + error.message);
      }
    );
  }

  update(id: number, confirmed: Boolean = false): void {
    this.selectUserById(id);
    if (confirmed === false) {
      this.isEditTemplateOpen = true;
      return;
    }
    this.service.update(id, this.selectedTemplate).subscribe(
      data => {
        alert('Template editado com sucesso!');
        this.findAll();
        this.isEditTemplateOpen = false;
        this.selectedIndex = -1;
        this.selectedTemplate = new Template();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao editar o template ' + error.message);
      }
    );
  }

  delete(id: number, confirmed: Boolean = false): void {
    this.selectUserById(id);
    if (confirmed === false) {
      this.isDeleteTemplateOpen = true;
      return;
    }
    this.service.delete(id).subscribe(
      data => {
        alert('Template removido com sucesso!');
        this.findAll();
        this.isDeleteTemplateOpen = false;
        this.selectedIndex = -1;
        this.selectedTemplate = new Template();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao remover o template ' + error.message);
      }
    );
  }

  selectUserById(id: number): void {
    for (var i = 0; i < this.templates.length; i++) {
      if (this.templates[i].id === id) {
        this.selectedIndex = i;
        this.selectedTemplate = this.templates[i];
      }
    }
  }

  alerta() {
    alert('ação')
  }

}
