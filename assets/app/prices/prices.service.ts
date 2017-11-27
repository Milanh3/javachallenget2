import {Price} from "./price.model";
import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
//om .map en andere operators mogelijk te maken
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";
import {Globals} from "../shared/globals";

@Injectable()
export class PricesService{
    constructor(private http:Http, private errorService:ErrorService, private globals:Globals){}

    prices: Price[] = [];
    priceIsEdit = new EventEmitter<Price>();

    addPrice(price: Price){
        const body = JSON.stringify(price);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(this.globals.urlPath + '/price' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const price = new Price(result.obj.priceCategory, result.obj.price, result.obj.room, result.obj._id);
                this.prices.push(price);
                return price;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getPrices(){
        return this.http.get(this.globals.urlPath + '/price')
            .map((response: Response) => {
                const prices = response.json().obj;
                let transformedPrices: Price[] = [];
                for(let price of prices){
                    transformedPrices.push(new Price(
                        price.priceCategory,
                        price.price,
                        price.room,
                        price._id));
                }
                this.prices = transformedPrices;
                return transformedPrices;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    getPriceById(id: String){
        return this.http.get(this.globals.urlPath + '/price/' + id)
            .map((response: Response) => {
                const price = response.json().obj;
                return new Price(
                        price.priceCategory,
                        price.price,
                        price.room,
                        price._id);
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    updatePrice(price:Price){
        const body = JSON.stringify(price);
        const headers = new Headers({'Content-Type' : 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(this.globals.urlPath + '/price/' + price.priceId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                /*this.errorService.handleError(error.json());
                return Observable.throw(error.json())*/
                console.log("error");
            });
    }

    deletePrice(price: Price){
        this.prices.splice(this.prices.indexOf(price),1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete(this.globals.urlPath + '/price/' + price.priceId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json())
            });
    }

    editPrice(price: Price) {
        this.priceIsEdit.emit(price);
    }
}