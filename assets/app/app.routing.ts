import {RouterModule, Routes} from "@angular/router";
import {OverviewRoomsComponent} from "./overviewrooms/overviewrooms.component";
import {OverviewRoomComponent} from "./overviewrooms/overviewroom.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {ReservationsComponent} from "./reservations/reservations.component";
import {RoomsComponent} from "./rooms/rooms.component";
import {PricesComponent} from "./prices/prices.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/overviewrooms', pathMatch: 'full' },
    {path: 'overviewrooms', component:OverviewRoomsComponent},
    {path: 'overviewroom', component: OverviewRoomComponent},
    {path: 'admin/rooms', component:RoomsComponent},
    {path: 'admin/reservations', component:ReservationsComponent},
    {path: 'admin/prices', component: PricesComponent},
    {path: 'auth', component:AuthenticationComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);