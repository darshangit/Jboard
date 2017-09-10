import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { RetroService } from '../service/retro.services';
import { RetroModel } from '../model/retro.model';

@Component({
    selector: 'app-retro',
    templateUrl: './retro.component.html'
})
export class RetroComponent implements OnInit {
    retroForm: FormGroup;
    startComment: FormControl;
    stopComment: FormControl;
    continueComment: FormControl;
    moreComment: FormControl;
    lessComment: FormControl;
    actionComment: FormControl;
    sprintNo: FormControl;
    retroSubmitted: boolean;

    constructor(private retroService: RetroService) {}

    ngOnInit(): void {
        this.initialize();
    }

    initialize(): void {
        this.startComment = new FormControl('', Validators.required );
        this.stopComment = new FormControl('', Validators.required );
        this.continueComment = new FormControl('', Validators.required );
        this.moreComment = new FormControl('', Validators.required );
        this.lessComment = new FormControl('', Validators.required );
        this.actionComment = new FormControl('', Validators.required );
        this.sprintNo = new FormControl('', Validators.required );

        this.retroForm = new FormGroup({
            startComment: this.startComment,
            stopComment: this.stopComment,
            continueComment: this.continueComment,
            moreComment: this.moreComment,
            lessComment: this.lessComment,
            actionComment: this.actionComment,
            sprintNo: this.sprintNo
        });
    }

    retroSubmit(formValues) {
        const retroSubmitModel: RetroModel = {
            sprintNo: formValues.sprintNo,
            startComment: formValues.startComment,
            stopComment: formValues.stopComment,
            continueComment: formValues.continueComment,
            moreComment: formValues.moreComment,
            lessComment: formValues.lessComment,
            actionItemsComment: formValues.actionComment,
            createTimeStamp: new Date(),
            startDate: null,
            endDate: null
        };

        this.retroService.saveRetro(retroSubmitModel).subscribe(resp => {
            this.retroSubmitted = resp;
        });

        this.initialize();
    }

}
