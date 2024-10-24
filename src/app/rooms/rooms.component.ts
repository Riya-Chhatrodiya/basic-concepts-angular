import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { CommonModule } from '@angular/common';
import { RoomsListComponent } from "./rooms-list/rooms-list.component";
import { HeaderComponent } from "../header/header.component";
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})

export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  
  name = 'Example 1';

  numberOfRooms = 10;

  hideRooms = true;

  selectedRoom! : RoomList;

  rooms : Room = {
    totalRooms:20,
    availableRooms:10,
    bookedRooms:5
  } 

  title = 'Room List 12'

  roomList : RoomList[] = [];

  stream = new Observable<string >(observer => {
    observer.next('User1');
    observer.next('User2');
    observer.next('User3');
    observer.complete();
    // observer.error('Error');
  })

  @ViewChild(HeaderComponent) headerComponent! : HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent! : QueryList<HeaderComponent>;

  // roomService = new RoomsService();   //When not using Dependency Injection(DI)

  totalBytes = 0;

  subscription! : Subscription;

  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
    console.log(err)
    this.error$.next(err.message);
    return of([]);
   })
  );;

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms :RoomList[]) => rooms.length)
  )
  
  constructor( @SkipSelf() private roomsService:RoomsService) {  }


  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch(event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!')
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes+= event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body)
        }
      }
    })

    this.stream.subscribe({
      next : (value) => console.log(value),
      complete : () => console.log('complete'),
      error : (err) => console.log(err)
    })
    this.stream.subscribe((data) => console.log(data,"@@DATA"));
    // console.log(this.headerComponent)
    // this.subscription = this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomList = rooms;
    // })
  }

  ngDoCheck(): void {
    // console.log("on do check is called")
  }

  ngAfterViewInit(): void {
    // console.log(this.headerComponent)
    this.headerComponent.title = "Rooms View";

    this.headerChildrenComponent.last.title = "Last Title";
    // this.headerChildrenComponent.get(0)?.title = "First title"
  }

  ngAfterViewChecked(): void {
    
  }

  toggle(){
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List"
  }

  selectRoom(room:RoomList){
    this.selectedRoom = room;
    // console.log(room);
  }

  addRoom() {
    const room: RoomList = {
      // roomNumber:"4",
      roomType:'Delux Room',
      amenities: 'AC, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 2500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('13-Nov-2021'),
      rating:4.5,
    }

    // this.roomList.push(room)
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })

  }

  editRoom() {
    const room: RoomList = {
      roomNumber:"3",
      roomType:'Delux Room',
      amenities: 'AC, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 17500,
      photos: '',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('13-Nov-2021'),
      rating:4.5,
    }

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    })
  }

  // ngOnDestroy() {
  //   if(this.subscription){
  //     this.subscription.unsubscribe();
  //   }
  // }

}
