import {Component, OnInit} from "@angular/core";
import {RoomsService} from "./rooms.service";
import {Room} from "./room.model";
import {NgForm} from "@angular/forms";
import indexOf = require("core-js/fn/array/index-of");

@Component({
    selector:'app-room-input',
    templateUrl: 'room-input.component.html',
    styles: [`
        select {
            width: 300px;
            margin-right:50px;
        }
        .floatLeft {
            float: left;
        }
        .floatRight {
            float: right;
        }
        .buttongroup {
            margin-bottom: 150px;
        }
        .buttongroup > button {
            margin-bottom: 10px;
        }
        ul#facilities li, ul#linkedRooms li {
            padding: 5px;
        }
    `]
})

export class RoomInputComponent implements OnInit{
    rooms: Room[];
    room: Room;
    facility: string;
    facilities: string[] = [];
    linkedRoom: Room;
    linkedRoomsIds: string[] = [];
    linkedRooms: Room[] = [];
    linkedRoomsRequired: boolean[] = [];
    checkFacility: boolean = false;
    checkRoom: boolean = false;
    check: boolean;

    constructor(private roomsService: RoomsService) {}

    ngOnInit() {
        this.roomsService.roomIsEdit.subscribe(
            (room: Room) => {
                this.room = room;
                this.facilities = this.room.facilities;

                if (this.room.linkedRooms.length != 0) {
                    for (let r of this.room.linkedRooms) {
                        this.roomsService.getRoomById(r).subscribe(
                            (rr: Room) => {
                                this.linkedRooms.push(rr);
                                this.linkedRoomsIds.push(rr.roomId);
                            }
                        );
                    }
                }

                this.linkedRoomsRequired = this.room.linkedRoomsRequired;
            }
        );

        this.roomsService.getRooms().subscribe(
            (rooms: Room[]) => {
                this.rooms = rooms;
            }
        );
    }

    onSubmit(form:NgForm){
        if (this.room) {
            //edit
            this.room.name = form.value.name;
            this.room.length = form.value.length;
            this.room.width = form.value.width;
            this.room.capacity = form.value.capacity;
            this.room.facilities = this.facilities;
            this.room.location = form.value.location
            this.room.linkedRooms = this.linkedRoomsIds;
            this.room.linkedRoomsRequired = this.linkedRoomsRequired;
            this.roomsService.updateRoom(this.room).subscribe(
                result => console.log(result)
            );

            this.room = null;

            alert('Zaal aangepast!');
        } else {
            //create
            const room = new Room(form.value.name, form.value.length, form.value.width, form.value.capacity, this.facilities, form.value.location, this.linkedRoomsIds, this.linkedRoomsRequired);
            this.roomsService.addRoom(room).subscribe(
                data => console.log(data),
                error => console.error(error)
            );

            alert('Zaal toegevoegd!');
        }

        this.facilities = [];
        this.linkedRooms = [];
        this.linkedRoomsIds = [];
        this.linkedRoomsRequired = [];

        form.resetForm();
    }

    onCancel(form:NgForm){
        this.room = null;
        this.facilities = [];
        this.linkedRooms = [];
        this.linkedRoomsIds = [];
        this.linkedRoomsRequired = [];

        form.resetForm();
        alert("Geannuleerd! Er werd niets aangepast.");
    }

    onDelete(form:NgForm){
        this.roomsService.deleteRoom(this.room).subscribe(
            result => console.log(result)
        );

        this.facilities = [];
        this.linkedRooms = [];
        this.linkedRoomsIds = [];
        this.linkedRoomsRequired = [];

        form.resetForm();

        alert("Zaal verwijderd!");
    }

    addFacility() {
        this.checkFacility = true;
    }

    checkClickFacility() {
        return this.checkFacility;
    }

    onSubmitFacility(form:NgForm) {
        var check = false;

        if (form.value.facility != null || form.value.facility != "") {
            for (var i = 0; i < this.facilities.length; i++) {
                if (this.facilities[i] == form.value.facility) {
                    check = true;
                }
            }

            if (!check) {
                this.facilities.push(form.value.facility);
                alert("Faciliteit toegevoegd!");
            } else {
                alert("Faciliteit al toegevoegd!");
            }

            this.checkFacility = false;
        } else {
            alert("Vul faciliteit in!");
        }
    }

    onCancelFacility(form:NgForm){
        this.checkFacility = false;
        alert("Geannuleerd! Er werd geen faciliteit toegevoegd");
    }

    deleteFacility(value: string) {
        for (var i = 0; i < this.facilities.length; i++) {
            if (this.facilities[i] == value) {
                this.facilities.splice(i, 1);
            }
        }
    }

    addRoom() {
        this.checkRoom = true;
    }

    checkClickRoom() {
        return this.checkRoom;
    }

    onSubmitRoom(form:NgForm) {
        var check = false;
        var required = form.value.linkedRoomRequired;

        if (required) {
            required = false;
        } else {
            required = true;
        }

        if (form.value.linkedRoom != null) {
            for (var i = 0; i < this.linkedRooms.length; i++) {
                if (this.room.roomId != null) {
                    if (this.room.roomId == form.value.linkedRoom) {
                        alert("Kan zaal niet aan zichzelf linken!");
                    }
                } else {
                    if (this.linkedRooms[i].roomId == form.value.linkedRoom) {
                        check = true;
                    }

                    if (!check) {
                        this.roomsService.getRoomById(form.value.linkedRoom).subscribe(
                            (linkedRoom: Room) => {
                                this.linkedRooms.push(linkedRoom);
                                this.linkedRoomsIds.push(linkedRoom.roomId);
                                this.linkedRoomsRequired.push(required);
                                alert("Zaal gelinkt!");
                            },
                            error => console.log(error)
                        );
                    } else {
                        alert("Zaal al gelinkt!");
                    }
                }
            }

            this.checkRoom = false;
        } else {
            alert("Kies een zaal!");
        }
    }

    onCancelRoom(form:NgForm){
        this.checkRoom = false;
        alert("Geannuleerd! Er werd geen zaal gelinkt");
    }

    deleteRoom(value: Room) {
        for (var i = 0; i < this.linkedRooms.length; i++) {
            if (this.linkedRooms[i].roomId == value.roomId) {
                this.linkedRooms.splice(i, 1);
                this.linkedRoomsIds.splice(i, 1);
                this.linkedRoomsRequired.splice(i, 1);
            }
        }
    }
}