import { Component, OnDestroy } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { strict } from 'assert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  model: LoginRequest;
  loginSubscription?: Subscription

  constructor(private authService: AuthService,
      private cookieSrevice: CookieService,
      private router: Router) {
    this.model = {
      email: '',
      password: ''
    }
  }

  onFormSubmit(): void {
      this.authService.login(this.model)
        .subscribe({
            next: (response) =>
              {
                // Set auth Cookie
                this.cookieSrevice.set('Authorization',`Bearer ${response.token}`,
                undefined, '/', undefined, true, 'Strict');


                // set the user

                this.authService.setUser({
                  email: response.email,
                  roles: response.roles
                });

                
                // redirect impact to home page

                this.router.navigateByUrl('/');
              }
        })
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

}
