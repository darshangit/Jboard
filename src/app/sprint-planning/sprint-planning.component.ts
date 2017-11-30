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
    statusList = [{ label: 'DEV', value: 'DEV' }, { label: 'BA', value: 'BA' }, { label: 'DONE', value: 'DONE' }];
    issueTypeList = [{ label: 'Bug', value: 'Bug' }, { label: 'Feature', value: 'Feature' }];
    sprintList = [];

    sprintNo: number;
    planning: SprintPlanningModel[];
    newPlanningItem: SprintPlanningModel;
    newItem: boolean;
    selectedPlan: SprintPlanningModel;
    assigneesList = [];

    constructor(private sprintService: SprintPlanningService, private memberService: MemberService) { }

    ngOnInit(): void {

        this.sprintService.getPlanningsBySprintNo(72).subscribe(resp => {
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
        this.sprintList = [{ label: 'This Sprint', value: this.sprintNo }, { label: 'Next Sprint', value: this.sprintNo + 1 }];

        this.sprintService.getPlanningsBySprintNo(this.sprintNo).subscribe(resp => {
            this.displayHeaderTab = true;
            this.planning = resp;
        });
    }

    save() {
        this.sprintService.savePlanning(this.newPlanningItem).subscribe(resp => {
            this.planning = resp;
            this.displayDialog = false;
        });
    }

    delete() {
        this.sprintService.deletePlanningsBySprintNo(this.newPlanningItem.planningUuid, this.sprintNo).subscribe(resp => {
            this.planning = resp;
            this.displayDialog = false;
        });
    }

    onRowSelect(event) {
        console.log(event);
        this.newPlanningItem = this.clonePlan(event.data);
        this.displayDialog = true;
    }

    clonePlan(c: SprintPlanningModel): SprintPlanningModel {
        const sprintModelClass = new SprintModelClass();
        for (const prop of Object.keys(c)) {
            console.log('prop', prop);
            if (prop === 'startDate' || prop === 'endDate') {
                sprintModelClass[prop] = new Date(c[prop]);
            } else {
                sprintModelClass[prop] = c[prop];
            }
        }
        console.log('sprintModelClass', sprintModelClass);
        return sprintModelClass;
    }

}
