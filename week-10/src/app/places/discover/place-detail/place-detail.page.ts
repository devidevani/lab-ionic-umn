import { Component, OnInit, OnDestroy } from '@angular/core';
import {Place} from '../../places.model';
import {ActivatedRoute} from '@angular/router';
import {PlacesService} from '../../places.service';
import {ActionSheetController, ModalController} from "@ionic/angular";
import {CreateBookingComponent} from "../../../bookings/create-booking/create-booking.component";
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

    place: Place;
    loadedPlace: Place;
    selectedPlace: Place;
    private placeSub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetController: ActionSheetController,
    ) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(
            paramMap => {
                if (!paramMap.has('placeId')) {
                    return;
                }
                this.placeSub = this.placesService.getPlace(paramMap.get('placeId')).subscribe(place => {
                    this.loadedPlace = place;
                });
            }
        );
    }

    async bookPlace() {
        const modal = await this.modalController.create({
            component: CreateBookingComponent,
            componentProps: {
                'loadedPlace': this.loadedPlace
            }
        }).then(modalElement => {
            modalElement.present();
            return modalElement.onDidDismiss();
        }).then(resultData => {
            console.log(resultData);
        })
    }

    onBookPlace() {
        this.actionSheetController.create({
            header: 'Choose an Action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random Date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        })
        .then(actionSheetEl => {
            actionSheetEl.present();
        });
    }

    openBookingModal(mode: 'select' | 'random') {
        console.log(mode);
        this.modalController
        .create({
            component: CreateBookingComponent,
            componentProps: { loadedPlace: this.loadedPlace, selectedMode: mode }
        })
        .then(modalEl => {
            modalEl.present();
            return modalEl.onDidDismiss();
        })
        .then(resultData => {
            console.log(resultData.data, resultData.role);
            if (resultData.role === 'confirm') {
                console.log('BOOKED');
            }
        })
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }
}
