import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RetroService } from '../service/retro.services';
import { LeavesAndTrainings } from '../model/leavesTrainings.model';

@Component({
    selector: 'app-leavestrainings',
    templateUrl: './leaves-trainings.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LeavesTrainingComponent implements OnInit {

    formArray = [];
    leavesForm: FormGroup;
    personName: FormControl;
    type: FormControl;
    fromDate: FormControl;
    toDate: FormControl;
    noOfDays: FormControl;
    stringtype: string;
    userList = [];
    countArray = [1];
    asd: any;

    constructor(private retroServices: RetroService, private cd: ChangeDetectorRef) {
        this.retroServices.getAllLeavesAndTrainings().subscribe(response => {
            this.formArray = response;
        });
    }

    ngOnInit(): void {
        this.initialize();
    }

    initialize(): void {
        this.userList = ['Avinash', 'Abhilash', 'Amit', 'Biswajit', 'Basavaraju', 'Darshan',
            'James', 'Vinay', 'Prashant', 'Sukeerti', 'Gils', 'Gaurav'];
        this.personName = new FormControl('', Validators.required);
        this.type = new FormControl('', Validators.required);
        this.fromDate = new FormControl('', Validators.required);
        this.toDate = new FormControl('', Validators.required);
        this.noOfDays = new FormControl('', Validators.required);

        this.leavesForm = new FormGroup({
            personName: this.personName,
            type: this.type,
            fromDate: this.fromDate,
            toDate: this.toDate,
            noOfDays: this.noOfDays,
        });
    }

    leavesSubmit(formValues) {
        const leavesAndTrainings: LeavesAndTrainings = {
            UUID: null,
            type: formValues.type,
            totalDays: formValues.noOfDays,
            name: formValues.personName,
            toDate: formValues.toDate,
            fromDate: formValues.fromDate,
            createTimeStamp: new Date()
        };
        this.retroServices.saveLeavesAndTrainings(leavesAndTrainings).subscribe(resp => {
            this.initialize();
            this.formArray = resp;
        });
    }
}
