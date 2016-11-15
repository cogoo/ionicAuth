import { Auth } from '@ionic/cloud-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: Auth) {}

  ionViewDidLoad() {
    // console.log('Hello HomePage Page');
  }

  // Auth Guard
  ionViewCanEnter(){
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }


}
