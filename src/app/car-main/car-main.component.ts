import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-main',
  templateUrl: './car-main.component.html',
  styleUrls: ['./car-main.component.scss'],
})
export class CarMainComponent implements OnInit {
  array: any[] = [];
  ageMonitorparts: any[] = [];
  constructor(
    private datePipe: DatePipe,
    private readonly router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.getAllParts().subscribe((res) => {
      res.map((e) => {
        this.array.push(e.payload.doc.data());
      });
      for (var i = 0; i < this.array.length; i++) {
        if (this.array[i]['monitorAge']) {
          var currentMonth = this.calculateDiff(this.array[i]['date'].toDate());
          var monthsLeft = this.array[i]['lifespan'] - currentMonth;
          this.array[i]['monthsLeft'] = monthsLeft;
          this.ageMonitorparts.push(this.array[i]);
        }
      }
    });
  }

  addNew() {
    this.router.navigate(['car-parts-new']);
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

  calculateDiff(data: any) {
    let date = new Date(data);
    let currentDate = new Date();

    let days = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24
    );
    var months = days / 30;
    months = Math.round(months * 10) / 10;
    return months;
  }
}
