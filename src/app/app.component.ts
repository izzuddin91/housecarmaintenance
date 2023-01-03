import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/shared/data.service';
import { GeneralService } from './general.service';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'housecarmaintenance';
  is_logged_in: boolean = false;
  constructor(
    private generalService: GeneralService,
    private readonly fbService: FirebaseService,
    private readonly router: Router
  ) {
    this.is_logged_in = localStorage.getItem('user') != null;
  }

  ngOnInit() {
    this.generalService.transferUserSessionDetails.subscribe(
      (data: boolean) => {
        console.log(data);
        this.is_logged_in = data;
      }
    );
  }

  logout() {
    console.log('log out');
    this.fbService.logout();
    this.generalService.transferUserSessionDetails.next(false); // pass data to top bar
    this.router.navigate(['']);
  }
}
