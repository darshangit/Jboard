import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

    isUserAuthenticated = false;
    userName: string;

    constructor(private http: Http, private router: Router) { }

    isValidUser(login: Login): Observable<boolean> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.post('/jboard/login/authenticate', JSON.stringify(login), requestop).map((response: Response) => {
            return response.json() as boolean;
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

    setValidUser(userName) {
        this.userName = userName;
        this.isUserAuthenticated = true;
    }

    getIsValidUser() {
        return this.isUserAuthenticated;
    }

    getUserName() {
        return this.userName;
    }

    signOut() {
        this.userName = null;
        this.isUserAuthenticated = false;
        this.router.navigate(['/app-login']);
    }

}
