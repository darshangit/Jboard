import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { MemberModel } from '../model/member.model';

@Injectable()
export class MemberService {

    constructor(private http: Http) { }

    addMember(name): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/add/' + name).map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    deleteMember(id): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/delete/' + id).map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    getAllMembers(): Observable<MemberModel[]> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const requestop = new RequestOptions({ headers });

        return this.http.get('/jboard/member/getall').map((response: Response) => {
            return response.json() as MemberModel[];
        }).catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}
