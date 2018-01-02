import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.services';
import { MemberModel } from '../model/member.model';

@Component({
    selector: 'app-pair-programming',
    templateUrl: './pair-program.component.html'
})
export class PairProgramComponent implements OnInit {

    membersFromService: MemberModel[];
    totalNumberOfNumbers: string[] = [];
    membersAlreadypairProgrammed: string[] = ['ADASH', 'CDASH'];

    constructor(private memberService: MemberService) {

    }

    ngOnInit(): void {
        this.memberService.getAllMembers().subscribe(resp => {
            this.membersFromService = resp;
            this.membersFromService.forEach(element => {
                console.log('this.element', element);
                this.totalNumberOfNumbers.push(element.memberName);
            });
            console.log('this.element',  this.totalNumberOfNumbers);

        });
    }

    hello(event: any) {
        console.log('hiii');
    }
}
