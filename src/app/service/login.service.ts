import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Login } from '../model/login.model';
import { Router } from '@angular/router';
import { HEROKU_API_URL } from './endpoint.constant';

@Injectable()
export class LoginService {

    isUserAuthenticated = false;
    userName: string;
    accessRoutes: string[];

    constructor(private http: Http, private router: Router) { }

    isValidUser(login: Login): Observable<boolean> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.post(HEROKU_API_URL + '/jboard/login/authenticate', JSON.stringify(login), requestop).map((response: Response) => {
            return response.json() as boolean;
        }).catch(this.handleError);
    }

    getAccessControlList(name: string): Observable<string[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/accesscontrol/' + name).map((response: Response) => {
            return response.json() as string[];
        }).catch(this.handleError);
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

    setRoutes(accessRoutes: string[]) {
        this.accessRoutes = accessRoutes;
    }

    getRoutes(routeName: string): boolean {
        return this.accessRoutes.includes(routeName);
    }

    signOut() {
        this.userName = null;
        this.isUserAuthenticated = false;
        this.accessRoutes = null;
        this.router.navigate(['/app-login']);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
