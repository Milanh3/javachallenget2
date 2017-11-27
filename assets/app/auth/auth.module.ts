import {LogoutComponent} from "./logout.component";
import {SignupComponent} from "./signup.component";
import {SigninComponent} from "./signin.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

@NgModule({
    declarations: [
        LogoutComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})

export class AuthModule{

}