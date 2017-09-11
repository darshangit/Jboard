import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
    selector: 'app-leavestrainings',
    templateUrl: './leaves-trainings.component.html'
})
export class LeavesTrainingComponent implements OnInit {

    formArray = [1, 2, 3];
    leavesForm: FormGroup;
    personName: FormControl;
    type: FormControl;
    fromDate: FormControl;
    toDate: FormControl;
    noOfDays: FormControl;
    stringtype: string;

    ngOnInit(): void {
        this.initialize();
    }

    initialize(): void {
        this.personName = new FormControl('', Validators.required );
        this.type = new FormControl('', Validators.required );
        this.fromDate = new FormControl(new Date(), Validators.required );
        this.toDate = new FormControl(new Date(), Validators.required );
        this.noOfDays = new FormControl('', Validators.required );

        this.leavesForm = new FormGroup({
            personName: this.personName,
            type: this.type,
            fromDate: this.fromDate,
            toDate: this.toDate,
            noOfDays: this.noOfDays
        });
    }

    leavesSubmit(formValues) {
        console.log('formValues', formValues);
    }

    clicked() {
        console.log('clickedclicked', this.stringtype);

    }

}
