"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var map_component_1 = require("./map/map.component");
var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = 'Covid-Tracker';
    }
    AppComponent.prototype.ngOnInit = function () {
        document.getElementById("detailTable").style.display = "none";
        document.getElementById("HideButton").addEventListener("click", function () {
            var table = document.getElementById("detailTable");
            if (table.style.display != "none") {
                table.style.display = "none";
            }
            else {
                table.style.display = "block";
            }
        });
        this.getData(this.list);
    };
    AppComponent.prototype.getData = function (evt) {
        var _this = this;
        this.http.get('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents').subscribe(function (data) {
            _this.list = data;
            var table = document.getElementById("dataTable");
            var rowNumber = table.rows.length;
            if (rowNumber > 1) {
                for (var i_1 = rowNumber - 1; i_1 > 0; i_1--) {
                    table.deleteRow(i_1);
                }
            }
            _this.map.deleteMarkers();
            var i = 1;
            var _loop_1 = function (obj) {
                count = 0;
                for (var _b = 0, _c = _this.list; _b < _c.length; _b++) {
                    var x = _c[_b];
                    if (obj.data.location == x.data.location) {
                        count++;
                    }
                }
                _this.map.placeMarker(obj.data.lat, obj.data.long, String(count), obj.data.location);
                row = table.insertRow(i);
                i++;
                cell1 = row.insertCell(0);
                cell2 = row.insertCell(1);
                cell3 = row.insertCell(2);
                cell4 = row.insertCell(3);
                cell5 = row.insertCell(4);
                detailButton = document.createElement("button");
                detailButton.innerHTML = "More Info";
                detailButton.onclick = function () {
                    _this.detail(obj);
                };
                deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    _this["delete"](obj);
                };
                cell1.innerHTML = obj.data.location;
                cell2.innerHTML = obj.data.name;
                cell3.innerHTML = obj.data.date + " (" + obj.data.time + ")";
                cell4.appendChild(deleteButton);
                cell5.appendChild(detailButton);
            };
            var count, row, cell1, cell2, cell3, cell4, cell5, detailButton, deleteButton;
            for (var _i = 0, _a = _this.list; _i < _a.length; _i++) {
                var obj = _a[_i];
                _loop_1(obj);
            }
        });
    };
    AppComponent.prototype["delete"] = function (obj) {
        var _this = this;
        if (window.confirm("Are you sure you want to delete " + obj.data.name + "?")) {
            this.http["delete"]("https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents/" + obj.data.date + obj.data.name.replace(/\s/g, "") + obj.data.location.replace(/\s/g, "")).subscribe(function (data) {
                console.log(data);
            });
            setTimeout(function () { _this.ngOnInit(); }, 500);
        }
    };
    AppComponent.prototype.detail = function (obj) {
        var tableDiv = document.getElementById("detailTable");
        tableDiv.style.display = "block";
        document.getElementById("detailLocation").innerText = obj.data.location;
        document.getElementById("detailLat").innerText = obj.data.lat;
        document.getElementById("detailLong").innerText = obj.data.long;
        document.getElementById("detailPerson").innerText = obj.data.name;
        document.getElementById("detailDate").innerText = obj.data.date;
        document.getElementById("detailTime").innerText = obj.data.time;
        document.getElementById("detailPhone").innerText = obj.data.phone;
        document.getElementById("detailNote").innerText = obj.data.note;
    };
    __decorate([
        core_1.ViewChild(map_component_1.MapComponent)
    ], AppComponent.prototype, "map");
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
