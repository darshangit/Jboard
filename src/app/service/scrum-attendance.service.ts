import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { ScrumAttendance } from '../model/scrum-attendance.model';
import { HEROKU_API_URL } from './endpoint.constant';

@Injectable()
export class ScrumAttendanceService {

    constructor(private http: Http) { }

    saveScrumAttendance(scrumEntity: ScrumAttendance): Observable<ScrumAttendance[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.post(HEROKU_API_URL + '/jboard/scrumattendance/save', JSON.stringify(scrumEntity), requestop)
        .map((response: Response) => {
            return response.json() as ScrumAttendance[];
        }).catch(this.handleError);
    }

    getScrumAttendance(monthAndYear: string): Observable<ScrumAttendance[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/scrumattendance/' + monthAndYear).map((response: Response) => {
            return response.json() as ScrumAttendance[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
