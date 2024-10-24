import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  roomList: RoomList[] = [];

  // headers = new HttpHeaders({ token: '123abc'})
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(
    shareReplay(1)
  )

  constructor(@Inject(APP_SERVICE_CONFIG) private config: AppConfig, private http: HttpClient) { 
    console.log('Rooms Service Initialized..');
  }

  getRooms() { 
    return this.http.get<RoomList[]>('/api/rooms');
  }  
  
  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room); // Changed to RoomList
  }
  
  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room); // Changed to RoomList
  }
  
  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`); // Changed to RoomList
  }
  
  getPhotos() {
    const request = new HttpRequest('GET', 'https://jsonplaceholder.typicode.com/photos', {
      reportProgress: true,
    });
    return this.http.request(request);
  }
}


