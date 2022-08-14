
import { Validator, AbstractControl, NG_VALIDATORS, } from '@angular/forms';
import { Directive, Input ,NgModule } from '@angular/core';

@Directive({
    selector: '[appSelectValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: SelectRequiredValidatorDirective,
            multi: true
        }]
})
export class SelectRequiredValidatorDirective implements Validator {
    @Input() appSelectValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        return control.value === this.appSelectValidator ? { 'defaultSelected': true } : null;
    }
}

/* @NgModule({
    declarations: [ SelectRequiredValidatorDirective ],
    exports: [ SelectRequiredValidatorDirective ]
  })
  
  export class SelectRequiredValidatorDirectiveModule {} */