import { Injectable } from '@angular/core';

import { DataService } from '../services/data.service';
import { Users } from './Users';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends DataService<Users> {

  constructor(http: HttpClient) {
    super(http, 'users/');
  }

}