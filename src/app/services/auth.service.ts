import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

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
