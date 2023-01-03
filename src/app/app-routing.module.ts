import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarMainComponent } from './car-main/car-main.component';
import { CarPartsNewComponent } from './car-parts-new/car-parts-new.component';
import { CreateNewHouseComponent } from './create-new-house/create-new-house.component';
import { EditCarPartsComponent } from './edit-car-parts/edit-car-parts.component';
import { HouseLogsNewComponent } from './house-logs-new/house-logs-new.component';
import { HouseLogsComponent } from './house-logs/house-logs.component';
import { HouseMainPageComponent } from './house-main-page/house-main-page.component';
import { HouseTasksNewComponent } from './house-tasks-new/house-tasks-new.component';
import { HousesListAllComponent } from './houses-list-all/houses-list-all.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'main', component: MainPageComponent },
  { path: 'car-main-page', component: CarMainComponent },
  { path: 'car-parts-new', component: CarPartsNewComponent },
  { path: 'car-parts-edit', component: EditCarPartsComponent },
  { path: 'house-main-page', component: HouseMainPageComponent },
  { path: 'house-tasks-new', component: HouseTasksNewComponent },
  { path: 'create-new-house', component: CreateNewHouseComponent },
  { path: 'houses-list-all', component: HousesListAllComponent },
  { path: 'house-logs', component: HouseLogsComponent },
  { path: 'house-logs-new', component: HouseLogsNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
