import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  config:any
  constructor(private http: HttpClient ) {   }

  init() {
    return this.http
      .get('/assets/config.json')
      .pipe(
        tap((config) => {
          this.config = config;
          console.log("Config loaded", this.config); 
        }),
        catchError((error) => {
          console.error("Error loading config:", error);
          return of(null); 
        })
      ).toPromise()
  }
}
