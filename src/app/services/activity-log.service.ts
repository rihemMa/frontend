import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Api } from '../api';
@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  api = new Api();
  myToken = localStorage.getItem('token')
   header = {headers: new HttpHeaders().append('Authorization','Bearer '+this.myToken )}
    constructor(private http:HttpClient) { }




    getAllactivities()
    {
      return this.http.get<any>(this.api.api+'/getAllactivities' , this.header)
    }


    getUserActivities(user_id)
    {
      return this.http.get<any>(this.api.api+'/getUserActivities/'+user_id, this.header)
    }

}
