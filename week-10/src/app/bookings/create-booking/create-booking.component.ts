import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, NavParams} from "@ionic/angular";
import {Place} from "../../places/places.model";
import { BookingService } from '../booking.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-create-booking',
    templateUrl: './create-booking.component.html',
    styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

    @Input() loadedPlace: Place;
    @Input() selectedMode: 'select' | 'random';
    @ViewChild('f') form: NgForm;
    startDate: string;
    endDate: string;

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
        const availableFrom = new Date(this.loadedPlace.availableFrom);
        const availableTo = new Date(this.loadedPlace.availableTo);
        if (this.selectedMode === 'random') {
          this.startDate = new Date(
              availableFrom.getTime() +
              Math.random() * (availableTo.getTime() - 7 * 24 * 60 * 60 * 1000 - availableFrom.getTime())
          ).toISOString();
    
          this.endDate = new Date(
              new Date(this.startDate).getTime() +
              Math.random() *
              (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
          ).toISOString();
        }
    }

    closeModal() {
        this.modalController.dismiss({message: 'Canceled'}, 'cancel');
    }

    onCancel() {
        this.modalController.dismiss(null, 'cancel');
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

    datesValid() {
        const startDate = new Date(this.form.value['date-from']);
        const endDate = new Date(this.form.value['date-to']);
        return endDate > startDate;
    }

    onBookPlace() {
        if(!this.form.valid || this.datesValid) {
            return;
        }
        this.modalController.dismiss({ bookingData: {
            firstName: this.form.value['first-name'],
            lastName: this.form.value['last-name'],
            guestNumber: this.form.value['guest-number'],
            startDate: this.form.value['date-form'],
            endDate: this.form.value['date-to']
        }    
        }, 'confirm');
    }
}
