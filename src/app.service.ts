import { Get, Controller, HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AppService {
  baseUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private readonly http: HttpService){
  }

  getHello(): string {
    return '<h1>Hello World NestJs!</h1>';
  }

  getPost(): Observable<AxiosResponse<any[]>> {
    return  this.http.get(this.baseUrl).pipe(map(resp => resp.data));
  }

  findPost(id): Observable<AxiosResponse<any[]>> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(map(resp => resp.data));
  }
}
