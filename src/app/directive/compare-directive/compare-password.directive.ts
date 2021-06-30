import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[appComparePassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ComparePasswordDirective,
      multi: true,
    },
  ],
})
export class ComparePasswordDirective implements Validator {
  @Input() appComparePassword: string;
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent?.get(this.appComparePassword);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return { notEqual: true };
    }
    return null;
  }
}
