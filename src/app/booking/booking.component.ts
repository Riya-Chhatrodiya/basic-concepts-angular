import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor(private configService:ConfigService, private fb:FormBuilder ) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      roomId: new FormControl({value:'2', disabled:true},{ validators: [Validators.required]}),
      guestEmail: ['', [Validators.required, Validators.email]],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
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
    })
  }

  addBooking() {
    console.log(this.bookingForm.getRawValue());
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
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
