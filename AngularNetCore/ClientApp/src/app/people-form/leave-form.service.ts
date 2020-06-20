import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PeopleFormComponent } from './people-form.component';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaveFormService implements CanDeactivate<PeopleFormComponent> {

  canDeactivate(component: PeopleFormComponent): boolean {
    if (component.existPendingChanges()) {
      return confirm("There are pending cnahges. Do you want to dismiss them?");
    }
    return true;
  }
  constructor() { }
}
