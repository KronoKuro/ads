import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityModel } from "../../../models/city.model";
import { CitiesStore } from "../state/city.store";
import { tap } from 'rxjs/operators';

@Injectable()
export class CityService {
  private _url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private cityStore: CitiesStore) {
    this._url = `${baseUrl}api/city`;
  }

  getCity() {
    return this.http.get<CityModel[]>(`${this._url}`).pipe(
      tap(entities => {
        this.cityStore.set(entities);
      }));
  }

  addCity(city: CityModel) {
    return this.http.post(`${this._url}`, city);
  }

  deleteCity(id: string) {
    return this.http.delete(`${this._url}` + '/' + id);
  }

  // update(user: IUserModel): Observable<any> {
  //   return this.http.put(this.apiUrl, user);
  // }

  // create(user: IUserModel): Observable<any> {
  //   return this.http.post(this.apiUrl, user);
  // }

  // delete(id: number): Observable<any> {
  //   return this.http.delete(this.apiUrl + '/' + id);
  // }

}


