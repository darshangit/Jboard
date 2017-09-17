import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-ltcalendar',
    templateUrl: './ltcalendar.component.html'
})
export class LTCalendarComponent implements OnInit {

    events: any[];
    header: any;
    event: MyEvent;
    dialogVisible = false;
    idGen = 100;
    headerConfig: any;
    userList = [];

    constructor(private cd: ChangeDetectorRef) {}
    ngOnInit(): void {
        this.userList = ['Avinash', 'Abhilash', 'Amit', 'Biswajit', 'Basavaraju', 'Darshan',
        'James', 'Vinay', 'Prashant', 'Sukeerti', 'Gils', 'Gaurav'];

        this.events = [
            {
                'title': 'All Day Event',
                'start': '2016-01-01'
            },
            {
                'title': 'Long Event',
                'start': '2016-01-07',
                'end': '2016-01-10'
            },
            {
                'title': 'Repeating Event',
                'start': '2016-01-09T16:00:00'
            },
            {
                'title': 'Repeating Event',
                'start': '2016-01-16T16:00:00'
            },
            {
                'title': 'Conference',
                'start': '2016-01-11',
                'end': '2016-01-13'
            }
        ];

        this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    }

    handleDayClick(e) {
        console.log('handleDayClick');

        this.event = new MyEvent();
        this.event.start = e.date.format();
        this.dialogVisible = true;
        this.cd.detectChanges();
    }

    handleEventClick(e) {
        console.log('handleclick');
        this.event = new MyEvent();
        this.event.title = e.calEvent.title;

        const start = e.calEvent.start;
        const end = e.calEvent.end;
        if (e.view.name === 'month') {
            start.stripTime();
        }

        if (end) {
            end.stripTime();
            this.event.end = end.format();
        }

        this.event.id = e.calEvent.id;
        this.event.start = start.format();
        this.event.allDay = e.calEvent.allDay;
        this.dialogVisible = true;
    }

    saveEvent() {
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
            }
        } else {
            this.event.id = this.idGen++;
            this.events.push(this.event);
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        const index: number = this.findEventIndexById(this.event.id);
        if (index >= 0) {
            this.events.splice(index, 1);
        }
        this.dialogVisible = false;
    }

    findEventIndexById(id: number) {
        let index = -1;
        for (let i = 0; i < this.events.length; i++) {
            if (id === this.events[i].id) {
                index = i;
                break;
            }
        }

        return index;
    }

}

export class MyEvent {
    id: number;
    title: string;
    start: string;
    end: string;
    allDay: string;
}

