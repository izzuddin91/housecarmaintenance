import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarMainComponent } from './car-main/car-main.component';
import { CarPartsNewComponent } from './car-parts-new/car-parts-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './main-page/main-page.component';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginPageComponent } from './login-page/login-page.component';
import { DataService, FirebaseService } from 'src/shared/data.service';
import { DatePipe } from '@angular/common';
import { EditCarPartsComponent } from './edit-car-parts/edit-car-parts.component';
import { ModuleHeaderComponent } from './module-header/module-header.component';
import { MatIconModule } from '@angular/material/icon';
import { HouseMainPageComponent } from './house-main-page/house-main-page.component';
import { HouseTasksNewComponent } from './house-tasks-new/house-tasks-new.component';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { CreateNewHouseComponent } from './create-new-house/create-new-house.component';
import { HousesListAllComponent } from './houses-list-all/houses-list-all.component';
import { HouseLogsComponent } from './house-logs/house-logs.component';
import { HouseLogsNewComponent } from './house-logs-new/house-logs-new.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ModuleHeaderComponent,
    AppComponent,
    CarMainComponent,
    CarPartsNewComponent,
    MainPageComponent,
    LoginPageComponent,
    EditCarPartsComponent,
    HouseMainPageComponent,
    HouseTasksNewComponent,
    CreateNewHouseComponent,
    HousesListAllComponent,
    HouseLogsComponent,
    HouseLogsNewComponent,
  ],
  imports: [
    MatTableModule,
    RouterModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, // <----- import(must)
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
    AngularFirestoreModule,
    AngularFirestore,
    AngularFireDatabase,
    FirebaseService,
    DataService,
    MatDatepickerModule,
    MatNativeDateModule,
    FirebaseService,
    DatePipe,
    AngularFireDatabaseModule,
    FirebaseService,
    AngularFireAuthModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
