import {Component} from "@angular/core";
import {AdminService} from "./admin.service";
import {Error} from "../errors/error.model";

@Component({
    selector: 'app-admin',
    template: `
        <header class="row spacing darkBG">
            <nav class="col-md-10 col-sm-offset-1">
                <ul class="nav nav-tabs">
                    <li><a [routerLink]="['signup']" class="navigatie">Signup</a></li>
                    <li *ngIf="!isLoggedIn()"><a [routerLink]="['signin']" class="navigatie">Signin</a></li>
                    <li *ngIf="isLoggedIn()"><a [routerLink]="['logout']" class="navigatie">Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AdminComponent{
    constructor(private adminService: AdminService) {}

    requireAdmin(){
        if (!this.adminService.isAdmin()){
            throw new Error("NotAdmin","This page is restricted to admins");
        }
    }
    isAdmin(){
        return this.adminService.isAdmin();
    }
}