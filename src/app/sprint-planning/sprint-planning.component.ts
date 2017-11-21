import { Component, OnInit } from '@angular/core';
import { SprintPlanningService } from '../service/sprint-planning.service';
import { SprintPlanningModel } from '../model/sprint-planning.model';
import { SprintModelClass } from '../model/sprint-planning.model.class';
import { MemberService } from '../service/member.services';

@Component({
    selector: 'app-sprint-planning',
    templateUrl: './sprint-planning.component.html'
})
export class SprintPlanningComponent implements OnInit {

    vin: string = null;
    displayDialog = false;
    displayHeaderTab = false;
    cities = ['asdasdasd', 'asdasdfsfasd', 'asdasd'];

    sprintNo: number;
    planning: SprintPlanningModel[];
    newPlanningItem: SprintPlanningModel;
    newItem: boolean;
    assigneesList = [];

    constructor(private sprintService: SprintPlanningService, private memberService: MemberService) {}

    ngOnInit(): void {
        this.memberService.getAllMembers().subscribe(resp =>
            resp.forEach(member => {
                this.assigneesList.push(member.memberName);
            })
        );
    }

    showDialogToAdd() {
        this.newItem = true;
        this.newPlanningItem = new SprintModelClass();
        this.displayDialog = true;
        console.log('this.assigneesList',this.assigneesList)        
    }

    setSprintNo(value) {
        const sprintNoString: string = value.target.innerText;
        this.sprintNo = +sprintNoString.split(' ')[1];
        this.displayHeaderTab = true;

        this.sprintService.getPlanningsBySprintNo(this.sprintNo).subscribe(resp => {
            this.planning = resp;
        });
    }

}
