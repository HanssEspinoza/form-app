import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
    <h2>Reactivos: Básicos</h2>
    <hr />

    <div class="row">
      <div class="col">
        <form [formGroup]="myForm()" (ngSubmit)="onSave()" autocomplete="off">
          <!-- Campo de producto  -->
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Producto</label>
            <div class="col-sm-9">
              <input
                type="text"
                formControlName="product"
                class="form-control"
                placeholder="Nombre del producto"
              />
              @if (isValidField('product')) {
              <span class="form-text text-danger">{{
                getFieldError('product')
              }}</span>
              }
            </div>
          </div>
          <!-- Campo de producto  -->
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Precio</label>
            <div class="col-sm-9">
              <input
                type="number"
                class="form-control"
                formControlName="price"
                placeholder="Precio del producto"
              />
              @if (isValidField('price')) {
              <span class="form-text text-danger">{{
                getFieldError('price')
              }}</span>
              }
            </div>
          </div>
          <!-- Campo de Existencias  -->
          <div class="mb-3 row">
            <label class="col-sm-3 col-form-label">Existencias</label>
            <div class="col-sm-9">
              <input
                type="number"
                class="form-control"
                formControlName="inStorage"
                placeholder="Existencias del producto"
              />
              @if (isValidField('inStorage')) {
              <span class="form-text text-danger">{{
                getFieldError('inStorage')
              }}</span>
              }
            </div>
          </div>

          <div class="row">
            <div class="col">
              <button type="submit" class="btn btn-primary float-end">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <span>Valid</span>
        <pre>{{ myForm().valid | json }}</pre>
        <span>Pristine</span>
        <pre>{{ myForm().pristine | json }}</pre>
        <span>Touched</span>
        <pre>{{ myForm().touched | json }}</pre>
        <span>Value</span>
        <pre>{{ myForm().value | json }}</pre>
        <span>Precio</span>
        <pre>{{ myForm().controls['price'].value | json }}</pre>
        <span>Precio - Errors </span>
        <pre>{{ myForm().controls['price'].errors | json }}</pre>
        <span>Producto</span>
        <pre>{{ myForm().controls['product'].value | json }}</pre>
        <span>Producto - Errors </span>
        <pre>{{ myForm().controls['product'].errors | json }}</pre>
      </div>
    </div>
  `,
  styles: ``,
})
export class BasicPageComponent {
  // public myForm: FormGroup = new FormGroup({
  //   product: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  #fb = inject(FormBuilder);

  public myForm = signal<FormGroup>(
    this.#fb.group({
      product: ['', [Validators.required, Validators.minLength(3)]],
      price: [0, [Validators.required, Validators.min(0)]],
      inStorage: [0, [Validators.required, Validators.min(0)]],
    })
  );

  isValidField(field: string): boolean | null {
    return (
      this.myForm().controls[field].errors &&
      this.myForm().controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm().controls[field]) return null;

    const errors = this.myForm().controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'El campo es obligatorio';
        case 'minlength':
          return `El campo debe tener al menos ${errors[key].requiredLength} caracteres`;
        case 'min':
          return `El campo debe ser mayor o igual que ${errors[key].min}`;
      }
    }

    return null;
  }

  onSave(): void {
    if (this.myForm().invalid) {
      this.myForm().markAllAsTouched();
      return;
    }

    console.log(this.myForm().value);

    this.myForm().reset({
      price: 0,
      inStorage: 0,
    });
  }
}
