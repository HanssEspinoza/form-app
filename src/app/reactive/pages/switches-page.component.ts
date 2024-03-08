import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-switches-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Reactivos: Switches</h2>
    <hr />

    <form [formGroup]="myForm()" (submit)="onSubmit()" autocomplete="off">
      <!-- Radio -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Género</label>
        <div class="col-sm-9">
          <div class="form-check">
            <input
              class="form-check-input"
              value="M"
              formControlName="gender"
              id="radioMasculino"
              type="radio"
            />
            <label class="form-check-label" for="radioMasculino"
              >Masculino</label
            >
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              value="F"
              formControlName="gender"
              id="radioFemenino"
              type="radio"
            />
            <label class="form-check-label" for="radioFemenino">Femenino</label>
          </div>
        </div>
      </div>
      <!-- Checkbox -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label">Notificaciones</label>
        <div class="col-sm-9">
          <div class="form-check form-switch mt-2">
            <input
              class="form-check-input"
              formControlName="wantNotifications"
              id="flexSwitchCheckChecked"
              type="checkbox"
            />
            <label class="form-check-label" for="flexSwitchCheckChecked"
              >Quiero recibir notificaciones</label
            >
          </div>
        </div>
      </div>
      <!-- Checkbox -->
      <div class="row mb-3">
        <label class="col-sm-3 col-form-label"></label>
        <div class="col-sm-9">
          <div class="form-check">
            <input
              class="form-check-input"
              id="flexCheckDefault"
              formControlName="termsAndConditions"
              type="checkbox"
            />

            <label class="form-check-label" for="flexCheckDefault"
              >Términos y condiciones</label
            >
          </div>
          @if (isValidField('termsAndConditions')) {

          <span class="form-text text-danger">
            {{ getFieldError('termsAndConditions') }}
          </span>
          }
        </div>
      </div>

      <div class="row">
        <div class="col">
          <button class="btn btn-primary float-end">Guardar</button>
        </div>
      </div>
    </form>

    <h5>Valor del formulario</h5>
    <pre>{{ myForm().value | json }}</pre>

    <h5>Persona</h5>
    <pre>{{ person() | json }}</pre>

    <h5>Valid</h5>
    <pre>{{ myForm().valid | json }}</pre>
  `,
  styles: ``,
})
export class SwitchesPageComponent {
  #fb = inject(FormBuilder);

  public myForm = signal<FormGroup>(
    this.#fb.group({
      gender: ['M', [Validators.required]],
      wantNotifications: [true, [Validators.required]],
      termsAndConditions: [false, [Validators.requiredTrue]],
    })
  );

  public person = signal({
    gender: 'F',
    notifications: false,
  });

  ngOnInit(): void {
    this.myForm().reset(this.person());
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm().controls[field].errors &&
      this.myForm().controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm().controls[field]) return null;

    const errors = this.myForm().controls[field].errors || {};
    console.log(errors);
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Debe aceptar las condiciones de uso';
      }
    }

    return null;
  }

  onSubmit(): void {
    if (this.myForm().invalid) {
      this.myForm().markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm().value;
    this.person.set(newPerson);
  }
}
