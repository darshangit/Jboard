import { Component, OnInit } from '@angular/core';
import { JarLocationService } from '../service/jar-location.service';
import { JarWrapperModel } from '../model/ja-wrapper.model';
import { JarLocationModel } from '../model/jar-location.model';

@Component({
    selector: 'app-jarlocationdetails',
    templateUrl: './jar-details.component.html'
})
export class JarLocationDetailsComponent implements OnInit {

    environment: string;
    jarLocation: JarWrapperModel;
    isClicked = false;

    constructor(private jarLocationService: JarLocationService) {
    }

    ngOnInit(): void {
    }

    getBatest1Details() {
        this.environment = 'Batest-1';
        this.jarLocationService.getJarLocationDetails().subscribe(resp => {
            this.jarLocation = resp;
            this.isClicked = true;
        });
    }

    getBatest2Details() {
        this.environment = 'Batest-2';
        this.jarLocationService.getJarLocationDetails().subscribe(resp => {
            this.jarLocation = resp;
            this.isClicked = true;
        });
    }

    getUatDetails() {
        this.environment = 'UAT';
        this.jarLocationService.getJarLocationDetails().subscribe(resp => {
            this.jarLocation = resp;
            this.isClicked = true;
        });
    }

    getLikeProdDetails() {
        this.environment = 'Like-Prod';
        this.jarLocationService.getJarLocationDetails().subscribe(resp => {
            this.jarLocation = resp;
            this.isClicked = true;
        });
    }

    getClass(jar: JarLocationModel): string {
        let className = 'btn-success';

        if (jar.daysDifference >= 2 && jar.daysDifference < 5) {
            className =  'btn-warning';
        }else if (jar.daysDifference > 5) {
            className = 'btn-danger';
        }

        return className;
        }

}
