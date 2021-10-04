"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MapComponent = void 0;
/// <reference types="@types/googlemaps" />
var core_1 = require("@angular/core");
var MapComponent = /** @class */ (function () {
    function MapComponent() {
        this.title = 'gmapsDemo';
        this.markers = [];
    }
    MapComponent.prototype.ngAfterViewInit = function () {
        var mapProp = {
            center: new google.maps.LatLng(49.2, -123),
            zoom: 10
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    };
    MapComponent.prototype.placeMarker = function (lat, long, display, location_name) {
        var marker = new google.maps.Marker({
            position: { lat: lat, lng: long },
            map: this.map,
            title: location_name + ": " + display + " case reported"
        });
        this.markers.push(marker);
        marker.setMap(this.map);
    };
    MapComponent.prototype.deleteMarkers = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
        }
    };
    __decorate([
        core_1.ViewChild('gmap')
    ], MapComponent.prototype, "gmapElement");
    MapComponent = __decorate([
        core_1.Component({
            selector: 'app-map',
            templateUrl: './map.component.html',
            styleUrls: ['./map.component.css']
        })
    ], MapComponent);
    return MapComponent;
}());
exports.MapComponent = MapComponent;
