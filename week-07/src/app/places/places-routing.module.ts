import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PlacesPage} from './places.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },
                    {
                        path: ':placeId',
                        loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule'
                    }
                ]
            },
            {
                path: 'offers',
                children: [
                    {
                        path: '',
                        loadChildren: './offers/offers.module#OffersPageModule'
                    },
                    {
                        path: 'now',
                        loadChildren: './offers/new-offer/new-offer.module#NewOfferPageModule'
                    },
                    {
                        path: 'edit/:placeId',
                        loadChildren: './offers/edit-offer/edit-offer.module#EditOfferPageModule'
                    },
                    {
                        path: ':placeId',
                        loadChildren: './offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: '/places/tabs/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    },
  { path: 'place-detail', loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule' },
  { path: 'new-offer', loadChildren: './offers/new-offer/new-offer.module#NewOfferPageModule' },
  { path: 'edit-offer', loadChildren: './offers/edit-offer/edit-offer.module#EditOfferPageModule' },
  { path: 'offer-bookings', loadChildren: './offers/offer-bookings/offer-bookings.module#OfferBookingsPageModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class PlacesRoutingModule {}