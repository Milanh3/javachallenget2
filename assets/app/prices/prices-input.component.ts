import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Room} from "../rooms/room.model";
import {Price} from "./price.model";
import {PricesService} from "./prices.service";
import {RoomsService} from "../rooms/rooms.service";

@Component({
    selector: 'app-prices-input',
    templateUrl: './prices-input.component.html'
})

export class PricesInputComponent{
    prijs: number;
    room: Room;
    checkRoomGekozen: boolean = false;

    constructor(private pricesService: PricesService, private roomsService: RoomsService) {}

    ngOnInit(){
        this.roomsService.roomPriceIsEdit.subscribe(
            (room: Room) => {
                this.room = room;

                if (this.room != null) {
                    this.checkRoomGekozen = true;
                }
            }
        );
    }

    checkIfRoom() {
        return this.checkRoomGekozen;
    }

    onChange(value) {
        this.pricesService.editPrice(value);
    }

    onSubmit(form:NgForm){
        var checkVzw = false;
        var checkBedrijf = false;
        var checkLid = false;
        var checkAdmin = false;

        const priceVzw = new Price("vzw", form.value.priceVzw, this.room.roomId);
        const priceBedrijf = new Price("bedrijf", form.value.priceBedrijf, this.room.roomId);
        const priceLid = new Price("lid", form.value.priceLid, this.room.roomId);

        if (this.room.prices.length != 0) {
            //edit
            this.pricesService.updatePrice(priceVzw).subscribe(
                (price: Price) => {
                    console.log(price);
                    checkVzw = true;
                }
            );

            this.pricesService.updatePrice(priceBedrijf).subscribe(
                (price: Price) => {
                    console.log(price);
                    checkBedrijf = true;
                }
            );

            this.pricesService.updatePrice(priceLid).subscribe(
                (price: Price) => {
                    console.log(price);
                    checkLid = true;
                }
            );

            if (checkVzw && checkBedrijf && checkLid) {
                this.room = null;
                this.checkRoomGekozen = false;

                form.resetForm();
            }
        } else {
            //create
            const priceAdmin = new Price("admin", 0, this.room.roomId);

            this.pricesService.addPrice(priceBedrijf).subscribe(
                (price: Price) => {
                    console.log(price);
                    this.room.prices.push(price.priceId);
                    checkVzw = true;
                }
            );

            this.pricesService.addPrice(priceLid).subscribe(
                (price: Price) => {
                    console.log(price);
                    this.room.prices.push(price.priceId);
                    checkLid = true;
                }
            );

            this.pricesService.addPrice(priceAdmin).subscribe(
                (price: Price) => {
                    console.log(price);
                    this.room.prices.push(price.priceId);
                    checkAdmin = true;
                }
            );

            if (checkBedrijf && checkVzw && checkLid && checkAdmin) {
                this.roomsService.updateRoom(this.room).subscribe(
                    result => {
                        console.log(result);

                        this.room = null;
                        this.checkRoomGekozen = false;

                        form.resetForm();
                    }
                );

                this.room = null;
                this.checkRoomGekozen = false;

                form.resetForm();
            }
        }
    }
}