import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CarParts } from 'src/model/car_parts';
import { DataService } from 'src/shared/data.service';
import { FileUpload, FileUploadService } from 'src/shared/file-upload.service';
import { retrieve, save } from '../car-main/local-storage';
import { MatTableDataSource } from '@angular/material/table'
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-house-logs',
  templateUrl: './house-logs.component.html',
  styleUrls: ['./house-logs.component.scss']
})
export class HouseLogsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'notes', 'total', 'image', 'download'];
  form!: FormGroup;
  displayStyle = 'none';
  displayStyle2 = 'none';
  array: any[] = [];
  houseId = '';
  dataSource = this.array;
  m = new Date().getMonth() + 1;
  y = new Date().getFullYear().toString();
  currentMonthYear = this.m + '-' + this.y;
  selectedFiles: FileList | undefined;
  currentFileUpload: FileUpload | undefined;
  percentage: number | undefined;
  filename: String | undefined;

  ngOnInit(): void {

  }

  constructor(
    private uploadService: FileUploadService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private data: DataService
  ){
    this.dataSource = [{}] // empty initialization
      if (this.router.getCurrentNavigation()?.extras.state != null){
        var houseId = this.router.getCurrentNavigation()?.extras.state
        this.houseId = houseId!['houseId']
        save('houseId', this.houseId )
      }
      else {
        this.houseId = retrieve('houseId')
      }

      this.form = this.formBuilder.group({
        houseId: [this.houseId],
        notes: [],
        total: [],
        date: [],
        filename: []
      });

    this.data.listHouseLogs(this.houseId).subscribe((res) => {
      
      res.map((e) => {
        this.array.push(e.payload.doc.data({ serverTimestamps: 'estimate' }));
        this.dataSource = this.array
      });

      //query this list so we can get only the entry for this particular month 
      var filteredArray = []
      for (var i = 0; i < this.dataSource.length; i++){
        var this_data_month = this.dataSource[i]['date'].toDate().getMonth() + 1
        var this_data_year = this.dataSource[i]['date'].toDate().getFullYear()

        if (this_data_month+'-'+this_data_year == this.currentMonthYear ){
          // remove if the data is not within this month
          // this.dataSource.splice(i, 1)
          filteredArray.push(this.dataSource[i])
          console.log(this.currentMonthYear)
          console.log(this_data_month+'-'+this_data_year)
        }

      }
      this.dataSource = filteredArray

      for (var i = 0; i < this.dataSource.length; i++){
        this.dataSource[i]['date'] = this.dataSource[i]['date'].toDate().toDateString()
      }
    });

  }

  showImage(filename: string){

    this.filename = filename
    this.displayStyle2 = 'block';
  }

  downloadImage(filename: string){

    window.open(filename, "_blank");
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.filename = this.selectedFiles![0]['name']
  }

  async upload(): Promise<string> {

    const file = this.selectedFiles!.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file!);
    const urls: any = await this.uploadService.uploadImages(this.currentFileUpload, 'uploads');

    return urls[0] 
  }

  triggerModal(){
    this.displayStyle = 'block';
  }

  triggerModal2(){
    this.displayStyle2 = 'block';
  }

  backPage() {
    this.displayStyle = 'none';
    this.router.navigate(['houses-list-all']);
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  closePopup2() {
    this.displayStyle2 = 'none';
  }

  onSubmit(formData: any){


    console.log(formData)
    formData.date = new Date(formData.date);

    this.upload().then((a) => {

      formData['filename'] = a

      this.data.addHouseLogs(formData)
      window.location.reload();
    })
  }

}