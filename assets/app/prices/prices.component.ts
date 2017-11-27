import {Component} from "@angular/core";

@Component({
    selector: 'app-prices',
    template: `
        <div class="row whiteBG" id="inhoud">
            <div class="col-md-10 col-sm-offset-1">
                <h1 i18n>Prijzenbeheer</h1>

                <p>&nbsp;</p>
                
                <div class="col-md-4">
                    <app-rooms-prices-list></app-rooms-prices-list>
                </div>

                <div class="col-md-6">
                    <app-prices-input></app-prices-input>
                </div>

                <p>&nbsp;</p>
            </div>
        </div>
        
    `,
    styles: [`
        div#inhoud {
            margin-bottom: 30%;
        }
    `]
})

export class PricesComponent{

}