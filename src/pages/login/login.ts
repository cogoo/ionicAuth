import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

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
  hideSpinner: boolean;

  constructor(public navCtrl: NavController, public auth: Auth, public user: User, public alertCtrl: AlertController) {
    this.segment = "signIn";
    if (this.auth.isAuthenticated()) {
      this.navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
    // console.log('Hello LoginPage Page');
  }

  isInvalid() {
    if (this.email == null || this.email.length < 1 || this.password == null || this.password.length < 1) {
      return true;
    } else {
      return false;

    }

  }


  isInvalidSignUp() {
    if (this.email == null || this.email.length < 1 || this.password == null || this.password.length < 1 || this.fName == null || this.fName.length < 1 || this.lName == null || this.lName.length < 1) {
      return true;
    } else {
      return false;
    }

  }

  setClass() {
    let classes = {
      round: this.round,
      expand: this.expand
    };
    return classes;
  }

  authUser(signUp: boolean) {
    this.round = true;
    this.showSpinner = true;
    if (signUp) {
      let details: UserDetails = { 'email': this.email, 'password': this.password, 'name': this.fName + ' ' + this.lName };
      this.auth.signup(details)
        .then(() => {
          return this.authUser(false);
        }, (err) => {
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
        })
    } else {
   
      
      let details = { 'email': this.email, 'password': this.password }
      this.auth.login('basic', details)
        .then((auth) => {
            this.hideSpinner = false;
            this.expand = true;
            setTimeout(() => {

              console.log("1 ", 1);
              this.navCtrl.setRoot(HomePage);
            }, 300)
        }, (err) => {
              let alert = this.alertCtrl.create({
                title: 'Sorry',
                subTitle: 'Could not authenticate user',
                buttons: ['OK']
              });
              alert.present();

          this.showSpinner = false;
        });
    }

  }

  // authSuccess(login) {

  // }

  // authError(err: IDetailedError<string[]>) {


  // }



}
