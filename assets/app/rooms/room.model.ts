import {Reservation} from "../reservations/reservation.model";
import {Price} from "../prices/price.model";

export class Room{
    constructor(
        public name: string,
        public length: number,
        public width: number,
        public capacity: number,
        public facilities: string[],
        public location: string,
        public linkedRooms?: string[],
        public linkedRoomsRequired?: boolean[],
        public reservations?: string[],
        public prices?: string[],
        public roomId?: string){}
}