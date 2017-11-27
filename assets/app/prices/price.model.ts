export class Price{
    constructor(
        public priceCategory: string,
        public price: number,
        public roomId: string,
        public priceId?: string){}
}