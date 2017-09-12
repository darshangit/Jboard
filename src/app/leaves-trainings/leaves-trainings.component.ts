import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RetroService } from '../service/retro.services';
import { LeavesAndTrainings } from '../model/leavesTrainings.model'


@Component({
    selector: 'app-leavestrainings',
    templateUrl: './leaves-trainings.component.html'
})
export class LeavesTrainingComponent implements OnInit {

    formArray = [];
    counter = 0;
    leavesForm: FormGroup;
    personName: FormControl;
    type: FormControl;
    fromDate: FormControl;
    toDate: FormControl;
    noOfDays: FormControl;
    key: FormControl;
    stringtype: string;

    userList = [];

    constructor(private retroServices: RetroService) {
        this.retroServices.getAllLeavesAndTrainings().subscribe(response => {
            this.formArray = response;
        });
    }

    ngOnInit(): void {
        this.initialize();
    }

    initialize(): void {
        this.userList = ['Darshan', 'Sukeerti', 'Abhilash' ];
        this.personName = new FormControl('', Validators.required );
        this.type = new FormControl('', Validators.required );
        this.fromDate = new FormControl('2017-08-01', Validators.required );
        this.toDate = new FormControl('2017-08-01', Validators.required );
        this.noOfDays = new FormControl('', Validators.required );
        this.key = new FormControl('', Validators.required );

        this.leavesForm = new FormGroup({
            personName: this.personName,
            type: this.type,
            fromDate: this.fromDate,
            toDate: this.toDate,
            noOfDays: this.noOfDays,
            key: this.key
        });
    }

    leavesSubmit(formValues) {
        console.log('formValues', formValues )
        const leavesAndTrainings: LeavesAndTrainings = {
            UUID: null,
            type: formValues.type,
            totalDays: formValues.noOfDays,
            name: formValues.personName,
            toDate: formValues.toDate,
            fromDate: formValues.fromDate,
            createTimeStamp: new Date()
        };
        this.retroServices.saveLeavesAndTrainings(leavesAndTrainings);
    }

    addRow() {
        this.formArray.push(1);
        this.counter = this.formArray.length;
    }

}
