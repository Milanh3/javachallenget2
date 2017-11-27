export class Reservation{
    constructor(
        public start: Date,
        public end: Date, 
        public reason: string, 
        public accepted: boolean,
        public paid: boolean,
        public roomId?: string, 
        public userId?: string,
        public reservationId?: string){}
}