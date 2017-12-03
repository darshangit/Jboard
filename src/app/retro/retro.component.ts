import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { RetroService } from '../service/retro.services';
import { RetroModel } from '../model/retro.model';
import * as email from 'emailjs';

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
        this.startComment = new FormControl('');
        this.stopComment = new FormControl('');
        this.continueComment = new FormControl('');
        this.moreComment = new FormControl('' );
        this.lessComment = new FormControl('');
        this.actionComment = new FormControl('');
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

        // this.sendMail(formValues);
        this.initialize();
    }

    sendMail(formValues) {
          const server 	= email.server.connect({
           user:	'username' ,
           password: 'password',
           host:	'smtp.your-email.com',
           ssl:		true
        });

        const message	= {
           text:	'i hope this works',
           from:	'darshansasdasd@gmail.com',
           to:		'darshansasdasd@gmail.com',
           cc:		'else <else@your-email.com>',
           subject:	'Retrospective',
           attachment:
           [
              {data: `<html>i <i>hope</i> this works!</html>`, alternative: true}
           ]
        };


        server.send(message, function(err, resp) { console.log(err || message); });
    }

}
