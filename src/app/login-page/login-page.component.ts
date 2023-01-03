import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { FirebaseService } from 'src/shared/data.service';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  displayStyle = 'none';
  form: FormGroup;
  constructor(
    private generalService: GeneralService,
    private readonly fbService: FirebaseService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder // private data: DataService
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(formData: any) {
    this.displayStyle = 'block';
    console.log(formData);
    // this.fbService.signup(formData.email, formData.password);
    this.fbService.signin(formData.email, formData.password).then((res) => {
      this.displayStyle = 'none';
      console.log(res);
      if (res == undefined) {
        console.log('success');
        this.generalService.transferUserSessionDetails.next(true); // pass data to top bar
        this.router.navigate(['main']);
      } else {
        window.alert(res);
      }
    });
  }
}
