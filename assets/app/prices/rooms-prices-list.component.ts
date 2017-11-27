import {Component, OnInit} from "@angular/core";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";

@Component({
    selector: 'app-rooms-prices-list',
    template: `
        <select [(ngModel)]="Room" size="10" class="form-control">
            <option *ngFor="let room of rooms" [value]="room.roomId" (click)="onChange(room)">{{room.name}}</option>
        </select>
    `
})

export class RoomsPricesListComponent implements OnInit{
    rooms: Room[];

    constructor(private roomsService: RoomsService) {}

    ngOnInit(){
        this.roomsService.getRooms().subscribe(
            (rooms: Room[]) => {
                this.rooms = rooms;
            }
        );
    }

    onChange(value) {
        this.roomsService.editRoomPrice(value);
    }
}