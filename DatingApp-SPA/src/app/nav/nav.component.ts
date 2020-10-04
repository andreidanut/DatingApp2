import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) form: NgForm;
  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }

  onLogin() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logged in succsessfully');
        // this.router.navigate(['/members']);
      },
      (error) => {
        console.log(error);
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/members'])
      }      
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.alertify.message('Logged Out');
    this.router.navigate(['/home']);
  }
}
