import { Injectable } from '@angular/core';
import { NextObserver } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import * as Nes from '@hapi/nes/lib/Client';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  nesClient: any;

  constructor() {}

  async connect() {
    if (!this.nesClient) {
      this.nesClient = new Nes.Client(environment.webSocketUrl);
      await this.nesClient.connect();
    }

    return this.nesClient;
  }
}
