import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {

  user?: User;
  userAuthServiceSubscription?: Subscription

  constructor(private authService: AuthService,
      private router: Router) {

  }

  ngOnInit(): void {
     this.userAuthServiceSubscription = this.authService.user()
        .subscribe({
            next: (response) =>{
                this.user = response;
            }
        });

       this.user =  this.authService.getUser();
  }

  onLogout(): void{
      this.authService.logout();
      this.router.navigateByUrl('/');
  }

  ngOnDestroy(): void {
    this.userAuthServiceSubscription?.unsubscribe();
  }

}
