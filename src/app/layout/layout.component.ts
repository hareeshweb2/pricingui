import { Component, OnInit } from '@angular/core';
import { Spinkit } from "ng-http-loader/spinkits";
@Component({
    selector: "app-layout",
    templateUrl: "./layout.component.html",
    styleUrls: ["./layout.component.scss"]
})
export class LayoutComponent implements OnInit {
    public spinkit = Spinkit;
    constructor() {}

    ngOnInit() {}
}
