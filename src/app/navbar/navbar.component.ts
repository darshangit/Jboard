import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';
import { AccessControlService } from '../service/access-control.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class AppNavBarComponent {

    constructor(private login: LoginService, private accessControl: AccessControlService) {}

}
