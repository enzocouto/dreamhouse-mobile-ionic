import {Component} from '@angular/core';
import {ActionSheetController, ActionSheet, NavController, NavParams, ToastController} from 'ionic-angular';
import {BrokerDetailPage} from '../broker-detail/broker-detail';
import {PropertyService} from '../../providers/property-service-rest';
import { CookieService } from 'angular2-cookie/core';
@Component({
    selector: 'page-property-detail',
    templateUrl: 'property-detail.html'
})
export class PropertyDetailPage {

    property: any;
    slides: Array<any>;
    constructor(public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams, public propertyService: PropertyService, public toastCtrl: ToastController,private cookieService: CookieService) {
        this.property = this.navParams.data;
        propertyService.findById(this.property.id).then(
            property => this.property = property
        );

         propertyService.findImagesByIdProperty(this.property.id).then(
            slides => this.slides = slides
        );


    }

    openBrokerDetail(broker) {
        this.navCtrl.push(BrokerDetailPage, broker);
    }

    favorite(property) {
        this.propertyService.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'O im�vel foi adicionado aos seus Favoritos',
                    cssClass: 'mytoast',
                    duration: 1000
                });
                toast.present(toast);
            });
    }

    share(property) {
        let actionSheet: ActionSheet = this.actionSheetCtrl.create({
            title: 'Share via',
            buttons: [
                {
                    text: 'Twitter',
                    handler: () => console.log('Compartilhar via twitter')
                },
                {
                    text: 'Facebook',
                    handler: () => console.log('Compartilhar via facebook')
                },
                {
                    text: 'Email',
                    handler: () => console.log('Compartilhar via email')
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => console.log('Cancela compartilhamento')
                }
            ]
        });

        actionSheet.present();
    }

}
