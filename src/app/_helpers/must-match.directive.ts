import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, FormControl } from "@angular/forms";

@Directive({
  selector: '[appCheckPassword]',
  providers: [{ 
    provide: NG_VALIDATORS, 
    useExisting: CheckPasswordDirective, 
    multi: true 
  }]
})

export class CheckPasswordDirective implements Validator {
  
  @Input() appCheckPassword: string;

  validate(c: AbstractControl): { [key: string]: any } {
    return this.appCheckPassword == c.value ? null : {
      "noMatch": true
    }
  }
    
  
 
 
  // @Input() appCheckPassword: string;
  
  // validate(c: AbstractControl): { [key: string]: any; } {
    
  //   const controlToCompare = c.parent.get(this.appCheckPassword)
  //   if (controlToCompare && controlToCompare.value == c.value) return {
  //     "equal": true };
  //   return { "notEqual": true }
  //   }

}

// export const passwordCheck = (control: AbstractControl): {[key: string]: boolean} => {
//   const pword = control.get('password');
//   const confirm = control.get('confirmPassword');
//   if (!pword || !confirm) {
//     return null;
//   }
//   return pword.value === confirm.value ? null : { nomatch: true };
// };