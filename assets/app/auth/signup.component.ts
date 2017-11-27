import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Globals} from "../shared/globals";

@Component ({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit{
    myForm: FormGroup;

    constructor(private authService: AuthService, private globals: Globals){}

    onSubmit(){
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.firstName,
            this.myForm.value.lastName,
            this.myForm.value.telephone,
            "lid",
            false
        );

        this.authService.signup(user).subscribe(
              data => console.log(data),
                error => console.error(error)
        );

        this.myForm.reset();
    }

    ngOnInit(){
        this.myForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null,[
                Validators.required,
                Validators.pattern(this.globals.emailValidationPattern)
            ]),
            telephone: new FormControl(null, Validators.required),
            password:new FormControl(null, Validators.required)
        })
    }

}