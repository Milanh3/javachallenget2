import {NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from "./app.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./shared/header.component";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {AuthService} from "./auth/auth.service";
import {ErrorComponent} from "./errors/error.component";
import {ErrorService} from "./errors/error.service";
import {Globals} from "./shared/globals";
import {AuthModule} from "./auth/auth.module";
import {PricesModule} from "./prices/prices.module";
import {ReservationsModule} from "./reservations/reservations.module";
import {RoomsModule} from "./rooms/rooms.module";
import {RoomsService} from "./rooms/rooms.service";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {OverviewService} from "./overviewrooms/overview.service";
import {ReservationsService} from "./reservations/reservations.service";
import {PricesService} from "./prices/prices.service";
import {OverviewModule} from "./overviewrooms/overview.module";
import {FooterComponent} from "./shared/footer.component";
import {UserService} from "./shared/user.service";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        FooterComponent,
        ErrorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        routing,
        HttpModule,
        AuthModule,
        PricesModule,
        ReservationsModule,
        RoomsModule,
        OverviewModule
    ],
    providers: [AuthService, ErrorService, Globals, RoomsService, ReservationsService, UserService, PricesService, OverviewService, {provide: LOCALE_ID, useValue: 'nl-be'}],
    bootstrap: [AppComponent]
})

export class AppModule {

}
