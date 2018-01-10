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
  plans: string[];
  leversResponse:any;
  leverForm: FormGroup;
  isSubmitted: boolean = false;
  planTypes = [
    { id: "Exchange Certified", value: "Exchange certified" },
    { id: "KAIG Partnership", value: "KAIG Partnership" },
    { id: "Traditional", value: "Traditional" },
    { id: "Traditional offered with Optima Health Plans", value: "Traditional offered with Optima Health Plans" }];
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
      noOfEmps: ['', [Validators.required]],
      noOfEmps2: ['', [Validators.required]]

    });
  }
  submit() {
    console.log('Saved: ' + JSON.stringify(this.leverForm.value));
    this.isSubmitted = true;

    let leversReq = {
      "healthcareCompanyId": 1,
      "subcompanyId": 1,
      "effectiveDate": "2018-01-01",
      "zipCode": "24012",
      "numberOfEmployees": 10,
      "typeOfPlan": "traditional",
      "plan": {
        "levers": {
          "naics": {
            "id": "naics",
            "name": "naics",
            "elements": {
              "4444110": {
                "id": "4444110",
                "leverId": "4444110"
              }
            }
          }
        }
      }
    };


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


    this.http.post('http://pricing-qa.corvestacloud.com:8708/pricing/api/pricing/lever', leversReq).subscribe(
      data => {
        this.leversResponse = data;
        this.plans = Object.keys(this.leversResponse);
      },
      error => {
        console.error("Error submitting post request!");
        return Observable.throw(error);
      }
    );
  }

}
