import {Reservation} from "./reservation.model";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class ReservationsService{
    constructor(private http:Http, private errorService:ErrorService, private globals:Globals){}

    reservations: Reservation[] = [];

    addReservation(reservation: Reservation){
        const body = JSON.stringify(reservation);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.globals.urlPath + '/reservation', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const reservation = new Reservation(result.obj.start, result.obj.end, result.obj.reason, result.obj.accepted, result.obj.paid, result.obj._id, result.obj.room, result.obj.user);
                this.reservations.push(reservation);
                return reservation;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    updateReservation(reservation: Reservation){
        const body = JSON.stringify(reservation);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch(this.globals.urlPath + '/reservation/' + reservation.reservationId, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getReservations(offset, count){
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(this.globals.urlPath + '/reservation/'+offset+'/'+count + token, {headers: headers})
            .map((response: Response) => {
                const reservations = response.json().obj;
                let transformedreservations: Reservation[] = [];
                for (let reservation of reservations) {
                    transformedreservations.push(new Reservation(
                        new Date(reservation.start),
                        new Date(reservation.end),
                        reservation.reason,
                        reservation.accepted,
                        reservation.paid,
                        reservation.room._id,
                        reservation.user._id,
                        reservation._id
                    ));
                }
                this.reservations = transformedreservations;
                return transformedreservations;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getReservationById(id: String) {
        return this.http.get(this.globals.urlPath + '/reservation/' + id)
            .map((response: Response) => {
                const reservation = response.json().obj;
                return new Reservation(
                    new Date(reservation.start),
                    new Date(reservation.end),
                    reservation.reason,
                    reservation.accepted,
                    reservation.paid,
                    reservation.room._id,
                    reservation.user._id,
                    reservation._id)
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    deleteReservation(reservation: Reservation){
        this.reservations.splice(this.reservations.indexOf(reservation),1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.globals.urlPath + '/reservation/' + reservation.reservationId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }
}