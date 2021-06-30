import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  usersUrl: string = '/api/users';

  getUsers() {
    return this.http.get<user[]>(this.usersUrl);
  }

  addUser(user: user): Observable<user> {
    return this.http.post<user>(this.usersUrl, user);
  }
}
