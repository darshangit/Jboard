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
    this.initialLoad(this.getNoOfDays());
    this.loadMonthsDropdown();
  }

  initialLoad(noOfDaysInThisMonth): any {
    this.ft1Value = null;
    this.ft2Value = null;

    this.labelArray = [];

    const momentDate = moment(new Date());
    const yearAndMonth = momentDate.format('MMM YY');

    for (let index = 0; index < noOfDaysInThisMonth; index++) {
      this.labelArray.push(index);
    }
    this.labelArray.push(this.labelArray[this.labelArray.length - 1] + 1);

    this.scrumService.getScrumAttendance(yearAndMonth.replace(/\s/g, '')).subscribe(response => {
        response.forEach(scEnt => {
            this.ft1Data[scEnt.day] = scEnt.ft1Attendance;
            this.ft2Data[scEnt.day] = scEnt.ft2Attendance;
        });
        this.createNewDataSet();
        this.isFT1Disabled = this.ft1Data[this.today] ? true : false;
        this.isFT2Disabled = this.ft2Data[this.today] ? true : false;
    });
  }

  submit(featureTeam) {
    console.log(featureTeam);

    const momentDate = moment(new Date());
    const yearAndMonth = momentDate.format('MMM YY');

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

        this.initialLoad(this.getNoOfDays());
    });

    // if (featureTeam === 'FT1') {
    //   this.ft1Data[this.today] = this.ft1Value;
    //   this.initialLoad(this.getNoOfDays());
    // } else if (featureTeam === 'FT2') {
    //   this.ft2Data[this.today] = this.ft2Value;
    //   this.initialLoad(this.getNoOfDays());
    // }
  }

  createNewDataSet() {
    this.data = {
      labels: this.labelArray,
      datasets: [
        {
          label: 'FT-1 - Gaurav-Sridhar-Prash-Suke-Bisw',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: this.ft1Data
        },
        {
          label: 'FT-2 - Dash-James-Rav-Vinay-Basa',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: this.ft2Data
        }
      ]
    };
  }

  getNoOfDays(): Number {
    console.log(moment().day() + 1);
    const today = new Date();
    const month = today.getMonth();
    const daysInthisMonth = this.daysInMonth(month + 1, today.getFullYear());
    return daysInthisMonth;
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  thisDay() {
    this.today = moment().date();
    this.todayDate = moment().format('LL');
    this.loadMonthsDropdown();
    this.monthSelected = null;
    this.initialLoad(this.getNoOfDays());
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
    console.log('this.monthSelected', this.monthSelected);
  }
}
