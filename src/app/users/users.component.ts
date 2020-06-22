import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Users } from './Users';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title: string = 'Mflow - Gerenciar usuários'

  isConfigOpen = false;
  isAddUserOpen = false;
  isEditUserOpen = false;
  isDeleteUserOpen = false;
  isDeleteSelectedUsersOpen = false;

  selectedIndex: number = -1;
  selectedUser: Users = new Users();

  service: UsersService;

  userToInsert: Users = new Users();

  users: Users[] = [
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
  
  constructor(public httpClient: HttpClient) { }

  ngOnInit(): void {
    this.service = new UsersService(this.httpClient);
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(
      data => {
        this.users = data;
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao listar usuários ' + error.message)
      }
    )    
  }

  save(): void {
    this.service.save(this.userToInsert).subscribe(
      data => {
        alert('Usuário inserido com sucesso!');
        this.findAll();
        this.isAddUserOpen = false;
        this.userToInsert = new Users();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao inserir o usuário ' + error.message);
      }
    );
  }

  update(id: number, confirmed: Boolean = false): void {
    this.selectUserById(id);
    if (confirmed === false) {
      this.isEditUserOpen = true;
      return;
    }
    this.service.update(id, this.selectedUser).subscribe(
      data => {
        alert('Usuário editado com sucesso!');
        this.findAll();
        this.isEditUserOpen = false;
        this.selectedIndex = -1;
        this.selectedUser = new Users();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao editar o usuário ' + error.message);
      }
    );
  }

  delete(id: number, confirmed: Boolean = false): void {
    this.selectUserById(id);
    if (confirmed === false) {
      this.isDeleteUserOpen = true;
      return;
    }
    this.service.delete(id).subscribe(
      data => {
        alert('Usuário removido com sucesso!');
        this.findAll();
        this.isDeleteUserOpen = false;
        this.selectedIndex = -1;
        this.selectedUser = new Users();
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao remover o usuário ' + error.message);
      }
    );
  }

  selectUserById(id: number): void {
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.selectedIndex = i;
        this.selectedUser = this.users[i];
      }
    }
  }

  alerta() {
    alert('ação')
  }

}
