import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://reqres.in/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get(`${this.url}/users?per_page=6`)
      .pipe(map((resp) => resp['data']));
  }

  getUserById(id: string): Observable<User> {
    return this.http
      .get(`${this.url}/users/${id}`)
      .pipe(map((resp) => resp['data']));
  }
}
