import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sprint-planning',
    templateUrl: './sprint-planning.component.html'
})
export class SprintPlanningComponent implements OnInit {

    vin: string = null;
    displayDialog = false;
    cities = ['asdasdasd', 'asdasdfsfasd', 'asdasd'];
    constructor() {}
    ngOnInit(): void {
    }

    showDialogToAdd() {
        this.displayDialog = true;
    }

}
