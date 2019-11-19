import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  salvaDati(value: any, value2: any, value3: any ) {
    console.log(value);
    console.log(value2);
    console.log(value3);
    const unioneForm: any = { ...value, ...value2, ...value3};
    console.log(unioneForm);
    localStorage.setItem('form', JSON.stringify(unioneForm));


    const url = 'http://localhost:3000/form';
    const body = unioneForm;
    this.http.post(url, body).subscribe(
      result => {
        console.log(result);
      }
    );
  }

}
