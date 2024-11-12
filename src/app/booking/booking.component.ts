import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  get guests() {
    return this.bookingForm.get('guests') as FormArray
  } 

  constructor(private configService:ConfigService, private fb:FormBuilder, private bookingService: BookingService ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value:'2', disabled:true},{ validators: [Validators.required]}),
      guestEmail: ['', { updateOn:'blur' , validators:[Validators.required, Validators.email]}],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: ['', { updateOn:'blur'}],
      guestName: ['',[Validators.required, Validators.minLength(5)]],
      address: this.fb.group({
        addressLine1: ['',[Validators.required]],
        addressLine2: [''],
        city: ['',[Validators.required]],
        state: ['',[Validators.required]],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestControl()]),
      tnc: new FormControl(false, {validators: [Validators.requiredTrue]})
    }, )
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => this.bookingService.bookRoom(data).subscribe((data) => {}) )

    //--------------------------------------RXJS Map Operators --------------------------------------
    // this.bookingForm.valueChanges.pipe(
    //   mergeMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => {console.log(data)})

    // this.bookingForm.valueChanges.pipe(
    //   switchMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => {console.log(data)})

    // this.bookingForm.valueChanges.pipe(
    //   exhaustMap((data) => this.bookingService.bookRoom(data))
    // ).subscribe((data) => {console.log(data)})
    //-----------------------------------------------------------------------------------------------
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => console.log(data))
    // this.bookingForm.reset({
    //   roomId: '2',
    //   guestEmail: '',
    //   checkinDate: '',
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobileNumber: '',
    //   guestName: '',
    //   address:{
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guests : [],
    //   tnc: false
    // })
    this.getBookingData();
  }

  getBookingData() {
    this.bookingForm.patchValue({  //setValue --> you have to pass each and every value
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: new Date('10-Feb-2020'),
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      address:{
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
      },
      guests : [],
      tnc: false
    })
  }

  addGuest() {
    this.guests.push(
      this.addGuestControl()
    );
  }

  addGuestControl() {
    return this.fb.group({ guestName: ['',[Validators.required]], age: new FormControl(''), });
  }

  removeGuest(i:number) {
    this.guests.removeAt(i);;
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport')
    }
  }
}
