import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
        this.retroForm = new FormGroup({
            startComment: this.startComment,
            stopComment: this.stopComment,
            continueComment: this.continueComment,
            moreComment: this.moreComment,
            lessComment: this.lessComment,
            actionComment: this.actionComment
        });
    }

    retroSubmit(formValues) {
        console.log('formvalues', formValues );
        this.initialize();
    }

}
