import { FormControl, ValidationErrors } from "@angular/forms";

export const emailPatter: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
export const firstNameAndLastNamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

export const cantBeStrider = (control: FormControl): ValidationErrors | null => {
  const value: string = control.value.trim().toLowerCase();

  if (value === 'strider') {
    return {
      noStrider: true,
    }
  }

  return null
}
