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
    showRates: boolean = false;
    rates: any;
    leversDataAfterAllLeversSelected: any;
    leversDataAfterPlanSelection: any;
    leversAfterPlan: any;
    leversAfterAllLeversSelected: any;
    alerts: any;
    plans: any;
    initialResponse: any;
    response2: any;
    response3: any;
    ratesRequest: any;
    updatedFormatOfLevers: any = [];
    updatedFormatOfLeversAfterAllLeversSelected: any = [];
    leverForm: FormGroup;
    showPlans: boolean = false;
    selectedPlan;
    leversReqWithAllSelectedLevers: any;
    networdIds: any = [];

    networksList = ["Premier", "PPO", "OON"];

    arrRegions: any;
    arrPlanTypes: any;
    arrNAICS: any;
    arrNoOfEmps: any;

    regionLeverId: any;
    planTypeLeverId: any;
    NAICSLeverId: any;
    noOfEmpsLeverId: any;
    planLeverId: any;

    constructor(private fb: FormBuilder, private http: HttpClient) {}
    
    ngOnInit() {
        this.leverForm = this.fb.group({
            dateEffective: ["", [Validators.required]],
            typeOfPlan: ["", [Validators.required]],
            nics: ["", [Validators.required]],
            zipCode: ["", [Validators.required]],
            noOfEmps: ["", [Validators.required]]
            //,
            //region: ["", [Validators.required]]
            //,
            // noOfEmps2: ['', [Validators.required]]
        });

        let initialRequest = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: null,
            selections: null
        };

        //client start
        // this.initialResponse = {
        //     levers: [
        //         {
        //             id: 1,
        //             name: "REGION",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 { id: 1, value: "SOUTHWEST" },
        //                 { id: 2, value: "NORTHERN" },
        //                 { id: 3, value: "TIDEWATER" },
        //                 { id: 4, value: "RICHMOND" },
        //                 { id: 5, value: "CENTRAL" },
        //                 { id: 6, value: "OUT OF STATE" }
        //             ]
        //         },
        //         {
        //             id: 2,
        //             name: "NUMBER OF EMPLOYEES",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 { id: 7, value: null },
        //                 { id: 8, value: null },
        //                 { id: 9, value: null }
        //             ]
        //         },
        //         {
        //             id: 3,
        //             name: "PLAN TYPE",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 { id: 10, value: "EXCHANGE CERTIFIED" },
        //                 { id: 11, value: "KAIG PARTNERSHIP" },
        //                 { id: 12, value: "TRADITIONAL" },
        //                 {
        //                     id: 13,
        //                     value:
        //                         "TRADITIONAL OFFERED WITH OPTIMA HEALTH PLANS"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 4,
        //             name: "NAICS",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 { id: 14, value: "4444110" },
        //                 { id: 15, value: "4444130" },
        //                 { id: 16, value: "1111110" },
        //                 { id: 17, value: "3333110" }
        //             ]
        //         }
        //     ]
        // };

        // this.arrRegions = this.initialResponse.levers.find(
        //     i => i.name == "REGION"
        // ).elements;
        // this.regionLeverId = this.initialResponse.levers.find(
        //     i => i.name == "REGION"
        // ).id;
        // this.arrNoOfEmps = this.initialResponse.levers.find(
        //     i => i.name == "NUMBER OF EMPLOYEES"
        // ).elements;
        // this.noOfEmpsLeverId = this.initialResponse.levers.find(
        //     i => i.name == "NUMBER OF EMPLOYEES"
        // ).id;
        // this.arrPlanTypes = this.initialResponse.levers.find(
        //     i => i.name == "PLAN TYPE"
        // ).elements;
        // this.planTypeLeverId = this.initialResponse.levers.find(
        //     i => i.name == "PLAN TYPE"
        // ).id;
        // this.arrNAICS = this.initialResponse.levers.find(
        //     i => i.name == "NAICS"
        // ).elements;
        // this.NAICSLeverId = this.initialResponse.levers.find(
        //     i => i.name == "NAICS"
        // ).id;

        //client ends

        //server
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/nextlevers",
                initialRequest
            )
            .subscribe(
                data => {
                    this.initialResponse = data;
                    if (this.initialResponse.message) {
                        alert("No Data");
                        this.plans = [];
                        return;
                    } else
        {
           this.arrRegions = this.initialResponse.levers.find(i => i.name == "REGION").elements;
           this.regionLeverId = this.initialResponse.levers.find(i => i.name == "REGION").id;
           this.arrNoOfEmps = this.initialResponse.levers.find(i => i.name == "NUMBER OF EMPLOYEES").elements;
           this.noOfEmpsLeverId = this.initialResponse.levers.find(i => i.name == "NUMBER OF EMPLOYEES").id;
           this.arrPlanTypes = this.initialResponse.levers.find(i => i.name == "PLAN TYPE").elements;
           this.planTypeLeverId = this.initialResponse.levers.find(i => i.name == "PLAN TYPE").id;
           this.arrNAICS = this.initialResponse.levers.find(i => i.name == "NAICS").elements;
           this.NAICSLeverId = this.initialResponse.levers.find(i => i.name == "NAICS").id;
        }
                },
                error => {
                    this.plans = [];
                    console.log(
                        "Response ERROR: " + JSON.stringify(error)
                    );
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

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

    submit() {
        this.selectedPlan = "";
        this.showPlans = true;
        this.showRates = false;
        this.rates = [];
        // let request2 =
        //     {
        //         healthcareCompanyId: 1,
        //         subcompanyId: 1,
        //         effectiveDate: this.leverForm.value.dateEffective,
        //         zipCode: this.leverForm.value.zipCode,
        //         numberOfEmployees: this.leverForm.value.noOfEmps,
        //         typeOfPlan: this.leverForm.value.typeOfPlan,
        //         selectedLevers: {
        //             naics: { id: "naics", name: "naics", selectedElement: { id: this.leverForm.value.nics, leverId: "naics" }, isTerminal: false }
        //         }
        //     };

        let request2 = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            selections: [
                {
                    leverId: this.regionLeverId,
                    elementId: null,
                    selectedValue: this.leverForm.value.zipcode
                },
                {
                    leverId: this.noOfEmpsLeverId,
                    elementId: null,
                    selectedValue: this.leverForm.value.noOfEmps
                },
                {
                    leverId: this.planTypeLeverId,
                    elementId: 12,
                    selectedValue: this.leverForm.value.planType
                },
                {
                    leverId: this.NAICSLeverId,
                    elementId: null,
                    selectedValue: this.leverForm.value.nics
                }
            ]
        };

        //client starts
        // this.response2 = {
        //     levers: [
        //         {
        //             id: 5,
        //             name: "PLAN",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 { id: 18, value: "PPO/EPO CP140" },
        //                 { id: 19, value: "PPO/EPO CP360" },
        //                 { id: 22, value: "PPO Plus Premier Passive" },
        //                 { id: 24, value: "PPO Plus Premier Active - Option 2" },
        //                 { id: 26, value: "PREMIER" },
        //                 { id: 28, value: "PPO Plus Premier aXcess 50" },
        //                 {
        //                     id: 30,
        //                     value: "PPO Plus Premier Passive, Voluntary"
        //                 },
        //                 {
        //                     id: 32,
        //                     value:
        //                         "PPO Plus Premier Active - Option 2, Voluntary"
        //                 },
        //                 { id: 34, value: "Premier, Voluntary" },
        //                 {
        //                     id: 36,
        //                     value:
        //                         "PPO Plus Premier Exchange-Certified Family Plan, Voluntary"
        //                 }
        //             ]
        //         }
        //     ]
        // };

        // this.plans = this.response2.levers.find(i => i.name == "PLAN").elements;
        // this.planLeverId = this.response2.levers.find(i => i.name == "PLAN").id;
        //client ends

        //server
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/nextlevers",
                request2
            )
            .subscribe(
                data => {
                    this.response2 = data;
                    if (this.response2.message) {
                        alert("No Plans Found for this selection");
                        this.plans = [];
                        return;
                    } else
                        {
        this.plans = this.response2.levers.find(i => i.name == "Plan").elements;
        this.planLeverId = this.response2.levers.find(i => i.name == "PLAN").id;
        }
                },
                error => {
                    this.plans = [];
                    console.log(
                        "Response ERROR: " + JSON.stringify(error)
                    );
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
        this.showPlans = true;

        let request3 = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            selections: [
                {
                    leverId: this.planLeverId,
                    elementId: this.selectedPlan.id,
                    selectedValue: this.selectedPlan.value
                }
            ]
        };

        // client start
        // this.response3 = {
        //     levers: [
        //         {
        //             id: 6,
        //             name: "ANNUAL MAXIMUM",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 {
        //                     id: 37,
        //                     value: "1000"
        //                 },
        //                 {
        //                     id: 38,
        //                     value: "1250"
        //                 },
        //                 {
        //                     id: 39,
        //                     value: "1500"
        //                 },
        //                 {
        //                     id: 40,
        //                     value: "2000"
        //                 },
        //                 {
        //                     id: 41,
        //                     value: "2500"
        //                 },
        //                 {
        //                     id: 43,
        //                     value: "5000"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 7,
        //             name: "DEDUCTIBLE",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 {
        //                     id: 44,
        //                     value: "0"
        //                 },
        //                 {
        //                     id: 45,
        //                     value: "25"
        //                 },
        //                 {
        //                     id: 46,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 8,
        //             name: "COMPOSITE FILLINGS - BACK",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 {
        //                     id: 47,
        //                     value: "TRUE"
        //                 },
        //                 {
        //                     id: 48,
        //                     value: "FALSE"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 9,
        //             name: "ENDODONTIC / PERIODONTIC / ORAL SURGERY",
        //             networkId: null,
        //             benefitClassId: null,
        //             elements: [
        //                 {
        //                     id: 49,
        //                     value: "Type II - Basic Dental Care"
        //                 },
        //                 {
        //                     id: 50,
        //                     value: "Type III - Major Dental Care"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 10,
        //             name: "PPO - TYPEI - COINSURANCE PERCENTAGE",
        //             networkId: 1,
        //             benefitClassId: 1,
        //             elements: [
        //                 {
        //                     id: 51,
        //                     value: "100"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 11,
        //             name: "PPO - TYPEII - COINSURANCE PERCENTAGE",
        //             networkId: 1,
        //             benefitClassId: 2,
        //             elements: [
        //                 {
        //                     id: 53,
        //                     value: "100"
        //                 },
        //                 {
        //                     id: 55,
        //                     value: "80"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 12,
        //             name: "PPO - TYPEIII - COINSURANCE PERCENTAGE",
        //             networkId: 1,
        //             benefitClassId: 3,
        //             elements: [
        //                 {
        //                     id: 57,
        //                     value: "100"
        //                 },
        //                 {
        //                     id: 59,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 13,
        //             name: "PPO - TYPEIV - COINSURANCE PERCENTAGE",
        //             networkId: 1,
        //             benefitClassId: 4,
        //             elements: [
        //                 {
        //                     id: 61,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 14,
        //             name: "PREMIER - TYPEI - COINSURANCE PERCENTAGE",
        //             networkId: 2,
        //             benefitClassId: 1,
        //             elements: [
        //                 {
        //                     id: 64,
        //                     value: "100"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 15,
        //             name: "PREMIER - TYPEII - COINSURANCE PERCENTAGE",
        //             networkId: 2,
        //             benefitClassId: 2,
        //             elements: [
        //                 {
        //                     id: 67,
        //                     value: "80"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 16,
        //             name: "PREMIER - TYPEIII - COINSURANCE PERCENTAGE",
        //             networkId: 2,
        //             benefitClassId: 3,
        //             elements: [
        //                 {
        //                     id: 70,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 17,
        //             name: "PREMIER - TYPEIV - COINSURANCE PERCENTAGE",
        //             networkId: 2,
        //             benefitClassId: 4,
        //             elements: [
        //                 {
        //                     id: 72,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 18,
        //             name: "OON - TYPEI - COINSURANCE PERCENTAGE",
        //             networkId: 3,
        //             benefitClassId: 1,
        //             elements: [
        //                 {
        //                     id: 75,
        //                     value: "100"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 19,
        //             name: "OON - TYPEII - COINSURANCE PERCENTAGE",
        //             networkId: 3,
        //             benefitClassId: 2,
        //             elements: [
        //                 {
        //                     id: 78,
        //                     value: "80"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 20,
        //             name: "OON - TYPEIII - COINSURANCE PERCENTAGE",
        //             networkId: 3,
        //             benefitClassId: 3,
        //             elements: [
        //                 {
        //                     id: 81,
        //                     value: "50"
        //                 }
        //             ]
        //         },
        //         {
        //             id: 21,
        //             name: "OON - TYPEIV - COINSURANCE PERCENTAGE",
        //             networkId: 3,
        //             benefitClassId: 4,
        //             elements: [
        //                 {
        //                     id: 83,
        //                     value: "50"
        //                 }
        //             ]
        //         }
        //     ]
        // };
        //client ends

        //server start
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/nextlevers",
                request3
            )
            .subscribe(
                data => {
                    this.response3 = data;
                    if (this.response3.message) {
                        alert("No Data Found for this selection");
                        return;
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
    getRates() {
        this.showRates = true;
        this.rates = [];
        this.updatedFormatOfLeversAfterAllLeversSelected = [];
        this.networdIds = [];
        this.ratesRequest = {
            healthcareCompanyId: 1,
            subcompanyId: 1,
            effectiveDate: this.leverForm.value.dateEffective,
            selections: []
        };

        this.response3.levers.forEach(element => {
            if (element.elements.length == 1) { 
                 let obj = { leverId: element.id, elementId: element.elements[0].id, selectedValue: element.elements[0].value };
                 this.ratesRequest.selections.push(obj);
            }

            if (element.selectedValue) {
                let obj = {
                    leverId: element.id,
                    elementId: element.selectedValue.id,
                    selectedValue: element.selectedValue.value
                };
                this.ratesRequest.selections.push(obj);
            }
        });

        //client starts

        // this.rates = [
        //     { network: "PPO", tier: "Subscriber", amount: 20 },
        //     { network: "PPO", tier: "Subscriber + Spouse", amount: 22.15 },
        //     { network: "PPO", tier: "Subscriber + Child", amount: 23.23 },
        //     { network: "PPO", tier: "Subscriber + Children", amount: 24.5 },
        //     { network: "PPO", tier: "Family", amount: 25 },
        //     { network: "Premier", tier: "Subscriber", amount: 25 },
        //     { network: "Premier", tier: "Subscriber + Spouse", amount: 27.15 },
        //     { network: "Premier", tier: "Subscriber + Child", amount: 28.23 },
        //     { network: "Premier", tier: "Subscriber + Children", amount: 29.5 },
        //     { network: "Premier", tier: "Family", amount: 30 },
        //     { network: "OON", tier: "Subscriber", amount: 30 },
        //     { network: "OON", tier: "Subscriber + Spouse", amount: 32.15 },
        //     { network: "OON", tier: "Subscriber + Child", amount: 33.23 },
        //     { network: "OON", tier: "Subscriber + Children", amount: 34.5 },
        //     { network: "OON", tier: "Family", amount: 35 }
        // ];
        // client ends

        //server start
        this.http
            .post(
                "http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/rates",
                this.ratesRequest
            )
            .subscribe(
                data => {
                    this.showRates = true;

                    let ratesResponse:any = data;

                    if (ratesResponse.message) {
                        alert("No Data Found for this selection");
                        return;
                    } else {
                        this.rates = ratesResponse.rates;
                    }
                },
                error => {
                    console.log(
                        "Response ERROR: " + JSON.stringify(error)
                    );
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


