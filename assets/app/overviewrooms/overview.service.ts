import {Room} from "../rooms/room.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
//om .map en andere operators mogelijk te maken
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class OverviewService{
    constructor(private http:Http, private errorService:ErrorService, private globals:Globals){}

    room: Room;
}