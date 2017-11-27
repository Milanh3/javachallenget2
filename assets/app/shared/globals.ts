import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    urlPath: string = 'http://localhost:3000'; //=> voor lokaal
    // urlPath: string = ''; => voor heroku
    emailValidationPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    adminRegisterCode = "12345";
}