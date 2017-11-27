import {Component, OnInit, ViewContainerRef, ViewEncapsulation } from "@angular/core";
import {User} from "../auth/user.model";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";
import {Reservation} from "./reservation.model";
import {ReservationsService} from "./reservations.service";
import { forEach } from "@angular/router/src/utils/collection";
import {UserService} from "../shared/user.service";

@Component({
    selector: 'app-reservations',
    templateUrl: 'reservations.component.html',
    styles: [`
        .fa-check.faded{ opacity : 0.2 }
        table { margin-top: 75px;
                margin-bottom: 55%;}
    `]
})

export class ReservationsComponent{

    reservations: Reservation[] = [];
    rooms: object[] = []; //map roomId => roomName
    users: string[] = []; //map userId => userName
    sortedBy: string;

    constructor(private reservationsService:ReservationsService, private userService:UserService, private roomsService:RoomsService) {}

    ngOnInit(){
        this.reservationsService.getReservations(0,1000000000000).subscribe(
            (reservations : Reservation[]) => {
                this.reservations = reservations;
                reservations.forEach(reservation => {
                    //console.log(reservation.roomId)
                    this.roomsService.getRoomById(reservation.roomId).subscribe(
                        (room : Room) => {
                            this.rooms[room.roomId] = room.name;
                        }
                    );
                    this.userService.getUserById(reservation.userId).subscribe(
                        (user : User) => {
                            this.users.push(user.firstName + " " + user.lastName);
                        }
                    );
                });
            }
        );
    }

    toggleAccept(id){
        var res = this.reservations.find(
            (reservation: Reservation) => {return reservation.reservationId == id}
        );
        res.accepted = !res.accepted;
        this.reservationsService.updateReservation(res).subscribe(
            /*result => console.log(result)*/
        );
    }

    togglePaid(id){
        var res = this.reservations.find(
            (reservation: Reservation) => {return reservation.reservationId == id}
        );
        res.paid = !res.paid;
        this.reservationsService.updateReservation(res).subscribe(
            /*result => console.log(result)*/
        );;
    }

    remove(id){
        var res = this.reservations.find(
            (reservation: Reservation) => {return reservation.reservationId == id}
        );
        this.reservationsService.deleteReservation(res).subscribe(
            /*result => console.log(result)*/
        );
    }

    _sortBy(propertyName, comparator: (lhs,rhs)=> number){
        if (this.sortedBy == propertyName + "Asc"){
            this.sortedBy = propertyName + "Desc";
            this.reservations.sort(
                (lhs, rhs) => {
                    return -1*comparator(lhs,rhs);
                }
            )
        }
        else{
            this.sortedBy = propertyName + "Asc"
            this.reservations.sort(
                (lhs, rhs) => {
                    return comparator(lhs,rhs);
                }
            )
        }
    }

    sortBy(propertyName){
        console.log(this.sortedBy + " => "+propertyName);
        this._sortBy(propertyName, function lessThen(lhs: Reservation, rhs:Reservation){
                if (lhs[propertyName] < rhs[propertyName]) return -1;
                if (lhs[propertyName] == rhs[propertyName]) return 0;
                return 1;
            }
        )  
    }

    sortByRoom(){
        this._sortBy("Room",
            (lhs: Reservation, rhs:Reservation) => {
                if (this.rooms[lhs.roomId] < this.rooms[rhs.roomId]) return -1;
                if (this.rooms[lhs.roomId] == this.rooms[rhs.roomId]) return 0;
                return 1;
            }
        )
    }

    sortByUser(){
        this._sortBy("User",
            (lhs: Reservation, rhs:Reservation) => {
                if (this.users[lhs.userId] < this.users[rhs.userId]) return -1;
                if (this.users[lhs.userId] == this.users[rhs.userId]) return 0;
                return 1;
            }
        )
    }

    filter(string){
    }
}