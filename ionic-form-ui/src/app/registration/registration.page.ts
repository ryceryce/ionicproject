import { UserService } from 'src/app/services/user.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  arrData = [];
  backButtonTxt: string = '';

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      ]),
    fname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      ]),
    lname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      ]),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      ]),
  });

  constructor(private router: Router, private alertController: AlertController, private userService: UserService) { }

  ngOnInit() {
  }

  async successAlert() {
    const alert = await this.alertController.create({
      header: 'Success Sign Up',
      buttons: [{ 
          text: 'Okay',
          handler: () => {
          this.router.navigateByUrl('/login');
          }
        }]
    });

    await alert.present();
    
  }

  doRegister() {
    if (this.hasWhiteSpace(this.registerForm.value.username) || this.hasWhiteSpace(this.registerForm.value.password)){
      this.userService.popupAlert("Username or Password can't have Whitespace");
    } else if (this.registerForm.invalid ) {
      this.userService.popupAlert("Cannot be empty");
    } else if(this.checkingUser()) {
      this.insertData();
      this.successAlert();
    }
  }

  insertData() {
    let newData = this.registerForm.value;
    let existingDatas = JSON.parse(localStorage.getItem("data"));

    // Jika ada data
    if (existingDatas != '' && existingDatas != null) {
      for (let existingData of existingDatas) {
        this.arrData.push(existingData);
      }
      this.arrData.push(newData);      
      localStorage.setItem("data", JSON.stringify(this.arrData));

    // Jika blm ada data  
    } else {
      this.arrData.push(newData);
      localStorage.setItem("data", JSON.stringify(this.arrData));
    }
  }

  checkingUser() {
    let newUser = this.registerForm.value.username;
    let newEmail = this.registerForm.value.email;
    let existingDatas = JSON.parse(localStorage.getItem("data"));

    //Jika tidak ada data
    if(existingDatas == null || existingDatas == ''){
      return true

    //Jika ada data dan di cek username dan emailnya  
    } else {
      for(let existingData of existingDatas) {
        if(existingData.username === newUser && existingData.email === newEmail) {
          this.userService.popupAlert("Username and Email has been taken");
          return false
        }
        else if(existingData.username === newUser) {
          this.userService.popupAlert("Username has been taken");
          return false
        }
        else if (existingData.email === newEmail) {
          this.userService.popupAlert("Email has been taken");
          return false
        }
        else {
          return true
        }
      }
    }    
  }

  hasWhiteSpace(input) {
    let regexp = /\s/g;

    return regexp.test(input);
  }
}
