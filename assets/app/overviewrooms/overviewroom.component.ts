import {Component, OnInit} from "@angular/core";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";

@Component({
    selector: 'app-overviewroom',
    template: `
        <div class="row whiteBG">
            <div class="col-md-10 col-sm-offset-1">
                <h1 i18n>Zaal overzicht: {{ room.name }}</h1>
                
                <app-detailsroom></app-detailsroom>
                
                <h1 i18n>Kalender beschikbaarheid</h1>
                
                <app-availabilityroom></app-availabilityroom>
                
                <p>&nbsp;</p>
            </div>
        </div>
    `
})

export class OverviewRoomComponent implements OnInit {
    room: Room;

    constructor(private roomsService: RoomsService) {}

    ngOnInit(){
        var roomId = localStorage.getItem('roomId');

        this.roomsService.getRoomById(roomId).subscribe(
            (room: Room) => {
                this.room = room;
            },
            error => console.log(error)
        );
    }
}