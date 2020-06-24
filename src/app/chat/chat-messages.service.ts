import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';
import { MessagesRoot } from './Messages';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MessagesService extends DataService<MessagesRoot> {

  constructor(http: HttpClient) {
    super(http, 'whatsapp/messages/');
  }

}