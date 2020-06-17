import { Component, OnInit } from '@angular/core';
import { IPerson } from './person';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: IPerson[];

  constructor(private peopleServie: PeopleService) {
  }

  ngOnInit() {
    this.getData();
  }

  onDelete(personId: number) {
    this.peopleServie.deletePerson(personId).subscribe(
      p => this.getData(),
      error => console.error(error)
    );
  }

  private getData(): void {
    this.peopleServie.getPeople().subscribe(
      p => this.people = p,
      error => console.log(error)
    );
  }

}
