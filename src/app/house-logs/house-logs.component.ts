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
  y = new Date().getFullYear();
  currentMonthYear = this.m + '-' + this.y;
  selectedFiles: FileList | undefined;
  currentFileUpload: FileUpload | undefined;
  percentage: number | undefined;
  filename: String | undefined;
  monthList =   [1,2,3,4,5,6,7,8,9,10,11,12]
  monthList2 = [
    { 'month':'january', 'number': 1 },
    { 'month':'february', 'number': 2 },
    { 'month':'march', 'number': 3 },
    { 'month':'april', 'number': 4 },
    { 'month':'may', 'number': 5 },
    { 'month':'june', 'number': 6 },
    { 'month':'july', 'number': 7 },
    { 'month':'august', 'number': 8 },
    { 'month':'september', 'number': 9 },
    { 'month':'october', 'number': 10 },
    { 'month':'november', 'number': 11 },
    { 'month':'december', 'number': 12 }
  ]
  yearList = [2022, 2023]
  totalAmountForSelectedMonth = 0;

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

    this.queryData();

  }

  queryData(){
    this.dataSource = []
    this.array = []
    this.totalAmountForSelectedMonth = 0
    console.log(this.m)
    console.log(this.y)
    this.data.listHouseLogs(this.houseId, this.m, this.y).subscribe((res) => {
      
      res.map((e) => {
        this.array.push(e.payload.doc.data({ serverTimestamps: 'estimate' }));
        this.dataSource = this.array
      });
      
      for (var i = 0; i < this.dataSource.length; i++){
        this.dataSource[i]['date'] = this.dataSource[i]['date'].toDate().toDateString()
        this.totalAmountForSelectedMonth = this.totalAmountForSelectedMonth + Number(this.dataSource[i]['total'])
      }
    });
  }

   getMonthName(monthNumber: any) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    // Using the browser's default locale.
    return date.toLocaleString([], { month: 'long' });
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
    formData.date = new Date(formData.date);

    this.upload().then((a) => {

      formData['filename'] = a

      this.data.addHouseLogs(formData)
      // window.location.reload();
    })
  }

}