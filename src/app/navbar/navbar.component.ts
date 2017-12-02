import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class AppNavBarComponent {
    constructor(private login: LoginService) {
    }

}
