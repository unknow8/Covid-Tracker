"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FormComponent = void 0;
/// <reference types="@types/googlemaps" />
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormComponent = /** @class */ (function () {
    function FormComponent(http) {
        this.http = http;
        this.myEvent = new core_1.EventEmitter();
        this.geocoder = new google.maps.Geocoder;
    }
    FormComponent.prototype.duplicate = function (name, arr) {
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var tmp = arr_1[_i];
            if (tmp == name) {
                return true;
            }
        }
        return false;
    };
    FormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents').subscribe(function (data) {
            _this.child_list = data;
            var dup = [];
            for (var _i = 0, _a = _this.child_list; _i < _a.length; _i++) {
                var x = _a[_i];
                if (!_this.duplicate(x.data.location, dup)) {
                    dup.push(x.data.location);
                }
            }
            console.log(dup);
            _this.dropdown = dup;
        });
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
        this.form = new forms_1.FormGroup({
            location: new forms_1.FormControl(''),
            long: new forms_1.FormControl(''),
            lat: new forms_1.FormControl(''),
            name: new forms_1.FormControl(''),
            date: new forms_1.FormControl(''),
            time: new forms_1.FormControl(''),
            note: new forms_1.FormControl(''),
            phone: new forms_1.FormControl('')
        });
    };
    FormComponent.prototype.onChange = function (evt) {
        if (document.getElementById("createNew").selected == true) {
            document.getElementById("newLocation").disabled = false;
        }
        else {
            document.getElementById("newLocation").disabled = true;
        }
    };
    FormComponent.prototype.onSubmit = function (newReport) {
        var _this = this;
        if (document.getElementById("createNew").selected == false) {
            newReport.location = document.getElementById("loc").value;
        }
        this.geocoder.geocode({ "address": newReport.location }, function (results, status) {
            // console.log(results[0].geometry.location.lat());
            // console.log(results[0].geometry.location.lng());
            if (status == 'OK') {
                newReport.long = results[0].geometry.location.lng();
                newReport.lat = results[0].geometry.location.lat();
                // console.log(newReport.name+newReport.date+newReport.time);
                var key = newReport.date + newReport.name.replace(/\s/g, "") + newReport.location.replace(/\s/g, "");
                _this.http.post('https://218.selfip.net/apps/FysGaTLpVg/collections/data1/documents/', {
                    "key": key,
                    "data": newReport
                }).subscribe(function (data) {
                    console.log(data);
                });
                _this.myEvent.emit();
                _this.myEvent.emit();
            }
            else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
        setTimeout(function () { _this.ngOnInit(); }, 500);
    };
    __decorate([
        core_1.Output()
    ], FormComponent.prototype, "myEvent");
    FormComponent = __decorate([
        core_1.Component({
            selector: 'app-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.css']
        })
    ], FormComponent);
    return FormComponent;
}());
exports.FormComponent = FormComponent;
