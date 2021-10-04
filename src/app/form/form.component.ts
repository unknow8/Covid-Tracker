/// <reference types="@types/googlemaps" />
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output() myEvent = new EventEmitter<string>();
  child_list;
  form;
  dropdown;

  geocoder = new google.maps.Geocoder;
  
  constructor(private http:HttpClient){

  }
  duplicate(name, arr){
    for(let tmp of arr){
      if(tmp == name){
        return true;
      }
    }
    return false;
  }
  ngOnInit(): void {
    this.http.get<Object>('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents').subscribe((data)=>{
      this.child_list = data;
      let dup:string[] = [];
      
      for(let x of this.child_list){
        if(!this.duplicate(x.data.location,dup)){
          dup.push(x.data.location);
        }
      }
      console.log(dup);
      this.dropdown = dup;
    })
    
    document.getElementById("addForm").style.display = "none";
    document.getElementById("newButton").addEventListener("click", function () {
      var form = document.getElementById("addForm");
      if (form.style.display != "none") {
          form.style.display = "none";
      }
      else {
          form.style.display = "block";
      }
    });

    this.form = new FormGroup({
      location: new FormControl(''),
      long: new FormControl(''),
      lat: new FormControl(''),
      name: new FormControl(''),
      date: new FormControl(''),
      time: new FormControl(''),
      note: new FormControl(''),
      phone: new FormControl(''),
    })
  }
 
  
  onChange(evt){
    if((document.getElementById("createNew")as HTMLOptionElement).selected == true){
      (document.getElementById("newLocation") as HTMLInputElement).disabled = false;
    }else{
      (document.getElementById("newLocation") as HTMLInputElement).disabled = true;
    }
  }

  onSubmit(newReport){
    if((document.getElementById("createNew")as HTMLOptionElement).selected == false){
      newReport.location = (document.getElementById("loc")as HTMLSelectElement).value;
    }
    this.geocoder.geocode({"address":newReport.location},(results, status)=>{
      // console.log(results[0].geometry.location.lat());
      // console.log(results[0].geometry.location.lng());
      
      if (status == 'OK') {
        newReport.long = results[0].geometry.location.lng();
        newReport.lat = results[0].geometry.location.lat();
        // console.log(newReport.name+newReport.date+newReport.time);
        var key = newReport.date+newReport.name.replace(/\s/g, "")+newReport.location.replace(/\s/g, "");
        this.http.post('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents/',{
          "key":key,
          "data":newReport
        }).subscribe((data)=>{
          console.log(data);
        })
        this.myEvent.emit();
        this.myEvent.emit();
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
      
    })


    setTimeout(() => {  this.ngOnInit(); }, 500);
  }
}
