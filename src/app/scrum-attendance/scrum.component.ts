import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ScrumAttendance } from '../model/scrum-attendance.model';
import { ScrumAttendanceService } from '../service/scrum-attendance.service';

@Component({
  selector: 'app-scrum-attendance',
  templateUrl: './scrum.component.html'
})
export class ScrumComponent {
  data: any;
  ft1Value: number;
  ft2Value: number;

  ft1Data = [0];
  ft2Data = [0];

  labelArray = [];

  today = moment().date();
  todayDate = moment().format('LL');

  isFT1Disabled = false;
  isFT2Disabled = false;

  monthSelected: string;

  monthsDropdown = [];

  constructor(private scrumService: ScrumAttendanceService) {
    this.initialLoad(moment(moment()).daysInMonth());
    this.loadMonthsDropdown();
  }

  initialLoad(noOfDaysInThisMonth): any {
    const momentDate = moment(new Date());
    const yearAndMonth = momentDate.format('MMM YY');

    this.populateXAxisLabels(noOfDaysInThisMonth);
    this.loadValuesBasedOnMonthYear(yearAndMonth, false);
  }

  populateXAxisLabels(noOfDays) {
    this.labelArray = [];

    for (let index = 0; index < noOfDays; index++) {
      this.labelArray.push(index);
    }
    this.labelArray.push(this.labelArray[this.labelArray.length - 1] + 1);
  }

  loadValuesBasedOnMonthYear(yearAndMonth: string, isPastMonths: boolean) {
    this.ft1Value = null;
    this.ft2Value = null;
    this.ft1Data = [0];
    this.ft2Data = [0];

    this.scrumService
      .getScrumAttendance(yearAndMonth.replace(/\s/g, ''))
      .subscribe(response => {
        response.forEach(scEnt => {
          this.ft1Data[scEnt.day] = scEnt.ft1Attendance;
          this.ft2Data[scEnt.day] = scEnt.ft2Attendance;
        });

        this.createNewDataSet();

        if (isPastMonths) {
          this.isFT1Disabled = true;
          this.isFT2Disabled = true;
        } else {
          this.isFT1Disabled = this.ft1Data[this.today] ? true : false;
          this.isFT2Disabled = this.ft2Data[this.today] ? true : false;
        }
      });
  }

  submit(featureTeam) {
    const momentDate = moment(new Date());
    const yearAndMonth = momentDate.format('MMM YY');

    if (featureTeam === 'FT1') {
      this.ft2Value = null;
    } else if (featureTeam === 'FT2') {
      this.ft1Value = null;
    }

    const scrumEntity: ScrumAttendance = {
      day: this.today,
      monthYear: yearAndMonth.replace(/\s/g, ''),
      ft1Attendance: this.ft1Value,
      ft2Attendance: this.ft2Value
    };

    this.scrumService.saveScrumAttendance(scrumEntity).subscribe(response => {
      response.forEach(scEnt => {
        this.ft1Data[scEnt.day] = scEnt.ft1Attendance;
        this.ft2Data[scEnt.day] = scEnt.ft2Attendance;
      });

      this.initialLoad(moment(moment()).daysInMonth());
    });
  }

  createNewDataSet() {
    this.data = {
      labels: this.labelArray,
      datasets: [
        {
          label: 'FT-1: Gaurav-Sridhar-Prash-Suke-Bisw',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.ft1Data
        },
        {
          label: 'FT-2: Dash-James-Rav-Vinay-Basa',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.ft2Data
        }
      ]
    };
  }

  thisDay() {
    this.today = moment().date();
    this.todayDate = moment().format('LL');
    this.loadMonthsDropdown();
    this.monthSelected = null;
    this.initialLoad(moment(moment()).daysInMonth());
  }

  loadMonthsDropdown() {
    const today = new Date();
    this.monthsDropdown = [];

    for (let index = 1; index <= 6; index++) {
      const momentDate = moment(today);
      momentDate.subtract(index, 'months');
      const formatedDate = momentDate.format('MMM YY');
      this.monthsDropdown.push(formatedDate.replace(/\s/g, ''));
    }
  }

  monthSelection() {
    this.populateXAxisLabels( moment(this.monthSelected, 'MMMYY').daysInMonth());
    this.loadValuesBasedOnMonthYear(this.monthSelected, true);
  }
}
