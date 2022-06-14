import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class MyService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http<any[]>("my/api/url");
  }
}
