import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-lever-selection',
  templateUrl: './lever-selection.component.html',
  styleUrls: ['./lever-selection.component.scss'],
  animations: [routerTransition()]
})
export class LeverSelectionComponent implements OnInit {
  leverForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.leverForm = this.fb.group({
      dateEffective: ['', [Validators.required]],
      typeOfPlan: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      noOfEmps: ['', [Validators.required]],
      noOfEmps2: ['', [Validators.required]]
      
    });
  }
  save() {
    console.log('Saved: ' + JSON.stringify(this.leverForm.value));
    this.isSubmitted = true;
  }

}
