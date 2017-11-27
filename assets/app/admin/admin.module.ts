import {CommonModule} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {adminRouting} from "./admin.routes";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        adminRouting
    ]
})

export class AdminModule{
    
}