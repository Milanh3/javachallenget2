import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class AdminService{
    constructor(private http: Http, private errorService: ErrorService, private globals: Globals){}

    isAdmin(){
        return this.http.get(this.globals.urlPath + '/user/' +localStorage.getItem('userId'))
            .map((response: Response) => response.json())
            .subscribe((response: Response) => {
                // Read the result field from the JSON response.
                return response.json().obj[0].isAdmin;
            });
    }
}