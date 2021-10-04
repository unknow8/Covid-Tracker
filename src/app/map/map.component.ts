/// <reference types="@types/googlemaps" />
import { Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {

  title = 'gmapsDemo';

  @ViewChild('gmap') gmapElement;
  map: google.maps.Map;
  markers : google.maps.Marker[] = [];

  ngAfterViewInit() {
    var mapProp = {
      center: new google.maps.LatLng(49.2, -123),
      zoom: 10,
      
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  placeMarker(lat, long, display, location_name){
    
    const marker = new google.maps.Marker({ 
      position: { lat: lat, lng: long },
      map: this.map,
      title: location_name + ": "+display + " case reported"
    });
    this.markers.push(marker);
    marker.setMap(this.map);
  }

  deleteMarkers() {
    for(let i = 0; i < this.markers.length; i++){
      this.markers[i].setMap(null);
    }
  }
}
    
