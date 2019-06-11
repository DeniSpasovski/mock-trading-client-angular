import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {
    if (!localStorage['userId']) {
      localStorage['userId'] = 'User' + new Date().getMilliseconds();
    }
  }

  getUserId(): string {
    return localStorage['userId'];
  }
}
