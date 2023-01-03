import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  toCarPage() {
    this.router.navigate(['car-main-page']);
  }

  toHousePage() {
    this.router.navigate(['house-main-page']);
  }

  toDisplayAllHouses() {
    this.router.navigate(['houses-list-all']);
  }

  toCreateNewHouse() {
    this.router.navigate(['create-new-house']);
  }
}
