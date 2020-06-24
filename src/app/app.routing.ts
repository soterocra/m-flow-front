import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { TemplateMessageComponent } from './template-message/template-message.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'template-message', component: TemplateMessageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}