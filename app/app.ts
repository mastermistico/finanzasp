import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {CuentasPage} from './pages/cuentas/cuentas';

import {AdMob} from 'ionic-native'

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {

  home: any = HomePage;
  cuentas: any = CuentasPage;
  rootPage: any = CuentasPage; 
  

  constructor(platform: Platform) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
         interface AdMobType {
         banner:string,
         interstitial:string
       };

        var admobid:AdMobType;

      if( /(android)/i.test(navigator.userAgent) ) { 
          //console.log('hola')
      		admobid = { // for Android
       		banner: 'ca-app-pub-4811412181501817/4414166284', //ca-app-pub-4811412181501817/4414166284 prod ca-app-pub-6869992474017983/9375997553 test
       		interstitial: 'ca-app-pub-4811412181501817/5890899485' //ca-app-pub-4811412181501817/5890899485 prod ca-app-pub-6869992474017983/1657046752 test
  		};
	}

	AdMob.createBanner({
    adId: admobid.banner,
    //position: AdMob.AD_POSITION.BOTTOM_CENTER,
    //isTesting: true,  TODO: remove this line when release
    overlap: false,
    offsetTopBar: false,
    bgColor: 'black'
  		});

  console.log(AdMob)
  // this will load a full screen ad on startup
  	 if(AdMob)  AdMob.prepareInterstitial({
    	adId: admobid.interstitial,
    	//isTesting: true,  TODO: remove this line when release
    	autoShow: true
  	 });

    });
  }

  openPage(opt){
  	this.rootPage = opt;
  };
}

ionicBootstrap(MyApp);
