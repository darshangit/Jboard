import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { RetroModel } from '../model/retro.model';
import { LeavesAndTrainings } from '../model/leavesTrainings.model';
import { Holidays } from '../model/holiday.model';
import { LoginService } from './login.service';
import { HEROKU_API_URL } from './endpoint.constant';

@Injectable()
export class RetroService {

    constructor(private http: Http, private loginService: LoginService) { }

    saveRetro(retroModel: RetroModel): Observable<boolean> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        retroModel.loginName = this.loginService.getUserName();

        return this.http.post(HEROKU_API_URL + '/jboard/retro/save', JSON.stringify(retroModel), requestop).map((response: Response) => {
            return response.json() as boolean;
        });
    }

    getRetroHistory(): Observable<RetroModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/retro/getHistory/' + this.loginService.getUserName()).map((response: Response) => {
            return response.json() as RetroModel[];
        }).catch(this.handleError);
    }

    deleteRetroHistory(sprintUUID): Observable<RetroModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/retro/delete/' + sprintUUID + '/' + this.loginService.getUserName())
        .map((response: Response) => {
            return response.json() as RetroModel[];
        }).catch(this.handleError);
    }


    saveLeavesAndTrainings(leaveTrainings: LeavesAndTrainings): Observable<LeavesAndTrainings[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        leaveTrainings.loginName = this.loginService.getUserName();

        return this.http.post(HEROKU_API_URL + '/jboard/leaves/save', JSON.stringify(leaveTrainings), requestop)
        .map((response: Response) => {
            return response.json() as LeavesAndTrainings[];
        }).catch(this.handleError);
    }

    getAllLeavesAndTrainings(): Observable<LeavesAndTrainings[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/leaves/getLeavesAndTrainings/' + this.loginService.getUserName())
        .map((response: Response) => {
            return response.json() as LeavesAndTrainings[];
        }).catch(this.handleError);
    }

    deleteLeaveAndTraining(uuid: number): Observable<LeavesAndTrainings[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + 'jboard/leaves/deleteLeaveAndTraining/' + uuid + '/' + this.loginService.getUserName())
        .map((response: Response) => {
            return response.json() as LeavesAndTrainings[];
        }).catch(this.handleError);
    }

    getAllHolidays(): Observable<Holidays[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get(HEROKU_API_URL + '/jboard/holidays/getall').map((response: Response) => {
            return response.json() as Holidays[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
