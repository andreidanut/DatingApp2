import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @ViewChild('loginForm', {static:false}) form: NgForm;
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in succsessfully');
    }, error => {
      console.log('failded to login' + error);
    });
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  onLogout() {
    localStorage.removeItem('token');
    console.log('Logged Out');
  }

}
