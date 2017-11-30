import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SprintDetailsModel } from '../model/sprint-details.model';

@Injectable()
export class SprintDetailsService {

    constructor(private http: Http) { }

    addSprint(sprintNo: number): Observable<SprintDetailsModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/sprintDetails/add/' + sprintNo).map((response: Response) => {
            return response.json() as SprintDetailsModel[];
        }).catch(this.handleError);
    }

    markAsCurrentSprint(sprintNo: number): Observable<SprintDetailsModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/sprintDetails/current/' + sprintNo).map((response: Response) => {
            return response.json() as SprintDetailsModel[];
        }).catch(this.handleError);
    }

    deleteSprint(sprintNo: number): Observable<SprintDetailsModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/sprintDetails/delete/' + sprintNo).map((response: Response) => {
            return response.json() as SprintDetailsModel[];
        }).catch(this.handleError);
    }

    getAllSprints(): Observable<SprintDetailsModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/sprintDetails/getAll').map((response: Response) => {
            return response.json() as SprintDetailsModel[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}
