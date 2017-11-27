import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {OverviewRoomsComponent} from "./overviewrooms.component";
import {AvailabilityRoomComponent} from "./availabilityroom.component";
import {CalendarComponent} from "../shared/calendar";
import {routing} from "../app.routing";
import {DetailsRoomComponent} from "./detailsroom.component";
import {OverviewRoomComponent} from "./overviewroom.component";

@NgModule({
    declarations: [
        OverviewRoomsComponent,
        OverviewRoomComponent,
        AvailabilityRoomComponent,
        DetailsRoomComponent,
        CalendarComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        routing
    ]
})

export class OverviewModule{

}