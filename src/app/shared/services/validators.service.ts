import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {
  public emailPatter = signal<string>(
    '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
  );
  public firstNameAndLastNamePattern = signal<string>(
    '([a-zA-Z]+) ([a-zA-Z]+)'
  );

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      };
    }

    return null;
  };

  // public isValidField(form: FormGroup, field: string) {
  //   return form.controls[field].errors && form.controls[field].touched;
  // }

  public isValidField(control: FormControl) {
    return control.errors && control.touched;
  }

  getControlError(control: FormControl): string | null {
    if (!control) return null;

    const errors = control.errors || {};

    console.log(errors);

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';
        case 'minlength':
          return `El campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mayor o igual que ${errors[key].min}`;
        case 'pattern':
          if (errors[key].requiredPattern === '^([a-zA-Z]+) ([a-zA-Z]+)$')
            return 'Este campo necesita nombre y apellido';
          if (
            errors[key].requiredPattern ===
            '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
          )
            return 'Este campo debe ser un email valido';
          return 'Error';
        case 'noStrider':
          return 'El campo no puede ser Strider';

        case 'notEqual':
          return 'Los campos no coinciden';
      }
    }

    return null;
  }
}
