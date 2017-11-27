import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-logout',
    template: `
        <div class="row whiteBG">
            <div class="col-md-10 col-sm-offset-1">
                <button class="btn btn-danger" (click)="onLogout()" i18n>Log uit</button>
            </div>
        </div>
    `
})

export class LogoutComponent{

    constructor(private authService: AuthService, private router: Router){}

    onLogout(){
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }
}