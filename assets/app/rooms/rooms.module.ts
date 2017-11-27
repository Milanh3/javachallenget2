import {RoomsComponent} from "./rooms.component";
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {RoomsListComponent} from "./rooms-list.component";
import {RoomInputComponent} from "./room-input.component";

@NgModule({
    declarations: [
        RoomsComponent,
        RoomsListComponent,
        RoomInputComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ]
})

export class RoomsModule{

}