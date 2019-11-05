import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _userIsAuthenticaed = true;
    private _userId = 'abc';

    constructor() { }

    get userIsAuthenticated() {
        return this._userIsAuthenticaed;
    }

    get userId() {
        return this._userId;
    }

    login() {
        this._userIsAuthenticaed = true;
    }

    logout() {
        this._userIsAuthenticaed = false;
    }
}
