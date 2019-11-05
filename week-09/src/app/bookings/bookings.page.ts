import { Component, OnInit } from '@angular/core';
import {Booking} from "./booking.model";
import {BookingService} from "./booking.service";
import {ActivatedRoute} from "@angular/router";
import {IonItemSliding} from "@ionic/angular";
import { Place } from '../places/places.model';

@Component({
    selector: 'app-bookings',
    templateUrl: './bookings.page.html',
    styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {

    bookings: Booking[];
    myBookings: Place[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private bookingService: BookingService,
    ) { }

    ngOnInit() {
        this.bookings = this.bookingService.getAllBookings();
        this.myBookings = this.bookingService.getMyBooking();
        console.log(this.bookings);
    }

    ionViewWillEnter() {
        this.myBookings = this.bookingService.getMyBooking();
    }

    onCancelMyBooking(id: string) {
        this.bookingService.removeFromMyBookings(id);
        this.myBookings = this.bookingService.getMyBooking();
    }

    onCancel(offerId: string, slidingEl: IonItemSliding) {
        slidingEl.close();
    }

    deleteBooking(id: string, slidingItem: IonItemSliding) {
        slidingItem.close();
        this.bookingService.deleteBooking(id);
        this.bookings = this.bookingService.getAllBookings();
    }
}
