import { Component, OnInit, Input } from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavParams} from "@ionic/angular";
import {Place} from "../../places/places.model";
import { BookingService } from '../booking.service';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

    @Input() loadedPlace: Place;

    constructor(
        private navParams: NavParams,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
        private loadingController: LoadingController,
        private bookingService: BookingService
    ) {
        //console.log(navParams.get('title'));
    }

    ngOnInit() {

    }

    closeModal() {
        this.modalController.dismiss({message: 'Canceled'}, 'cancel');
    }

    async bookThisPlace() {
        const actionSheet = await this.actionSheetController.create({
            header: 'Book Place',
            buttons: [{
                text: 'Book w/ Random Date',
                handler: () => {
                    this.loadingController.create({
                        keyboardClose: true,
                        message: 'Booking the place...'
                    }).then(loadingEl => {
                        loadingEl.present()
                        setTimeout(() => {
                            loadingEl.dismiss();
                            this.modalController.dismiss({message: 'booked!'}, 'confirm')
                        }, 2000)
                    });
                }
            }, {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel Clicked')
                }
            }]
        })

        await actionSheet.present();
    }

    onBookMyPlace() {
        this.modalController.dismiss({message: 'This is a dummy msg'}, 'confirm');
        this.bookingService.addToMyBookings(this.loadedPlace);
    }
}
