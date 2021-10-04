import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MapComponent} from './map/map.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  @ViewChild(MapComponent) map: MapComponent;
  title = 'Covid-Tracker';
  list;

  constructor(private http: HttpClient){

  }
  
  ngOnInit(){
    document.getElementById("detailTable").style.display = "none";
    

    document.getElementById("HideButton")!.addEventListener("click", function(){
      var table = document.getElementById("detailTable")!;
      if(table.style.display != "none"){
          table.style.display = "none";
      }else{
          table.style.display = "block";
      }
    })

    this.getData(this.list);
  }

  getData(evt){
    
    this.http.get<Object>('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents').subscribe((data)=>{
    this.list = data;


    var table = document.getElementById("dataTable") as HTMLTableElement;
    
    var rowNumber: number = table.rows.length;
    if(rowNumber > 1){
        for(let i:number = rowNumber-1; i > 0; i--){
            table.deleteRow(i);
        }
    }
    
    this.map.deleteMarkers();

    var i = 1;
    for (let obj of this.list){
      var count = 0;
      for(let x of this.list){
        if(obj.data.location == x.data.location){
          count++;
        }
      }
      this.map.placeMarker(obj.data.lat,obj.data.long,String(count), obj.data.location);

      var row = table.insertRow(i);
      i++;

      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);

      var detailButton = document.createElement("button") as HTMLButtonElement;
      detailButton.innerHTML = "More Info";
      detailButton.onclick = ()=>{
          this.detail(obj);
      }

      var deleteButton = document.createElement("button") as HTMLButtonElement;
      deleteButton.innerHTML = "Delete";
      deleteButton.onclick = ()=>{
          this.delete(obj);
      }

      cell1.innerHTML = obj.data.location;
      cell2.innerHTML = obj.data.name;
      cell3.innerHTML = obj.data.date + " (" + obj.data.time + ")";
      cell4.appendChild(deleteButton);
      cell5.appendChild(detailButton);

      }
    })
  }
  
  delete(obj){
    if(window.confirm("Are you sure you want to delete "+obj.data.name+"?")){
      this.http.delete("https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents/"+obj.data.date+obj.data.name.replace(/\s/g, "")+obj.data.location.replace(/\s/g, "")).subscribe((data)=>{
        console.log(data);
      })

      setTimeout(() => {  this.ngOnInit(); }, 500);
    }
    
  }

  detail(obj){
    var tableDiv = document.getElementById("detailTable")!;
    tableDiv.style.display = "block";

    document.getElementById("detailLocation")!.innerText = obj.data.location;
    document.getElementById("detailLat")!.innerText = obj.data.lat;
    document.getElementById("detailLong")!.innerText = obj.data.long;
    document.getElementById("detailPerson")!.innerText = obj.data.name;
    document.getElementById("detailDate")!.innerText = obj.data.date;
    document.getElementById("detailTime")!.innerText = obj.data.time;
    document.getElementById("detailPhone")!.innerText = obj.data.phone;
    document.getElementById("detailNote")!.innerText = obj.data.note;
  }
}
