import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPerson } from '../people/person';
import { PeopleService } from '../people/people.service';
import { log } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  formGroup: FormGroup;
  isEdition: boolean;
  personId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private peopleService: PeopleService) { }

  ngOnInit() {
    this.loadForm();

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      } else {
        this.isEdition = true;
        this.personId = params["id"];
        this.peopleService.getPerson(this.personId).subscribe(
          person => this.loadForm(person),
          error => console.error(error));
      }
    });
  }

  loadForm(person: IPerson = null): void {
    let dp = new DatePipe(navigator.language);
    let format = 'yyyy-MM-dd';

    this.formGroup = this.fb.group({
      name: person ? person.name : '',
      birthDate: person ? person.birthDate : ''
      //birthDate: person ? dp.transform(person.birthDate, format) : ''
    });
  }

  onSave() {
    let person: IPerson = Object.assign({}, this.formGroup.value);
    if (this.isEdition) {
      person.id = parseInt(this.personId.toString());
      this.peopleService.updatePerson(person).subscribe(
        p => this.onSaveSuccess(),
        error => console.error(error));
    } else {
      this.peopleService.createPerson(person).subscribe(
        p => this.onSaveSuccess(),
        error => console.error(error));
    }
  }

  onSaveSuccess() {
    this.router.navigate(['/people']);
  }
}
