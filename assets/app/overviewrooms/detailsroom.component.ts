import {Component, OnInit} from "@angular/core";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";

@Component({
    selector: 'app-detailsroom',
    template: `
        <table class="table">
            <tr>
                <th i18n>Lengte</th>
                <th i18n>Breedte</th>
                <th i18n>Capaciteit</th>
                <th i18n>Locatie</th>
                <th *ngIf="checkIfFull()" i18n>Faciliteiten</th>
                <th *ngIf="checkIfEmpty()" i18n>Faciliteiten</th>
            </tr>
            <tr>
                <td>{{ room.length }} m</td>
                <td>{{ room.width }} m</td>
                <td i18n>{{ room.capacity }} mensen</td>
                <td>{{ room.location }}</td>
                <td *ngIf="checkIfFull()">
                    <ul>
                        <li *ngFor="let facility of faciliteiten" i18n>{{ facility }}</li>
                    </ul>
                </td>
                <td *ngIf="checkIfEmpty()" i18n>Geen faciliteiten</td>
            </tr>
        </table>
    `
})

export class DetailsRoomComponent implements OnInit {
    room: Room;
    faciliteiten: string[] = [];
    checkFull: boolean = false;
    checkEmpty: boolean = true;

    constructor(private roomsService: RoomsService) {}

    ngOnInit(){
        var roomId = localStorage.getItem('roomId');

        this.roomsService.getRoomById(roomId).subscribe(
            (room: Room) => {
                this.room = room;

                if (this.room.facilities.length != 0) {
                    this.faciliteiten = this.room.facilities;
                    this.checkEmpty = false;
                    this.checkFull = true;
                }
            },
            error => console.log(error)
        );
    }

    checkIfEmpty() {
        return this.checkEmpty;
    }

    checkIfFull() {
        return this.checkFull;
    }
}