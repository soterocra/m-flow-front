import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';
import { Reply } from './Reply';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReplyService extends DataService<Reply> {

  constructor(http: HttpClient) {
    super(http, 'whatsapp/reply-front/');
  }

}