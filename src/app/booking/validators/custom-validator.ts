import { AbstractControl, FormGroup } from "@angular/forms";

export class CustomValidator {

    static ValidateName(control: AbstractControl) {
        const value = control.value as string ;
        if(value.includes('test')){
            return{
                invalidName: true
            }
        }
        return null;
    }

    static ValidateSpecialChar(char: string){
        return (control: AbstractControl) => {
            const value = control.value as string ;
            if(value.includes(char)){
                return{
                    invalidSpecialChar: true
                }
            }
            return null;
        }
    }

    static ValidateDate(control: FormGroup) {
        const checkinDate = control.get('checkinDate')?.value; 
        const checkoutDate = control.get('checkoutDate')?.value; 
        if(checkinDate > checkoutDate) {
            return {
                invalidDate: true
            }
        }
        return null;
    }
}
