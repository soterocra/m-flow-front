import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NameTransformPipe } from './app.pipe';
import { InitialsNameTransformPipe } from './app.pipe2';

@NgModule({
  declarations: [
    AppComponent,
    NameTransformPipe,
    InitialsNameTransformPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
