import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  id: number = 0;

  id$ = this.router.paramMap.pipe(
    map(params => params.get('roomid'))
  )

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['roomid']; 

    // this.router.params.subscribe((params) => {
    //   this.id = params['roomid']
    //   console.log(params);
    // })

    // this.router.paramMap.subscribe((params) => {params.get('roomid')})

    // this.router.queryParams.subscribe((params) => console.log(params))

  }

}
