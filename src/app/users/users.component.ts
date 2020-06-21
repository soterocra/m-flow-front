import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string = 'Mflow - Gerenciar usuários'

  users = [
    {
      "name": "Maria",
      "email": "sotero@crudtec.com.br",
      "password": "123456",
      "profile": "ADMINISTRATOR"
    },
    {
      "name": "João",
      "email": "sotero@crudtec.com.br",
      "password": "123456",
      "profile": "OPERATOR"
    }
  ]
  
  constructor() { }

  ngOnInit(): void {
  }

}
