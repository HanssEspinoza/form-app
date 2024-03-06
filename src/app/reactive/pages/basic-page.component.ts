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
              @if (myForm().controls['product'].getError('required') &&
              myForm().controls['product'].touched) {
              <span class="form-text text-danger">Este campo es requerido</span>
              } @if (myForm().controls['product'].getError('minlength') &&
              myForm().controls['product'].touched) {
              <span class="form-text text-danger"
                >Este campo requiere mínimo 3 letras</span
              >
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
              <span class="form-text text-danger"
                >El precio debe ser 0 o mayor</span
              >
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
              <span class="form-text text-danger"
                >Las existencias deben ser 0 o mayor</span
              >
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
