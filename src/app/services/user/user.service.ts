import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { IUser } from 'src/app/shared/interfaces/user';

const apiUrl = 'http://localhost:4000/user'

@Injectable()
export class UserService {

  user: IUser | null | undefined;

  get isUser(): boolean {
    return !!this.user;
  }

  get userId(): any {
    return this.user?._id;
  }

  constructor(
    private http: HttpClient
  ) { }

  register(data: { user: string; email: string; password: string }) {
    return this.http.post<IUser>(`${apiUrl}/register`, data).pipe(
      tap((user) => this.user = user)
    );
  }
  login(data: { email: string, password: string }) {
    return this.http.post<IUser>(`${apiUrl}/login`, data).pipe(
      tap((user) => this.user = user)
    )
  }
  logout() {
    return this.http.post<IUser>(`${apiUrl}/logout`, {}).pipe(
      tap(() => {  this.user = null
      })
    );
  }
}
