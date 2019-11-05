import { Injectable } from '@angular/core';
import {Place} from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {

    private _places = new BehaviorSubject<Place[]> ([
        new Place(
            'p1',
            'Serpong M-Town',
            '2BR apartment near Summarecon Mal Serpong.',
            'http://www.summareconbekasi.com/public/images/gallery/article/7082/IMG_3293-25.jpg',
            700000000,
            new Date('2019-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),

        new Place(
            'p2',
            'Scientia Residence',
            'Near UMN with many choices of foods around.',
            'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
            1000000000,
            new Date('2019-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),

        new Place(
            'p3',
            'Scientia Residence 1',
            'Near UMN with many choices of foods around.',
            'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
            1000000000,
            new Date('2019-01-01'),
            new Date('2020-12-31'),
            'abc'
        ),

        new Place(
            'p4',
            'Scientia Residence 2',
            'Near UMN with many choices of foods around.',
            'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
            1000000000,
            new Date('2019-01-01'),
            new Date('2020-12-31'),
            'abc'
        )
    ]);

    get places() {
        return this._places.asObservable();
    }

    constructor(private authService: AuthService) { }

    getAllPlaces() {
        // return [...this._places];

        return this._places.asObservable();
    }

    getPlace(id: string) {
        return this.places.pipe(
            take(1),
            map(places => {
                return {...places.find(p => p.id === id)};
            })
        );
    }

    addPlace(title: string, description: string, price: number, dateForm: Date, dateTo: Date) {
        const newPlace = new Place(
            Math.random().toString(),
            title,
            description,
            'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
            price,
            dateForm,
            dateTo,
            this.authService.userId
        );
        this.places.pipe(take(1)).subscribe(places => {
            setTimeout(() => {
                this._places.next(places.concat(newPlace));
            }, 1000);
        });
    }
}
