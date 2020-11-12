import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private alertController: AlertController, private userService: UserService) { }

  ngOnInit() {
  }

  doLogin() {
    if(this.loginForm.value.email == '' || this.loginForm.value.password == '') {
      this.userService.popupAlert("Cannot be empty");
    } else if (this.checkingData()) {
      this.userService.popupAlert("Success Login");
    } else {
      this.userService.popupAlert("Check your Email and Password");
    }
  }

  checkingData() {
    let existingData = JSON.parse(localStorage.getItem("data"));

    for (let data of existingData) {
      if(this.loginForm.value.email === data.email && this.loginForm.value.password === data.password) {
        return true;
      } else {
        return false;
      } 
    }
  }
}
