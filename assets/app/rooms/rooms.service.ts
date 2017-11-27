import {Room} from "./room.model";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
//om .map en andere operators mogelijk te maken
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";
import {Price} from "../prices/price.model";

@Injectable()
export class RoomsService{
    rooms: Room[] = [];
    roomIsEdit = new EventEmitter<Room>();
    roomPriceIsEdit = new EventEmitter<Room>();
    prices: Price[] = [];

    constructor(private http:Http, private errorService:ErrorService, private globals:Globals){}

    addRoom(room: Room) {
        const body = JSON.stringify(room);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(this.globals.urlPath + '/room' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const room = new Room(result.obj.name, result.obj.length, result.obj.width, result.obj.capacity, result.obj.facilities, result.obj.location, result.obj._id, result.obj.linkedRooms, result.obj.linkedRoomsRequired);
                this.rooms.push(room);
                return room;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editRoom(room: Room) {
        this.roomIsEdit.emit(room);
    }

    editRoomPrice(room: Room) {
        this.roomPriceIsEdit.emit(room);
    }

    updateRoom(room: Room){
        const body = JSON.stringify(room);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(this.globals.urlPath + '/room/' + room.roomId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getRooms(){
        return this.http.get(this.globals.urlPath + '/room')
            .map((response: Response) => {
                const rooms = response.json().obj;
                let transformedRooms: Room[] = [];
                for (let room of rooms) {
                    transformedRooms.push(new Room(
                        room.name,
                        room.length,
                        room.width,
                        room.capacity,
                        room.facilities,
                        room.location,
                        room.linkedRooms,
                        room.linkedRoomsRequired,
                        room.reservations,
                        room.prices,
                        room._id
                    ));
                }
                this.rooms = transformedRooms;
                return transformedRooms;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getRoomById(id: String) {
        return this.http.get(this.globals.urlPath + '/room/' + id)
            .map((response: Response) => {
                const room = response.json().obj;
                return new Room(
                    room.name,
                    room.length,
                    room.width,
                    room.capacity,
                    room.facilities,
                    room.location,
                    room.linkedRooms,
                    room.linkedRoomsRequired,
                    room.reservations,
                    room.prices,
                    room._id);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteRoom(room: Room){
        this.rooms.splice(this.rooms.indexOf(room),1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.globals.urlPath + '/room' + room.roomId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }
}