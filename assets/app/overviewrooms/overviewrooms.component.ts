import {Component, OnInit} from "@angular/core";
import {Room} from "../rooms/room.model";
import {RoomsService} from "../rooms/rooms.service";

@Component({
    selector: 'app-overviewrooms',
    template: `
        <div class="row whiteBG">
            <div class="col-md-10 col-md-offset-1 text-center">
                <h1 class="text-left" i18n>Zalen</h1>
                
                <figure class="figure">
                    <img src="/images/beneden.PNG" title="Gelijkvloers" class="figure-img img-responsive center-block" alt="Gelijkvloers plattegrond" />
                    <figcaption class="figure-catpion">Plattegrond van het gelijkvloers.</figcaption>
                </figure>

                <figure class="figure">
                    <img src="/images/boven.PNG" title="Eerste verdiep" class="figure-img img-responsive center-block" alt="Verdiep 1 plattegrond" />
                    <figcaption class="figure-caption">Plattegrond van het eerste verdiep.</figcaption>
                </figure>

                <div class="marginTopBottom form-group">
                    <label for="zalenlijst" i18n>Kies een zaal: </label>
                    
                    <select id="zalenlijst" [(ngModel)]="Room" class="form-control inline" (ngModelChange)="onChange($event)">
                        <option *ngFor="let room of rooms" [value]="room.roomId">{{ room.name }}</option>
                    </select>
                    
                    <a [routerLink]="['/overviewroom']" class="noDesign btn btn-primary" i18n>Bekijk zaal: beschikbaarheid & details</a>
                </div>
            </div>
        </div>
    `,
    styles: [`
        select {
            width: 300px;
            margin-right:30px;
        }
        .marginTopBottom {
            margin-top: 100px;
            margin-bottom: 150px;
        }
        .inline {
            display: inline;
        }
        figure:first-of-type {
            margin-top: 25px;
            margin-bottom: 55px;
        }
    `]
})

export class OverviewRoomsComponent implements OnInit {
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
        this.roomsService.getRoomById(value).subscribe(
            (room: Room) => {
                localStorage.setItem('roomId', room.roomId);
            },
            error => console.log(error)
        );
    }
}