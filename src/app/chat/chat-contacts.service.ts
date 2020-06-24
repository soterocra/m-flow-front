import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';
import { Contact } from './Contacts';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactsService extends DataService<Contact> {

  constructor(http: HttpClient) {
    super(http, 'whatsapp/contacts/');
  }

}