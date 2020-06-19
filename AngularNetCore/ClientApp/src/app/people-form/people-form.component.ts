import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { IPerson } from '../people/person';
import { PeopleService } from '../people/people.service';
import { log } from 'util';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AddressesService } from '../addresses/addresses.service';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.css']
})
export class PeopleFormComponent implements OnInit {

  formGroup: FormGroup;
  isEdition: boolean;
  personId: number;
  addressesABorrar: number[] = [];

  constructor(
    private addressesService: AddressesService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private peopleService: PeopleService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        this.loadForm();
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

  private loadForm(person: IPerson = null): void {
    let dp = new DatePipe(navigator.language);
    let format = 'yyyy-MM-dd';

    this.formGroup = this.fb.group({
      name: person ? person.name : '',
      birthDate: person ? person.birthDate : '',
      addresses: this.fb.array([])
      //birthDate: person ? dp.transform(person.birthDate, format) : ''
    });

    let addresses = this.formGroup.controls['addresses'] as FormArray;
    person.addresses.map(address => {
      let addressFG = this.construirDireccion();
      addressFG.patchValue(address);
      addresses.push(addressFG);
    });
  }

  private onSave() {
    let person: IPerson = Object.assign({}, this.formGroup.value);
    if (this.isEdition) {
      person.id = parseInt(this.personId.toString());
      this.peopleService.updatePerson(person).subscribe(
        p => this.deleteAddresses(),
        error => console.error(error));
    } else {
      this.peopleService.createPerson(person).subscribe(
        p => this.onSaveSuccess(),
        error => console.error(error));
    }
  }

  private deleteAddresses() {
    if (this.addressesABorrar.length === 0) {
      this.onSaveSuccess();
      return;
    }

    this.addressesService.removeAddresses(this.addressesABorrar).subscribe(() =>
      this.onSaveSuccess(),
      error => console.error(error)
    );
  }

  private onSaveSuccess() {
    this.router.navigate(['/people']);
  }



  agregarDireccion() {
    let direccionArr = this.formGroup.get('addresses') as FormArray;
    let direccionFG = this.construirDireccion();
    direccionArr.push(direccionFG);
  }

  construirDireccion() {
    return this.fb.group({
      id: '0',
      street: '',
      city: '',
      personId: this.personId != null ? this.personId : 0
    });
  }

  removerDireccion(index: number) {
    let addresses = this.formGroup.get('addresses') as FormArray;
    let direccionRemover = addresses.at(index) as FormGroup;
    if (direccionRemover.controls['id'].value != '0') {
      this.addressesABorrar.push(<number>direccionRemover.controls['id'].value);
    }
    addresses.removeAt(index);
  }
}
