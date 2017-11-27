import {PricesComponent} from "./prices.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {PricesInputComponent} from "./prices-input.component";
import {RoomsPricesListComponent} from "./rooms-prices-list.component";

@NgModule({
    declarations: [
        PricesComponent,
        PricesInputComponent,
        RoomsPricesListComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ]
})

export class PricesModule{

}