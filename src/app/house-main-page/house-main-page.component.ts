import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-house-main-page',
  templateUrl: './house-main-page.component.html',
  styleUrls: ['./house-main-page.component.scss'],
})
export class HouseMainPageComponent implements OnInit {
  array: any[] = [];

  constructor(
    private datePipe: DatePipe,
    private readonly router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.getHouseTasks().subscribe((res) => {
      res.map((e) => {
        this.array.push(e.payload.doc.data());
      });
    });
  }

  delete(i: CarParts) {
    if (window.confirm('Are you sure you want to delete ?')) {
      this.data.deleteParts(i);
      window.location.reload();
    }
  }

  edit(i: CarParts) {
    this.router.navigate(['car-parts-edit'], { state: { carParts: i } });
  }

  addNew() {
    this.router.navigate(['car-parts-new']);
  }
}
