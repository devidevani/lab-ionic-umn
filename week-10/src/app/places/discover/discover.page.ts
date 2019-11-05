import { Component, OnInit, OnDestroy } from '@angular/core';
import {Place} from '../places.model';
import {PlacesService} from '../places.service';
import {ActivatedRoute} from '@angular/router';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {

    places: Place[];
    listedLoadedPlaces: Place[];
    private placeSub: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private placesService: PlacesService
    ) { }

    ngOnInit() {
        this.placeSub = this.placesService.places.subscribe(places => {
            this.places = places;
            this.listedLoadedPlaces = this.places.slice(1);
        });
    }

    onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
        console.log(event.detail);
    }

    ngOnDestroy() {
        if (this.placeSub) {
            this.placeSub.unsubscribe();
        }
    }

}
