import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mock Trading Server using Angular';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.info('app started with user', this.authService.getUserId());
  }
}
