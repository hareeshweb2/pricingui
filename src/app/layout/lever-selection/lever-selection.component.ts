import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-lever-selection',
  templateUrl: './lever-selection.component.html',
  styleUrls: ['./lever-selection.component.scss'],
  animations: [routerTransition()]
})
export class LeverSelectionComponent implements OnInit {
  leversDataAfterPlanSelection: any;
  leversAfterPlan: any;
  alerts: any;
  plans: string[];
  leversResponse: any;
  updatedFormatOfLevers: any=[];
  leverForm: FormGroup;
  isSubmitted: boolean = false;
  selectedPlan;
  leversReqWithAllSelectedLevers: any;
  planTypes = [
    { id: "exchange Certified", value: "exchange certified" },
    { id: "KAIG Partnership", value: "KAIG Partnership" },
    { id: "traditional", value: "traditional" },
    { id: "traditional offered with Optima Health Plans", value: "traditional offered with Optima Health Plans" }];
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

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.leverForm = this.fb.group({
      dateEffective: ['', [Validators.required]],
      typeOfPlan: ['', [Validators.required]],
      nics: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      noOfEmps: ['', [Validators.required]]
      //,
      // noOfEmps2: ['', [Validators.required]]

    });
  }

  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  submit() {
    console.log('Saved: ' + JSON.stringify(this.leverForm.value));

    this.isSubmitted = true;

    // let leversReqOld = {
    //   "healthcareCompanyId": 1,
    //   "subcompanyId": 1,
    //   "effectiveDate": this.leverForm.value.dateEffective,
    //   "zipCode": this.leverForm.value.zipCode,
    //   "numberOfEmployees": this.leverForm.value.noOfEmps,
    //   "typeOfPlan": this.leverForm.value.typeOfPlan,
    //   "plan": {
    //     "levers": {
    //       "naics": {
    //         "id": "naics",
    //         "name": "naics",
    //         "elements": {}
    //       }
    //     }
    //   }
    // };


    let leversReq =
      {
        "healthcareCompanyId": 1,
        "subcompanyId": 1,
        "effectiveDate": this.leverForm.value.dateEffective,
        "zipCode": this.leverForm.value.zipCode,
        "numberOfEmployees": this.leverForm.value.noOfEmps,
        "typeOfPlan": this.leverForm.value.typeOfPlan,
        "selectedLevers": {
          "naics": {
            "id": "naics",
            "name": "naics",
            "selectedElement": {
              "id": this.leverForm.value.nics,
              "leverId": "naics"
            }
          }
        }
      }

    
    //client
    // this.leversResponse = {
    //   "levers":
    //     {
    //       "plan":
    //         {
    //           "id": "plan", "name": "plan", "elements":
    //             {
    //               "PASSIVE": { "id": "PASSIVE", "factor": 1, "leverId": "plan", "value": "Passive" },
    //               "PREMIERVOL": { "id": "PREMIERVOL", "factor": 1, "leverId": "plan", "value": "Premier, Voluntary" },
    //               "PASSIVEVOL": { "id": "PASSIVEVOL", "factor": 1, "leverId": "plan", "value": "Passive, Voluntary" },
    //               "CP140": { "id": "CP140", "factor": 1, "leverId": "plan", "value": "CP140" },
    //               "ACTIVE2": { "id": "ACTIVE2", "factor": 1, "leverId": "plan", "value": "Active - Option 2" },
    //               "EXCHANGEVOL": { "id": "EXCHANGEVOL", "factor": 1, "leverId": "plan", "value": "Exchange-Certified Family Plan, Voluntary" },
    //               "ACTIVE2VOL": { "id": "ACTIVE2VOL", "factor": 1, "leverId": "plan", "value": "Active - Option 2, Voluntary" },
    //               "AXCESS50VOL": { "id": "AXCESS50VOL", "factor": 1, "leverId": "plan", "value": "aXcess 50, Voluntary" },
    //               "PREMIER": { "id": "PREMIER", "factor": 1, "leverId": "plan", "value": "PREMIER" }
    //             }
    //         }
    //     }
    // };

    // this.plans = Object.keys(this.leversResponse.levers.plan.elements);
//client end


//server
    this.http.post('http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/levers', leversReq).subscribe(
      data => {
        this.leversResponse = data;
        if (this.leversResponse.message) {
          alert("No Plans Found for this selection");
          this.plans = [];
          return;
        }
        else
          this.plans = Object.keys(this.leversResponse.levers.plan.elements);
      },
      error => {
        this.plans = [];
        console.log("Response ERROR: " + JSON.stringify(error));
        if (error.message == "Resource not found")
          alert('Data not found for this search');
        else
          alert('Data not found for this search, Might be bad request')
        console.error("Error submitting post request!");
        return Observable.throw(error);
      }
    );



  }











  //after plan selection

  getResponseForPlan() {
    console.log('after plan req object: ' + JSON.stringify(this.leverForm.value));
    this.updatedFormatOfLevers = [];
    this.isSubmitted = true;


    let leversReqWithPlan = {
      "healthcareCompanyId": 1,
      "subcompanyId": 1,
      "effectiveDate": this.leverForm.value.dateEffective,
      "zipCode": this.leverForm.value.zipCode,
      "numberOfEmployees": this.leverForm.value.noOfEmps,
      "typeOfPlan": this.leverForm.value.typeOfPlan,
      "selectedLevers": {
        "naics": {
          "id": "naics",
          "name": "naics",
          "selectedElement": {
            "id": this.leverForm.value.nics,
            "leverId": "naics"
          }
        },
        "plan": {
          "id": "plan",
          "name": "plan",
          "selectedElement": {
            "id": this.selectedPlan,
            "leverId": "plan"
          }
        }
      }
    };


//     this.leversDataAfterPlanSelection = {
//       "levers": {
//         "annualmax": {
//           "id": "annualmax",
//           "name": "annual maximum",
//           "elements": {
//             "max2k": {
//               "factor": 1.4,
//               "leverId": "annualmax",
//               "id": "max2k",
//               "value": 2000
//             },
//             "max3k": {
//               "factor": 1.6,
//               "leverId": "annualmax",
//               "id": "max3k",
//               "value": 3000
//             },
//             "max1k": {
//               "factor": 1.1,
//               "leverId": "annualmax",
//               "id": "max1k",
//               "value": 1000
//             },
//             "max5k": {
//               "factor": 1.7,
//               "leverId": "annualmax",
//               "id": "max5k",
//               "value": 5000
//             },
//             "max1500": {
//               "factor": 1.3,
//               "leverId": "annualmax",
//               "id": "max1500",
//               "value": 1500
//             },
//             "max2500": {
//               "factor": 1.5,
//               "leverId": "annualmax",
//               "id": "max2500",
//               "value": 2500
//             },
//             "max1250": {
//               "factor": 1.2,
//               "leverId": "annualmax",
//               "id": "max1250",
//               "value": 1250
//             }
//           },
//           "level": "plan",
//           "selectedElement": null,
//           "isTerminal": false
//         },
//         "fillingsback": {
//           "id": "fillingsback",
//           "name": "composite fillings - back",
//           "elements": {
//             "backfalse": {
//               "factor": 1.2,
//               "leverId": "fillingsback",
//               "id": "backfalse",
//               "value": false
//             },
//             "backtrue": {
//               "factor": 1.1,
//               "leverId": "fillingsback",
//               "id": "backtrue",
//               "value": true
//             }
//           },
//           "level": "plan",
//           "selectedElement": null,
//           "isTerminal": false
//         },
//         "eposurgery": {
//           "id": "eposurgery",
//           "name": "Endodontic / Periodontic / Oral Surgery",
//           "elements": {
//             "typeII": {
//               "factor": 1.1,
//               "leverId": "eposurgery",
//               "id": "typeII",
//               "value": "Type II - Basic Dental Care"
//             },
//             "typeIII": {
//               "factor": 1.2,
//               "leverId": "eposurgery",
//               "id": "typeIII",
//               "value": "Type III - Major Dental Care"
//             }
//           },
//           "level": "plan",
//           "selectedElement": null,
//           "isTerminal": false
//         },
//         "deductible": {
//           "id": "deductible",
//           "name": "deductible",
//           "elements": {
//             "ded0": {
//               "factor": 1.1,
//               "leverId": "deductible",
//               "id": "ded0",
//               "value": 0
//             },
//             "ded25": {
//               "factor": 1.2,
//               "leverId": "deductible",
//               "id": "ded25",
//               "value": 25
//             },
//             "ded50": {
//               "factor": 1.3,
//               "leverId": "deductible",
//               "id": "ded50",
//               "value": 50
//             }
//           },
//           "level": "plan",
//           "selectedElement": null,
//           "isTerminal": false
//         }
//       },
//       "rates": null
//     }

//     this.leversAfterPlan = Object.keys(this.leversDataAfterPlanSelection.levers);

//     this.leversAfterPlan.forEach(element => {
//       let lever: any = {};
//       lever.id = this.leversDataAfterPlanSelection.levers[element].id;
//       lever.name = this.leversDataAfterPlanSelection.levers[element].name;
//       lever.selectedValue = "";
//       lever.elements = [];

//       let keysElements = Object.keys(this.leversDataAfterPlanSelection.levers[element].elements);
//       keysElements.forEach(elm => {
//         let drpdwn: any = {};
//         drpdwn.factor = this.leversDataAfterPlanSelection.levers[element].elements[elm].factor;
//         drpdwn.leverId = this.leversDataAfterPlanSelection.levers[element].elements[elm].leverId;
//         drpdwn.id = this.leversDataAfterPlanSelection.levers[element].elements[elm].id;
//         drpdwn.value = this.leversDataAfterPlanSelection.levers[element].elements[elm].value;
//         lever.elements.push(drpdwn);
// });
//       this.updatedFormatOfLevers.push(lever);
//     });

    //client end
 


//server start    
    this.http.post('http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/levers', leversReqWithPlan).subscribe(
      data => {
        this.leversDataAfterPlanSelection = data;
        if (this.leversDataAfterPlanSelection.message) {
          alert("No Data Found for this selection");
          return;
        }
        else { 
         


          this.leversAfterPlan = Object.keys(this.leversDataAfterPlanSelection.levers);

          this.leversAfterPlan.forEach(element => {
            let lever: any = {};
            lever.id = this.leversDataAfterPlanSelection.levers[element].id;
            lever.name = this.leversDataAfterPlanSelection.levers[element].name;
            lever.elements = [];

            let keysElements = Object.keys(this.leversDataAfterPlanSelection.levers[element].elements);
            keysElements.forEach(elm => {
              let drpdwn: any = {};
              drpdwn.factor = this.leversDataAfterPlanSelection.levers[element].elements[elm].factor;
              drpdwn.leverId = this.leversDataAfterPlanSelection.levers[element].elements[elm].leverId;
              drpdwn.id = this.leversDataAfterPlanSelection.levers[element].elements[elm].id;
              drpdwn.value = this.leversDataAfterPlanSelection.levers[element].elements[elm].value;
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
          alert('Data not found for this search');
        else
          alert('Data not found for this search, Might be bad request')
        console.error("Error submitting post request!");
        return Observable.throw(error);
      }
    );
  }

//server end 

//end after plan selection







//call after all levers selected start
  getResponseAfterAllLeversSelected() { 

    let leversReqWithAllSelectedLevers = {
      "healthcareCompanyId": 1,
      "subcompanyId": 1,
      "effectiveDate": this.leverForm.value.dateEffective,
      "zipCode": this.leverForm.value.zipCode,
      "numberOfEmployees": this.leverForm.value.noOfEmps,
      "typeOfPlan": this.leverForm.value.typeOfPlan,
      "selectedLevers": {
        "naics": {
          "id": "naics",
          "name": "naics",
          "selectedElement": {
            "id": this.leverForm.value.nics,
            "leverId": "naics"
          }
        },
        "plan": {
          "id": "plan",
          "name": "plan",
          "selectedElement": {
            "id": this.selectedPlan,
            "leverId": "plan"
          }
        }
      }
    };

 

    this.updatedFormatOfLevers.forEach(element => {
      if (element.selectedValue) { 
        leversReqWithAllSelectedLevers.selectedLevers[element.id] = {
          "id": element.id,
          "name": element.name,
          "selectedElement": {
            "id": element.selectedValue,
            "leverId": element.id
          }
        }      
      }
    });

    console.log(leversReqWithAllSelectedLevers);


  }



  
//end call after all levers selected  









}
