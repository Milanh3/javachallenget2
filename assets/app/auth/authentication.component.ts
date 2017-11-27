import {Component} from "@angular/core";
import {AuthService} from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: `
        <header class="row spacing darkBG">
            <nav class="col-md-10 col-sm-offset-1">
                <ul class="nav nav-tabs">
                    <li><a [routerLink]="['signup']" class="navigatie" i18n>Registreer</a></li>
                    <li *ngIf="!isLoggedIn()"><a [routerLink]="['signin']" class="navigatie" i18n>Log in</a></li>
                    <li *ngIf="isLoggedIn()"><a [routerLink]="['logout']" class="navigatie" i18n>Log uit</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})

export class AuthenticationComponent{
    constructor(private authService: AuthService) {}

    isLoggedIn(){
        return this.authService.isLoggedIn();
    }
}