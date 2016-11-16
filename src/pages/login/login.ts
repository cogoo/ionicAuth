import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

// Contemplated angular forms but will have to change view and possibly duplicate functions for sign in and sign up
// import { Validator, FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  segment: string;
  email: string;
  password: string;
  fName: string;
  lName: string;
  round: boolean;
  expand: boolean;
  showSpinner: boolean;
  spinnerColor: string;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public alertCtrl: AlertController, public menuCtrl: MenuController) {
    
    this.segment = "signIn";
    this.showSpinner = false;
    this.spinnerColor = 'light';
    this.menuCtrl.swipeEnable(false);
    
    if (this.auth.isAuthenticated()) {
      this.navCtrl.setRoot(HomePage);
    }

  }

  ionViewDidLoad() {
    // console.log('Hello LoginPage Page');
  }

  isInvalid() {
    if (this.segment == 'signIn') {
      if (this.email == null || this.email.length < 1 || this.password == null || this.password.length < 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.email == null || this.email.length < 1 || this.password == null || this.password.length < 1 || this.fName == null || this.fName.length < 1 || this.lName == null || this.lName.length < 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  setClass() {
    let classes = {
      round: this.round,
      expand: this.expand
    };
    return classes;
  }

  authUser(type: string) {
    this.round = true;
    this.showSpinner = true;
    if (type == 'signUp') {
      let details: UserDetails = { 'email': this.email, 'password': this.password, 'name': this.fName + ' ' + this.lName };
      this.auth.signup(details)
        .then(this.signUpSuccess.bind(this), this.signUpError.bind(this));
    } else {
      let details = { 'email': this.email, 'password': this.password }
      this.auth.login('basic', details)
        .then(this.authSuccess.bind(this), this.authError.bind(this));
    }

  }

  authSuccess() {
    this.spinnerColor = 'danger';
    this.expand = true;
    setTimeout(() => {
      this.navCtrl.setRoot(HomePage);
    }, 300)

  }

  authError() {

    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'Could not authenticate user',
      buttons: ['OK']
    });
    alert.present();

    this.showSpinner = false;
    this.round = false;

  }

  signUpSuccess(login) {

    this.authUser(this.segment);
  }

  signUpError(err: IDetailedError<string[]>) {
    for (let e of err.details) {
      console.log("e ", e);
      if (e === 'conflict_email') {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'A user with this email already exists',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (e === 'invalid_email') {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'This is not a valid email address',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    this.showSpinner = false;
    this.round = false;
  }
}
