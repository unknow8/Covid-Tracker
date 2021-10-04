import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  p:string[];

  constructor(service: DataService) { 
    this.p = service.people;
  }

  ngOnInit(): void {
  }

  add(newReport){
    
  }

}
