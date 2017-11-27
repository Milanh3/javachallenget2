import {Component, OnInit} from "@angular/core";
import {Room} from "./room.model";
import {RoomsService} from "./rooms.service";

@Component({
    selector: 'app-rooms-list',
    template: `
        <select [(ngModel)]="Room" size="10" class="form-control">
            <option *ngFor="let room of rooms" [value]="room.roomId" (click)="onChange(room)">{{room.name}}</option>
        </select>
    `
})

export class RoomsListComponent implements OnInit{
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
        this.roomsService.editRoom(value);
    }
}