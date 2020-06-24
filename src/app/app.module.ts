import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NameTransformPipe } from './app.pipe';
import { InitialsNameTransformPipe } from './app.pipe2';
import { AppRoutingModule } from './app.routing';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { TemplateMessageComponent } from './template-message/template-message.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './users/users.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    NameTransformPipe,
    InitialsNameTransformPipe,
    ModalComponent,
    LoginComponent,
    ChatComponent,
    UsersComponent,
    TemplateMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UsersService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
