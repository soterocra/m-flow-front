import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';
import { Template } from './Template';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TemplateService extends DataService<Template> {

  constructor(http: HttpClient) {
    super(http, 'template-message/');
  }

}