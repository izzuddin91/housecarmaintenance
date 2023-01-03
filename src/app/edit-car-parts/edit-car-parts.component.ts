import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { formatDate } from '@angular/common';
import { retrieve, save } from '../car-main/local-storage';

@Component({
  selector: 'app-edit-car-parts',
  templateUrl: './edit-car-parts.component.html',
  styleUrls: ['./edit-car-parts.component.scss'],
})
export class EditCarPartsComponent implements OnInit {
  form!: FormGroup;
  app: any;
  displayStyle = 'none';
  carParts: any;
  dateFormat = 'yyyy-MM-dd';
  language = 'en';

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private data: DataService
  ) {
    var purchaseDate = new Date();
    const a = this.router.getCurrentNavigation()?.extras.state;
    console.log(a == undefined);
    if (a == undefined) {
      console.log(retrieve('carParts'));
      this.carParts = retrieve('carParts');
      console.log(retrieve('purchaseDate'));
      purchaseDate = new Date(retrieve('purchaseDate'));
    } else {
      this.carParts = a!['carParts'];
      save('carParts', this.carParts);
      console.log(retrieve('carParts'));
      purchaseDate = this.carParts.date.toDate();
    }

    this.form = this.formBuilder.group({
      id: [this.carParts.id],
      partsName: [this.carParts.partsName],
      description: [this.carParts.description],
      price: [this.carParts.price],
      date: new FormControl(this.formatFormDate(new Date(purchaseDate))),
      lifespan: [this.carParts.lifespan],
      monitorAge: [this.carParts.monitorAge],
      photoLink: [this.carParts.photoLink],
    });
  }

  ngOnInit(): void {}

  formatFormDate(date: Date) {
    save('purchaseDate', formatDate(date, this.dateFormat, this.language));
    return formatDate(date, this.dateFormat, this.language);
  }

  onSubmit(formData: any) {
    this.carParts.id = formData.id;
    this.carParts.partsName = formData.partsName;
    this.carParts.description = formData.description;
    this.carParts.price = formData.price;
    this.carParts.date = new Date(formData.date);
    this.carParts.lifespan = formData.lifespan;
    this.carParts.monitorAge = formData.monitorAge;
    this.carParts.photoLink = formData.photoLink;
    console.log(this.carParts);
    this.data.updateParts(this.carParts).then((val) => {
      this.displayStyle = 'block';
    });
  }

  backPage() {
    this.displayStyle = 'none';
    this.router.navigate(['car-main-page']);
    var a = this.router.getCurrentNavigation()?.extras.state;
  }
  closePopup() {
    this.displayStyle = 'none';
  }
}
