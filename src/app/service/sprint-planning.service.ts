import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SprintPlanningModel } from '../model/sprint-planning.model';
import 'rxjs/Rx';
import { LoginService } from './login.service';

@Injectable()
export class SprintPlanningService {

    constructor(private http: Http, private loginService: LoginService) { }

    savePlanning(sprintPlanningModel: SprintPlanningModel): Observable<SprintPlanningModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        sprintPlanningModel.loginName = this.loginService.getUserName();

        return this.http.post('/jboard/planning/save', JSON.stringify(sprintPlanningModel), requestop).map((response: Response) => {
            return response.json() as SprintPlanningModel[];
        }).catch(this.handleError);
    }

    getPlanningsBySprintNo(sprintNo: number): Observable<SprintPlanningModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/planning/' + sprintNo + '/' + this.loginService.getUserName()).map((response: Response) => {
            return response.json() as SprintPlanningModel[];
        }).catch(this.handleError);
    }

    deletePlanningsBySprintNo(planningModelUUID: number, sprintNo: number): Observable<SprintPlanningModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/planning/' + planningModelUUID + '/' + sprintNo + '/' + this.loginService.getUserName())
        .map((response: Response) => {
            return response.json() as SprintPlanningModel[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
