import {ReservationsComponent} from "./reservations.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
//import {UserService} from "../user/user.service";


@NgModule({
    declarations: [
        ReservationsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})

export class ReservationsModule{

}