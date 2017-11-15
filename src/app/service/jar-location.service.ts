import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { JarWrapperModel } from '../model/ja-wrapper.model';

@Injectable()
export class JarLocationService {

    constructor(private http: Http) { }

    getJarLocationDetails(): Observable<JarWrapperModel> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/environment/getDetails').map((response: Response) => {
            return response.json() as JarWrapperModel;
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
