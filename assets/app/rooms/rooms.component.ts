import {Component} from "@angular/core";
import {Room} from "./room.model";
import {RoomsService} from "./rooms.service";

@Component({
    selector: 'app-rooms',
    template: `
        <div class="row whiteBG">
            <div class="col-md-10 col-sm-offset-1">
                <h1 i18n>Zaalbeheer</h1>
                
                <p>&nbsp;</p>
        
                <div class="col-md-4">
                    <app-rooms-list></app-rooms-list>
                </div>
                
                <div class="col-md-6">
                    <app-room-input></app-room-input>
                </div>
                
                <p>&nbsp;</p>
            </div>
        </div>
    `
})

export class RoomsComponent{

}