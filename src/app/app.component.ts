import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PropertyListPage} from '../pages/property-list/property-list';
import {BrokerListPage} from '../pages/broker-list/broker-list';
import {FavoriteListPage} from '../pages/favorite-list/favorite-list';
import {WelcomePage} from '../pages/welcome/welcome';
import {AboutPage} from '../pages/about/about';
import {LoginPage} from '../pages/login/login';
import { CookieService } from 'angular2-cookie/core';
import { RequestOptions } from '@angular/http';
export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = LoginPage;

    appMenuItems: Array<MenuItem>;

    accountMenuItems: Array<MenuItem>;

    helpMenuItems: Array<MenuItem>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public cookieService: CookieService,public requestOptions:RequestOptions) {
        this.initializeApp();

        this.appMenuItems = [
            {title: 'Imóveis', component: PropertyListPage, icon: 'home'},
            {title: 'Corretores', component: BrokerListPage, icon: 'people'},
            {title: 'Favoritos', component: FavoriteListPage, icon: 'star'},
            
        ];

        this.accountMenuItems = [
            {title: 'Minha Conta', component: LoginPage, icon: 'ios-contact'},
           
        ];

        this.helpMenuItems = [
            {title: 'Bem Vindo', component: WelcomePage, icon: 'bookmark'},
            {title: 'Sobre', component: AboutPage, icon: 'information-circle'},
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    logout(){
        this.cookieService.removeAll();
        this.requestOptions.headers.set('Authorization',"Bearer ");
        this.nav.setRoot(LoginPage);
        
    }
}
