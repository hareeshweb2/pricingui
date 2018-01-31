import { element } from "protractor";
import { Component, OnInit } from "@angular/core";
import { routerTransition } from "../../router.animations";
import {
    FormGroup,
    FormBuilder,
    Validators,
    ValidatorFn
} from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "app-lever-selection",
    templateUrl: "./lever-selection.component.html",
    styleUrls: ["./lever-selection.component.scss"],
    animations: [routerTransition()]
})
export class LeverSelectionComponent implements OnInit {
    showrates: boolean = false;
    rates: any;
    leversDataAfterAllLeversSelected: any;
    leversDataAfterPlanSelection: any;
    leversAfterPlan: any;
    leversAfterAllLeversSelected: any;
    alerts: any;
    plans: string[];
    leversResponse: any;
    updatedFormatOfLevers: any = [];
    updatedFormatOfLeversAfterAllLeversSelected: any = [];
    leverForm: FormGroup;
    isSubmitted: boolean = false;
    selectedPlan;
    leversReqWithAllSelectedLevers: any;
    networdIds: any = [];
    planTypes = [
        { id: "exchange Certified", value: "exchange certified" },
        { id: "KAIG Partnership", value: "KAIG Partnership" },
        { id: "traditional", value: "traditional" },
        {
            id: "traditional offered with Optima Health Plans",
            value: "traditional offered with Optima Health Plans"
        }
    ];
    naics = [
        { id: "4444110", value: "4444110" },
        { id: "4444130", value: "4444130" },
        { id: "1111110", value: "1111110" },
        { id: "3333110", value: "3333110" },
        { id: "4441", value: "4441" },
        { id: "4413", value: "4413" },
        { id: "0110", value: "0110" },
        { id: "1330", value: "1330" }
    ];
    networksList = ["Premier", "PPO", "OON"];

    constructor(private fb: FormBuilder, private http: HttpClient) {}

