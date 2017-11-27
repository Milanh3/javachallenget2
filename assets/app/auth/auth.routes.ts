import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {LogoutComponent} from "./logout.component";
import {Routes} from "@angular/router";

// route objecten aanmaken in een array
// signup is zonder "/" omdat localhost:3000/signup niet bestaat
export const AUTH_ROUTES: Routes = [
    {path: '', redirectTo: 'signup', pathMatch: 'full'},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent }
];