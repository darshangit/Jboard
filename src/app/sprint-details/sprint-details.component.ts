import { Component, OnInit } from '@angular/core';
import { SprintDetailsService } from '../service/sprint-details.service';
import { SprintDetailsModel } from '../model/sprint-details.model';

@Component({
    selector: 'app-sprint-details',
    templateUrl: './sprint-details.component.html'
})
export class SprintDetailsComponent implements OnInit {

    sprintArray: SprintDetailsModel[];

    constructor(private sprintDetailsService: SprintDetailsService) { }

    ngOnInit(): void {
        this.sprintDetailsService.getAllSprints().subscribe(resp => {
            this.sprintArray = resp;
        });
    }

    addSprint(formValue) {
        this.sprintDetailsService.addSprint(formValue.sprintNo).subscribe(response => {
            this.sprintArray = response;
        });
    }

    deleteSprint(formValue) {
        this.sprintDetailsService.deleteSprint(formValue.sprintNumber).subscribe(response => {
            this.sprintArray = response;
        });
    }

    markAsCurrentSprint(formValue) {
        this.sprintDetailsService.markAsCurrentSprint(formValue.sprintNumber).subscribe(response => {
            this.sprintArray = response;
        });
    }

    getClass(sprint: SprintDetailsModel): string {
        let className = 'btn-default';

        if (sprint.sprintStatus !== null && sprint.sprintStatus !== undefined) {
            className = 'btn-success';
        }
        return className;
    }

    getTooltip(sprint: SprintDetailsModel): string {
        let toolTip = 'Mark as Current Sprint';

        if (sprint.sprintStatus !== null && sprint.sprintStatus !== undefined) {
            toolTip = 'This is the current Sprint';
        }
        return toolTip;
    }
}
