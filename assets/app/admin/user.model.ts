export class User{
    constructor(public email: string, public password: string, public lastName?: string, public firstName?: string, public telephone?: string, public priceCategory?: string, public isAdmin?: boolean, public userId?: string){}
}