import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NameTransformPipe } from './app.pipe';
import { InitialsNameTransformPipe } from './app.pipe2';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NameTransformPipe,
    InitialsNameTransformPipe,
    ModalComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
