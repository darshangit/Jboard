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

    displayDialog = false;
    displayHeaderTab = false;
    statusList = [ {label: 'DEV', value: 'DEV'}, {label: 'BA', value: 'BA'}, {label: 'DONE', value: 'DONE'} ];
    issueTypeList  = [ {label: 'Bug', value: 'Bug'}, {label: 'Feature', value: 'Feature'}];
    sprintList = [];

    sprintNo: number;
    planning: SprintPlanningModel[];
    newPlanningItem: SprintPlanningModel;
    newItem: boolean;
    selectedPlan: SprintPlanningModel;
    assigneesList = [];

    constructor(private sprintService: SprintPlanningService, private memberService: MemberService) {}

    ngOnInit(): void {

        this.sprintService.getPlanningsBySprintNo(72).subscribe(resp => {
            this.displayHeaderTab = true;
            this.planning = resp;
            console.log('this.planning', this.planning);
        });

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
    }

    setSprintNo(value) {
        const sprintNoString: string = value.target.innerText;
        this.sprintNo = +sprintNoString.split(' ')[1];
        this.sprintList = [ {label: 'This Sprint', value: this.sprintNo}, {label: 'Next Sprint', value: this.sprintNo + 1}];

        this.sprintService.getPlanningsBySprintNo(this.sprintNo).subscribe(resp => {
            this.displayHeaderTab = true;
            this.planning = resp;
            console.log('this.planning', this.planning);
        });
    }

    save() {
       console.log('this.newPlanningItem', this.newPlanningItem);
       this.sprintService.savePlanning(this.newPlanningItem).subscribe(resp => {
           this.planning = resp;
           this.displayDialog = true;

       });

    }

    delete() {
        this.displayDialog = false;

    }

}
