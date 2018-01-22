import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { Login } from '../model/login.model';
import { Message } from 'primeng/primeng';
import { AccessControlService } from '../service/access-control.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    userName: string;
    password: string;
    msgs: Message[] = [];
    accessRoutes: string[];
    constructor(private loginService: LoginService, private router: Router, private accessControlService: AccessControlService) { }

    ngOnInit(): void { }

    login(formValue) {

        const login: Login = {
            userName: formValue.userName,
            password: formValue.password
        };

        this.loginService.isValidUser(login).subscribe(response => {
            this.msgs = [];

            if (response) {
                this.msgs.push({ severity: 'success', summary: 'Yehaa', detail: 'Login Success' });
                this.accessControlService.getAccessControlList(login.userName).subscribe(resp => {
                    this.accessRoutes = resp;
                    this.loginService.setRoutes(this.accessRoutes);
                    this.loginService.setValidUser(login.userName);
                    this.router.navigate(['/app-retro']);
                });
            } else {
                this.msgs.push({ severity: 'error', summary: 'Oh Oh', detail: 'Invalid Credentials' });
            }
        });
    }

}
