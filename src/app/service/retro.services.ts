import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { RetroModel } from '../model/retro.model';
import { LeavesAndTrainings } from '../model/leavesTrainings.model'

@Injectable()
export class RetroService {

    constructor(private http: Http) { }

    saveRetro(retroModel: RetroModel): Observable<boolean> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.post('/jboard/retro/save', JSON.stringify(retroModel), requestop).map((response: Response) => {
            return response.json() as boolean;
        });
    }

    getRetroHistory(): Observable<RetroModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/retro/getHistory').map((response: Response) => {
            return response.json() as RetroModel[];
        }).catch(this.handleError);
    }

    saveLeavesAndTrainings(leaveTrainings): void {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        this.http.post('/jboard/leaves/save', JSON.stringify(leaveTrainings), requestop).subscribe();
    }

    getAllLeavesAndTrainings(): Observable<LeavesAndTrainings[]>{
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/leaves/getLeavesAndTrainings').map((response: Response) => {
            return response.json() as LeavesAndTrainings[];
        }).catch(this.handleError);

    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}