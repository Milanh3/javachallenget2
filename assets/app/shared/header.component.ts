import {Component, OnInit} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-header',
    template:`
        <div class="row lightBG"><p>&nbsp;<p></div>
        <header class="row darkBG">
            <nav class="col-md-10 col-sm-offset-1">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active"><a [routerLink]="['/overviewrooms']" class="navigatie" i18n>Overzicht zalen</a></li>
                    <li routerLinkActive="active" *ngIf="checkIfAdmin()"><a [routerLink]="['/admin/reservations']" class="navigatie" i18n>Reservaties</a></li>
                    <li routerLinkActive="active" *ngIf="checkIfAdmin()"><a [routerLink]="['/admin/rooms']" class="navigatie" i18n>Zalen beheren</a></li>
                    <li routerLinkActive="active" *ngIf="checkIfAdmin()"><a [routerLink]="['/admin/prices']" class="navigatie" i18n>Prijzen beheren</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/auth']" class="navigatie" i18n>Authenticatie</a></li>
                 </ul>
            </nav>
        </header>
    `,
    styles: [`
        .nav-tabs {
            padding: 10px;
            border-bottom: none;
        }
        .nav-tabs > li.active > a {
            color: #CEB64A;
            background-color: #1E1E1E;
        }
    `]
})

export class HeaderComponent implements OnInit{
    checkAdmin: boolean = false;
    userId: string;

    constructor(private authService: AuthService){}

    ngOnInit() {
        this.userId = localStorage.getItem("userId");

        if (this.userId != null) {
            this.authService.getUserById(this.userId).subscribe(
                (user: User) => {
                    if (user.isAdmin) {
                        this.checkAdmin = true;
                    }
                },
                error => console.log(error)
            );
        } else {
            this.checkAdmin = false;
        }
    }

    checkIfAdmin() {
        return this.checkAdmin;
    }
}