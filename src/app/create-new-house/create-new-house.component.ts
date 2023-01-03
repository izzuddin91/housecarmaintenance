import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { formatDate } from '@angular/common';
import { retrieve, save } from '../car-main/local-storage';


@Component({
  selector: 'app-create-new-house',
  templateUrl: './create-new-house.component.html',
  styleUrls: ['./create-new-house.component.scss']
})
export class CreateNewHouseComponent implements OnInit {
  form!: FormGroup;
  app: any;
  displayStyle = 'none';
  house: any = {
    id: '',
    houseName: '',
    installement: 0,
    maintenance: 0,
    sinkingFund: 0,
    electricity: 0,
    water: 0,
    wifi: 0,
  }
  dateFormat = 'yyyy-MM-dd';
  language = 'en';

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private data: DataService
  ) {

    this.form = this.formBuilder.group({
      // id: [],
      houseName: [],
      installement: [],
      maintenance: [],
      sinkingFund: [],
      electricity: [],
      water: [],
      wifi: [],
    });

  

  }
  ngOnInit(): void {  }

  onSubmit(formData: any) {
    console.log(formData)
    // this.house.id = formData.id;
    this.house.houseName = formData.houseName;
    this.house.installement = formData.installement;
    this.house.maintenance = formData.maintenance;
    this.house.sinkingFund = formData.sinkingFund;
    this.house.electricity = formData.electricity;
    this.house.water = formData.water;
    this.house.wifi = formData.wifi;

    // calculate the total need to be paid :
    this.house.total = formData.installement + formData.maintenance + formData.sinkingFund + formData.electricity + formData.water + formData.wifi
    console.log(this.house);
    this.data.addHouse(this.house).then((val) => {
      this.displayStyle = 'block';
    });
  }

  backPage() {
    this.displayStyle = 'none';
    this.router.navigate(['houses-list-all']);
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
