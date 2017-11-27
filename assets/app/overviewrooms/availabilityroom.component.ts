import {Component, OnInit, LOCALE_ID, Inject} from "@angular/core";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";
import {ReservationsService} from "../reservations/reservations.service";
import {Reservation} from "../reservations/reservation.model";

@Component({
    selector: 'app-availabilityroom',
    template: `
        <angular2-fullcalendar [options]="calendarOptions"></angular2-fullcalendar>
    `
})

export class AvailabilityRoomComponent implements OnInit {
    private currentDate;
    room: Room;
    locale = '';
    event = { title: 'bezet', start: new Date(2017, 11, 24, 14, 25, 0, 0), end: new Date(2017, 11, 24, 14, 25, 0, 0), allDay: false, editable: false, overlap: false, color: '#CEB64A'};
    events: { title: string, start: Date, end: Date, allDay: boolean, editable: boolean, overlap: boolean, color: string }[] = [];
    calendarOptions:Object = {
        contentHeight: 450,
        locale: this.locale,
        fixedWeekCount : false,
        defaultDate: this.currentDate,
        eventLimit: false,
        events: this.events,
        timeFormat: 'H(:mm)'
    };

    constructor(@Inject(LOCALE_ID) locale: string, private roomsService: RoomsService, private reservationsService: ReservationsService) {
        this.currentDate = new Date();
        this.locale = locale;
    }

    ngOnInit(){
        var roomId = localStorage.getItem('roomId');

        this.roomsService.getRoomById(roomId).subscribe(
            (room: Room) => {
                this.room = room;

                if (this.room.reservations.length != 0) {
                    for (let res of this.room.reservations) {
                        this.reservationsService.getReservationById(res.reservationId).subscribe(
                            (reservation: Reservation) => {
                                var startDate = new Date(reservation.start);
                                var endDate = new Date(reservation.end);
                                this.event = { title: startDate.format('HH:mm') + " - " + endDate.format('HH:mm'), start: startDate, end: endDate, allDay: false, editable: false, overlap: false, color: '#CEB64A'};
                                this.events.push(this.event);
                            }
                        );
                    }

                     this.calendarOptions = {
                        contentHeight: 450,
                        locale: this.locale,
                        fixedWeekCount : false,
                        defaultDate: this.currentDate,
                        eventLimit: false,
                        events: this.events,
                        timeFormat: 'H(:mm)'
                     };
                }
            },
            error => console.log(error)
        );
    }
}