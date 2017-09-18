import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RetroService } from '../service/retro.services';
import { LeavesAndTrainings } from '../model/leavesTrainings.model';
import * as moment from 'moment';
import * as $ from 'jquery';
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

    responseArray = [];
    holidayArray = [];
    constructor(private cd: ChangeDetectorRef, private retroServices: RetroService) {}
    ngOnInit(): void {
        this.userList = ['Avinash', 'Abhilash', 'Amit', 'Biswajit', 'Basavaraju', 'Darshan',
        'James', 'Vinay', 'Prashant', 'Sukeerti', 'Gils', 'Gaurav'];
           this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
        this.retroServices.getAllHolidays().subscribe(respo => {
            this.holidayArray = respo;
            this.populateHolidays();
        });
        this.retroServices.getAllLeavesAndTrainings().subscribe(response => {
                this.responseArray = response;
                this.events = [];
                this.responseArray.forEach(element => {
                    let color = '#5cb85c';
                    if ( element.type === 'Leaves') {
                        color = '#d9534f';
                    }
                    const lt: MyEvent = {
                        id: Number(element.ltUuid),
                        title: element.name + '-' + element.type,
                        name: element.name,
                        start: element.fromDate,
                        end: moment(element.toDate).add(1, 'd').toDate(),
                        type: element.type,
                        allDay: true,
                        color: color
                    };
                    this.events.push(lt);
            });
        });
    }

    handleDayClick(e) {
        this.event = new MyEvent();
        this.event.start = e.date.format();
        this.event.end = this.event.start;
        this.dialogVisible = true;
        this.cd.detectChanges();
    }

    populateHolidays() {
        this.holidayArray.forEach(holiday => {
            $('td[data-date=' + holiday.holidayDate + ']').text(holiday.holidayname).addClass('holiday');
        });
    }

    handleEventClick(e) {

        const index: number = this.findEventIndexById(e.calEvent.id);
        if (index >= 0) {
           this.event = this.events[index];
           this.event.end = moment(this.event.end).add(-1, 'd').toDate();
        } else {
            // this.event = new MyEvent();
            // this.event.title = e.calEvent.title;

            // const start = e.calEvent.start;
            // const end = e.calEvent.end;
            // if (e.view.name === 'month') {
            //     start.stripTime();
            // }

            // if (end) {
            //     end.stripTime();
            //     this.event.end = end.format();
            // }
            // this.event.id = e.calEvent.id;
            // this.event.start = start.format();
        }

        this.dialogVisible = true;
    }

    saveEvent() {
        if (this.event.id) {
            const index: number = this.findEventIndexById(this.event.id);
            if (index >= 0) {
                this.events[index] = this.event;
                const leavesAndTrainings: LeavesAndTrainings = {
                    ltUuid: Number(this.event.id),
                    type: this.event.type,
                    totalDays: this.event.id,
                    name: this.event.name,
                    toDate: this.event.end,
                    fromDate: this.event.start,
                    createTimeStamp: new Date()
                };

                this.retroServices.saveLeavesAndTrainings(leavesAndTrainings).subscribe(resp => {
                    this.responseArray = resp;
                    this.events = [];
                    this.responseArray.forEach(element => {
                        let color = '#5cb85c';
                        if ( element.type === 'Leaves') {
                            color = '#d9534f';
                        }
                        const lt: MyEvent = {
                            id: Number(element.ltUuid),
                            title: element.name + '-' + element.type,
                            name: element.name,
                            start: element.fromDate,
                            end: moment(element.toDate).add(1, 'd').toDate(),
                            type: element.type,
                            allDay: true,
                            color: color
                        };
                        this.events.push(lt);
                    });
                });
                this.event = null;
            }
        } else {
            const leavesAndTrainings: LeavesAndTrainings = {
                ltUuid: Number(this.event.id),
                type: this.event.type,
                totalDays: 0,
                name: this.event.name,
                toDate: this.event.end,
                fromDate: this.event.start,
                createTimeStamp: new Date()
            };
            this.retroServices.saveLeavesAndTrainings(leavesAndTrainings).subscribe(resp => {
                this.responseArray = resp;
                this.events = [];
                this.responseArray.forEach(element => {
                    let color = '#5cb85c';
                    if ( element.type === 'Leaves') {
                        color = '#d9534f';
                    }
                    const lt: MyEvent = {
                        id: Number(element.ltUuid),
                        title: element.name + '-' + element.type,
                        name: element.name,
                        start: element.fromDate,
                        end: moment(element.toDate).add(1, 'd').toDate(),
                        type: element.type,
                        allDay: true,
                        color: color
                    };
                    this.events.push(lt);
                });
            });
            this.event = null;
        }

        this.dialogVisible = false;
    }

    deleteEvent() {
        this.retroServices.deleteLeaveAndTraining(this.event.id).subscribe(resp => {
            this.responseArray = resp;
            this.events = [];
            this.responseArray.forEach(element => {
                let color = '#5cb85c';
                if ( element.type === 'Leaves') {
                    color = '#d9534f';
                }
                const lt: MyEvent = {
                    id: Number(element.ltUuid),
                    title: element.name + '-' + element.type,
                    name: element.name,
                    start: element.fromDate,
                    end: moment(element.toDate).add(1, 'd').toDate(),
                    type: element.type,
                    allDay: true,
                    color: color
                };
                this.events.push(lt);
            });
        });
        this.event = null;
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

    eventAfterAllRenderer(event) {
       this.populateHolidays();
    }

}

export class MyEvent {
    id: number;
    title: string;
    name: string;
    start: Date;
    end: Date;
    type: string;
    allDay = true;
    color: string;
}

