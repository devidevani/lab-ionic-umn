import { Injectable } from '@angular/core';
import {Booking} from "./booking.model";
import {IonItemSliding} from "@ionic/angular";
import { Place } from '../places/places.model';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private bookings: Booking[] = [
        new Booking(
            'b1',
            'p1',
            'u1',
            'Serpong M-Town',
            24
        ),

        new Booking(
            'b2',
            'p2',
            'u2',
            'Scientia Residence',
            8
        )
    ];

    private myBookings: Place[] = [];
    
    constructor() { }

    addToMyBookings(p: Place) {
        this.myBookings.push(p);
        console.log(p);
    }

    removeFromMyBookings(id: string) {
        this.myBookings = this.myBookings.filter(p => {
            return p.id != id;
        })
    }

    getMyBooking() {
        return [...this.myBookings];
    }

    getAllBookings() {
        return [...this.bookings]
    }

    getBooking(id: string) {
        return {
            ...this.bookings.find(booking => {
                return booking.id === id;
            })
        };
    }

    deleteBooking(id: string) {
        this.bookings = this.bookings.filter(booking => booking.id !== id)
    }
}
