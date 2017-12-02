import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { MemberModel } from '../model/member.model';
import { LoginService } from './login.service';

@Injectable()
export class MemberService {

    constructor(private http: Http, private loginService: LoginService) { }

    addMember(name): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/add/' + name + '/' + this.loginService.getUserName()).map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    deleteMember(id): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/delete/' + id + '/' + this.loginService.getUserName()).map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    getAllMembers(): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/getall/' + this.loginService.getUserName()).map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}
