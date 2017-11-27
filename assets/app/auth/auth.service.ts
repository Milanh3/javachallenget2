import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
//om .map en andere operators mogelijk te maken
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class AuthService{
    constructor(private http: Http, private errorService: ErrorService, private globals: Globals){}

    signup(user: User){
        const body = JSON.stringify(user);
        console.log(user);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post(this.globals.urlPath + '/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    signin(user: User){
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post(this.globals.urlPath + '/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

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
                    user.reservations,
                    user._id);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') != null;
    }
}