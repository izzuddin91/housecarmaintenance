import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';

@Component({
  selector: 'app-car-parts-new',
  templateUrl: './car-parts-new.component.html',
  styleUrls: ['./car-parts-new.component.scss'],
})
export class CarPartsNewComponent implements OnInit {
  form: FormGroup;
  app: any;
  displayStyle = 'none';
  carParts: CarParts = {
    id: '',
    partsName: '',
    description: '',
    photoLink: '',
    price: 0,
    date: new Date(),
    lifespan: 0,
    monitorAge: false,
  };

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private data: DataService
  ) {
    this.form = this.formBuilder.group({
      partsName: [''],
      description: [''],
      price: [''],
      date: [''],
      lifespan: [''],
      photoLink: [''],
      monitorAge: [],
    });
  }

  ngOnInit(): void {}

  onSubmit(formData: any) {
    this.carParts.id = '';
    this.carParts.partsName = formData.partsName;
    this.carParts.description = formData.description;
    this.carParts.price = formData.price;
    this.carParts.date = new Date(formData.date);
    this.carParts.lifespan = formData.lifespan;
    this.carParts.monitorAge = formData.monitorAge;
    this.carParts.photoLink = formData.photoLink;
    console.log(this.carParts);
    this.data.addParts(this.carParts).then((val) => {
      this.displayStyle = 'block';
    });
  }

  backPage() {
    this.displayStyle = 'none';
    this.router.navigate(['car-main-page']);
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
