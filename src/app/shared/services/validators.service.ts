import { Injectable, signal } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public emailPatter = signal<string>("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  public firstNameAndLastNamePattern = signal<string>('([a-zA-Z]+) ([a-zA-Z]+)');

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null
  }

  // public isValidField(form: FormGroup, field: string) {
  //   return form.controls[field].errors && form.controls[field].touched;
  // }

  public isValidField(control: FormControl) {
    return control.errors && control.touched;
  }
}
