/*import {SignupComponent} from "./signup.component";
import {LogoutComponent} from "./logout.component";*/
import {SigninComponent} from "../auth/signin.component";
import {RouterModule, Routes} from "@angular/router";

const ADMIN_ROUTES: Routes = [
    {path: '', redirectTo: 'signin', pathMatch: 'full'},
    {path: 'signin', component: SigninComponent },/*
    {path: 'signup', component: SignupComponent },
    {path: 'logout', component: LogoutComponent }*/
];

export const adminRouting = RouterModule.forChild(ADMIN_ROUTES);