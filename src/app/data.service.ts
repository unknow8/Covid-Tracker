import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  people;

  constructor(private http: HttpClient) { 

  }

  ngOnInit(){
    this.http.get<Object>('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents').subscribe((data)=>{
      this.people = data;
      // console.log(data);
    })
    // console.log(this.people);
  }

  get(){
    return this.people;
  }

  add(report){

  }

  delete(){

  }
}

