import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Country, Region, SmallCountry } from '@country/interfaces';
import { of, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  #http = inject(HttpClient);

  private _regions = signal<Region[]>([
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania,
  ]);

  get regions(): Region[] {
    return [...this._regions()];
  }

  public getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    const url: string = `${environment.baseUrl}/region/${region}?fields=cca3,name,borders`;

    return this.#http
      .get<SmallCountry[]>(url)
      .pipe(tap((resp) => console.log(resp)));
  }
}
