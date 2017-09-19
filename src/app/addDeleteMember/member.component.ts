import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.services';
import { MemberModel } from '../model/member.model';
import * as $ from 'jquery';

@Component({
    selector: 'app-member',
    templateUrl: './member.component.html'
})
export class MemberComponent implements OnInit {
    memberArray: MemberModel[];
    totalMember: number;
    constructor(private memberService: MemberService) { }

    ngOnInit(): void {
        this.memberService.getAllMembers().subscribe(response => {
            this.memberArray = response;
            this.totalMember = this.memberArray.length;

        });
    }

    addMember(formValue) {
        this.memberService.addMember(formValue.name).subscribe(response => {
            this.memberArray = response;
            this.totalMember = this.memberArray.length;
            $('#name').val('');
        });
    }

    deleteMember(formValue) {
        this.memberService.deleteMember(formValue.memberUuid).subscribe(response => {
            this.memberArray = response;
            this.totalMember = this.memberArray.length;
        });
    }
}
