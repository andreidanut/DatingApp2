import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Input() values: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('registration succsessfull');
      },
      (error) => {
        console.log(error);
        if (error.Password) {
          this.alertify.error(error.Password[0]);
        }
        if (error.Username) {
          this.alertify.error(error.Username[0]);
        } else {
          this.alertify.error(error);
        }
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('Canceled');
  }
}
