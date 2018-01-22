import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { PairProgramModel } from '../model/pair-programming.model';
import { HEROKU_API_URL } from './endpoint.constant';

@Injectable()
export class PairProgrammingService {

    constructor(private http: Http) { }

    savePairProgrammers(pairProgrammingEntity: PairProgramModel[]): Observable<PairProgramModel[]>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.post(HEROKU_API_URL + '/jboard/pairprogram', JSON.stringify(pairProgrammingEntity), requestop)
        .map((response: Response) => {
            return response.json() as PairProgramModel[];
        });
    }

    deletePairProgrammers(): Observable<PairProgramModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/pairprogram/deleteAll').map((response: Response) => {
            return response.json() as PairProgramModel[];
        }).catch(this.handleError);
    }

    getCurrentPairProgrammers(): Observable<PairProgramModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/pairprogram/getAll').map((response: Response) => {
            return response.json() as PairProgramModel[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
