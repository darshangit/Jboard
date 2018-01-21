import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.services';
import { MemberModel } from '../model/member.model';
import { PairProgrammingService } from '../service/pair-programming.service';
import * as _ from 'lodash';
import { PairProgramModel } from '../model/pair-programming.model';

@Component({
    selector: 'app-pair-programming',
    templateUrl: './pair-program.component.html'
})
export class PairProgramComponent implements OnInit {

    membersFromService: MemberModel[];
    totalNumberOfNumbers: string[] = [];
    membersAlreadypairProgrammed: string[] = [];

    constructor(private memberService: MemberService,
        private pairProgramService: PairProgrammingService) {
    }

    ngOnInit(): void {

        this.pairProgramService.getCurrentPairProgrammers().subscribe(pairProgrammers => {
            pairProgrammers.forEach(entity => {
                this.membersAlreadypairProgrammed.push(entity.memberName);
            });
            this.memberService.getAllMembers().subscribe(resp => {
                this.membersFromService = resp;
                this.membersFromService.forEach(element => {
                    this.totalNumberOfNumbers.push(element.memberName);
                    this.totalNumberOfNumbers = _.difference(this.totalNumberOfNumbers, this.membersAlreadypairProgrammed);
                });
            });

        });
    }

    moveToTarget(event: any) {
        const requestModel: PairProgramModel[] = [];

        this.membersAlreadypairProgrammed.forEach(element => {
            const pairProgramEntity: PairProgramModel = {
                memberName: element
            };
            requestModel.push(pairProgramEntity);
        });
        this.pairProgramService.savePairProgrammers(requestModel).subscribe(pairProgrammers => {
            this.membersAlreadypairProgrammed = [];
            pairProgrammers.forEach(entity => {
                this.membersAlreadypairProgrammed.push(entity.memberName);
            });
            this.totalNumberOfNumbers = [];
            this.membersFromService.forEach(element => {
                this.totalNumberOfNumbers.push(element.memberName);
                this.totalNumberOfNumbers = _.difference(this.totalNumberOfNumbers, this.membersAlreadypairProgrammed);
            });
        });
    }

    resetAll(event: any) {
        this.pairProgramService.deletePairProgrammers().subscribe(element => {
            this.membersAlreadypairProgrammed = [];
            this.totalNumberOfNumbers = [];
            this.membersFromService.forEach(memberFromService => {
                this.totalNumberOfNumbers.push(memberFromService.memberName);
            });
        });
    }

    moveToSource(event: any) {
        this.moveToTarget(event);
    }
}
