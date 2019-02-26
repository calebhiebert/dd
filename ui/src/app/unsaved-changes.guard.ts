import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<ComponentCanDeactivate> {
  async canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ): Promise<boolean | UrlTree> {
    const canDeactivate = await Promise.resolve(component.canDeactivate());

    if (!canDeactivate) {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'You have unsaved changes, are you sure you want to leave?',
        showCancelButton: true,
      });

      if (confirmation.value === true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}
