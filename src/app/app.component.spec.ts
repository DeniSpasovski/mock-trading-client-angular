import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './pages/home/home.component';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('AuthService', ['getUser']);

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HomeComponent, AppComponent],
      providers: [
        HomeComponent,
        {
          provide: Router,
          UseValue: {
            navigateByUrl(url: string) {
              return url;
            }
          }
        },
        { provide: AuthService, UseValue: spy }
      ],
      imports: []
    }).compileComponents();

    authServiceSpy = TestBed.get(AuthService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
