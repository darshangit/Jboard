import { Component, OnChanges, Input, Output, DoCheck, EventEmitter } from '@angular/core';
import { RetroService } from '../service/retro.services';
import { RetroModel } from '../model/retro.model';

@Component({
    selector: 'app-retro-history',
    templateUrl: './retro-history.component.html'
})
export class RetroHistoryComponent implements DoCheck {

    @Input() retroSubmitted: boolean;
    @Output() retroSubmittedChange: EventEmitter<boolean> = new EventEmitter();
    retroHistories: RetroModel[];
    constructor(private retroService: RetroService) {
        this.retroService.getRetroHistory().subscribe((resp) => {
            this.retroHistories = resp;
        });
    }

    ngDoCheck(): void {
        if (this.retroSubmitted) {
            this.retroService.getRetroHistory().subscribe((resp) => {
                this.retroHistories = resp;
                this.retroSubmittedChange.next(false);
            });
        }
    }

    deleteRetro(retro: RetroModel) {
        console.log('retro', retro )
        this.retroService.deleteRetroHistory(retro.sprintNo).subscribe(resp => {
            this.retroHistories = resp;
        });
    }
}
