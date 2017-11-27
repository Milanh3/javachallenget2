import { User } from "../auth/user.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class UserService {
    constructor(private http:Http, private errorService:ErrorService, private globals:Globals){}

    getUserById(id: String) {
        return this.http.get(this.globals.urlPath + '/user/' + id)
            .map((response: Response) => {
                const user = response.json().obj;
                return new User(
                    user.email,
                    user.password,
                    user.lastName,
                    user.firstName,
                    user.telephone,
                    user.priceCategory,
                    user.isAdmin,
                    user._id
                );
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }
}