    ngOnInit() {
        this.leverForm = this.fb.group({
            dateEffective: ["", [Validators.required]],
            typeOfPlan: ["", [Validators.required]],
            nics: ["", [Validators.required]],
            zipCode: ["", [Validators.required]],
            noOfEmps: ["", [Validators.required]]
            //,
            // noOfEmps2: ['', [Validators.required]]
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    submit() {
        this.selectedPlan = "";
        this.isSubmitted = true;
        this.rates = [];
        let leversReq = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            zipCode: this.leverForm.value.zipCode,
            numberOfEmployees: this.leverForm.value.noOfEmps,
            typeOfPlan: this.leverForm.value.typeOfPlan,
            selectedLevers: {
                naics: {
                    id: "naics",
                    name: "naics",
                    selectedElement: {
                        id: this.leverForm.value.nics,
                        leverId: "naics"
                    },
                    isTerminal: false
                }
            }
        };

        //server
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/levers",
                leversReq
            )
            .subscribe(
                data => {
                    this.leversResponse = data;
                    if (this.leversResponse.message) {
                        alert("No Plans Found for this selection");
                        this.plans = [];
                        return;
                    } else
                        this.plans = Object.keys(
                            this.leversResponse.levers.plan.elements
                        );
                },
                error => {
                    this.plans = [];
                    console.log("Response ERROR: " + JSON.stringify(error));
                    if (error.message == "Resource not found")
                        alert("Data not found for this search");
                    else
                        alert(
                            "Data not found for this search, Might be bad request"
                        );
                    console.error("Error submitting post request!");
                    return Observable.throw(error);
                }
            );
        //server end
    }

    //after plan selection

    getResponseForPlan() {
        this.rates = [];
        this.updatedFormatOfLevers = [];
        this.isSubmitted = true;

        let leversReqWithPlan = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            zipCode: this.leverForm.value.zipCode,
            numberOfEmployees: this.leverForm.value.noOfEmps,
            typeOfPlan: this.leverForm.value.typeOfPlan,
            selectedLevers: {
                naics: {
                    id: "naics",
                    name: "naics",
                    selectedElement: {
                        id: this.leverForm.value.nics,
                        leverId: "naics"
                    },
                    isTerminal: false
                },
                plan: {
                    id: "plan",
                    name: "plan",
                    selectedElement: { id: this.selectedPlan, leverId: "plan" },
                    isTerminal: false
                }
            }
        };

        //server start
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/levers",
                leversReqWithPlan
            )
            .subscribe(
                data => {
                    this.leversDataAfterPlanSelection = data;
                    if (this.leversDataAfterPlanSelection.message) {
                        alert("No Data Found for this selection");
                        return;
                    } else {
                        this.leversAfterPlan = Object.keys(
                            this.leversDataAfterPlanSelection.levers
                        );

                        this.leversAfterPlan.forEach(element => {
                            let lever: any = {};
                            lever.id = this.leversDataAfterPlanSelection.levers[
                                element
                            ].id;
                            lever.name = this.leversDataAfterPlanSelection.levers[
                                element
                            ].name;
                            lever.isTerminal = this.leversDataAfterPlanSelection.levers[
                                element
                            ].isTerminal;
                            lever.level = this.leversDataAfterPlanSelection.levers[
                                element
                            ].level;
                            lever.elements = [];

                            let keysElements = Object.keys(
                                this.leversDataAfterPlanSelection.levers[
                                    element
                                ].elements
                            );
                            keysElements.forEach(elm => {
                                let drpdwn: any = {};
                                drpdwn.factor = this.leversDataAfterPlanSelection.levers[
                                    element
                                ].elements[elm].factor;
                                drpdwn.leverId = this.leversDataAfterPlanSelection.levers[
                                    element
                                ].elements[elm].leverId;
                                drpdwn.id = this.leversDataAfterPlanSelection.levers[
                                    element
                                ].elements[elm].id;
                                drpdwn.value = this.leversDataAfterPlanSelection.levers[
                                    element
                                ].elements[elm].value;
                                lever.elements.push(drpdwn);
                            });
                            this.updatedFormatOfLevers.push(lever);
                        });
                    }
                },
                error => {
                    this.plans = [];
                    console.log("Response ERROR: " + JSON.stringify(error));
                    if (error.message == "Resource not found")
                        alert("Data not found for this search");
                    else
                        alert(
                            "Data not found for this search, Might be bad request"
                        );
                    console.error("Error submitting post request!");
                    return Observable.throw(error);
                }
            );
        //server end
    }

    //end after plan selection

    //call after all levers selected start
    getResponseAfterAllLeversSelected() {
        this.rates = [];
        this.updatedFormatOfLeversAfterAllLeversSelected = [];
        this.networdIds = [];
        let leversReqWithAllSelectedLevers = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            zipCode: this.leverForm.value.zipCode,
            numberOfEmployees: this.leverForm.value.noOfEmps,
            typeOfPlan: this.leverForm.value.typeOfPlan,
            selectedLevers: {
                naics: {
                    id: "naics",
                    name: "naics",
                    selectedElement: {
                        id: this.leverForm.value.nics,
                        leverId: "naics"
                    },
                    isTerminal: false
                },
                plan: {
                    id: "plan",
                    name: "plan",
                    selectedElement: {
                        id: this.selectedPlan,
                        leverId: "plan"
                    },
                    isTerminal: false
                }
            }
        };

        this.updatedFormatOfLevers.forEach(element => {
            if (element.selectedValue) {
                leversReqWithAllSelectedLevers.selectedLevers[element.id] = {
                    id: element.id,
                    name: element.name,
                    selectedElement: {
                        id: element.selectedValue,
                        leverId: element.id
                    },
                    isTerminal: element.isTerminal,
                    level: element.level
                };
            }
        });

        console.log(leversReqWithAllSelectedLevers);
        console.log(JSON.stringify(leversReqWithAllSelectedLevers));

        //server start
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/levers",
                leversReqWithAllSelectedLevers
            )
            .subscribe(
                data => {
                    this.showrates = true;
                    this.leversDataAfterAllLeversSelected = data;
                    this.rates = this.leversDataAfterAllLeversSelected.rates;
                    console.log(this.leversDataAfterAllLeversSelected);
                    console.log(
                        JSON.stringify(this.leversDataAfterAllLeversSelected)
                    );
                    if (this.leversDataAfterAllLeversSelected.message) {
                        alert("No Data Found for this selection");
                        return;
                    } else {
                        this.leversAfterAllLeversSelected = Object.keys(
                            this.leversDataAfterAllLeversSelected.levers
                        );

                        this.leversAfterAllLeversSelected.forEach(element => {
                            let lever: any = {};
                            lever.id = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].id;
                            lever.name = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].name;
                            lever.networkId = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].networkId;
                            if (!this.networdIds.includes(lever.networkId))
                                this.networdIds.push(lever.networkId);
                            lever.level = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].level;
                            lever.selectedElement = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].selectedElement;
                            lever.isTerminal = this.leversDataAfterAllLeversSelected.levers[
                                element
                            ].isTerminal;
                            lever.elements = [];

                            let keysElements = Object.keys(
                                this.leversDataAfterAllLeversSelected.levers[
                                    element
                                ].elements
                            );
                            keysElements.forEach(elm => {
                                let drpdwn: any = {};
                                drpdwn.factor = this.leversDataAfterAllLeversSelected.levers[
                                    element
                                ].elements[elm].factor;
                                drpdwn.leverId = this.leversDataAfterAllLeversSelected.levers[
                                    element
                                ].elements[elm].leverId;
                                drpdwn.id = this.leversDataAfterAllLeversSelected.levers[
                                    element
                                ].elements[elm].id;
                                drpdwn.value = this.leversDataAfterAllLeversSelected.levers[
                                    element
                                ].elements[elm].value;
                                lever.elements.push(drpdwn);
                            });
                            this.updatedFormatOfLeversAfterAllLeversSelected.push(
                                lever
                            );
                        });
                    }
                },
                error => {
                    console.log("Response ERROR: " + JSON.stringify(error));
                    if (error.message == "Resource not found")
                        alert("Data not found for this search");
                    else
                        alert(
                            "Data not found for this search, Might be bad request"
                        );
                    console.error("Error submitting post request!");
                    return Observable.throw(error);
                }
            );

        //server end
    }

    //end call after all levers selected
}
