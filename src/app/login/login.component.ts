import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UsersService } from '../users/users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  service: UsersService;

  form: any;

  email: string;
  password: string;

  constructor(private fb: FormBuilder, private myRoute: Router, private auth: AuthService, public httpClient: HttpClient) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.service = new UsersService(this.httpClient);
  }

  login() {
    if (this.form.valid) {
      this.findAll();
    } else {
      alert("Digite o seu e-mail válido e senha");
    }
  }

  findAll(): void {
    this.service.findAll().subscribe(
      data => {
        let userFind = false;

        for (var i = 0; i < data.length; i++) {
          if (data[i].email === this.email && data[i].password === this.password) {
            this.auth.sendToken(this.form.value.email)
            this.myRoute.navigate(["chat"]);
            userFind = true;
          }
        }

        if (!userFind) {
          alert("Usuário e/ou senha incorrentos ou inexistentes. Tente novamente.")
        }
      },
      (error: HttpErrorResponse) => {
        alert('Erro ao listar usuários ' + error.message)
      }
    )    
  }
}
