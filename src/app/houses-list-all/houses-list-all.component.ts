import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-houses-list-all',
  templateUrl: './houses-list-all.component.html',
  styleUrls: ['./houses-list-all.component.scss']
})
export class HousesListAllComponent implements OnInit {

  array: any[] = [];
  ngOnInit(): void {
    this.data.listAllHouses().subscribe((res) => {
      res.map((e) => {
        this.array.push(e.payload.doc.data());
      });
    });
    console.log(this.array)
  }

  constructor(
    private datePipe: DatePipe,
    private readonly router: Router,
    private data: DataService
  ){}

  toHouseLogs(id: String) {
    console.log(id)
    this.router.navigate(['house-logs'], { state: { houseId: id } });
  }

}
