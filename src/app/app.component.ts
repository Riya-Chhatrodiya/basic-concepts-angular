import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from "./rooms/rooms.component";
import { HeaderComponent } from "./header/header.component";
import { ContainerComponent } from './container/container.component';
import { EmployeeComponent } from "./employee/employee.component";
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './AppConfig/appconfig.service';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements  OnInit, AfterViewInit {
  title = 'basic-angular-app';
  role = 'Admin';

  @ViewChild('name', {static: true}) name!: ElementRef;

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config,"@@CONFIG INIT")
  }

  ngOnInit(): void {
    // this.router.events.subscribe( (event) => {
    //   console.log(event)
    // })
    this.router.events.pipe(filter((event)  => event instanceof NavigationStart)).subscribe((event) => {
      console.log('Navigation Started')
    })

    this.router.events.pipe(filter((event)  => event instanceof NavigationEnd)).subscribe((event) => {
      console.log('Navigation Completed')
    })

    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = "Angular App";
    this.localStorage.setItem('name', 'Angular Appppp');
  }



  // @ViewChild('user', {read:ViewContainerRef}) vcr! : ViewContainerRef

  ngAfterViewInit() {
    // const componentRef = this.vcr.createComponent(RoomsComponent);
    // componentRef.instance.numberOfRooms = 50;
  }

}