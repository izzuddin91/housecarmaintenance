import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  transferUserSessionDetails: Subject<any> = new Subject(); // from login to top bar
}
