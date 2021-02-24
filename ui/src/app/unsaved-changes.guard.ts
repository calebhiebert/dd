import { Injectable, HostListener, Directive } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
  UrlTree,
} from '@angular/router';
import Swal from 'sweetalert2';

@Directive()
@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard
  implements CanDeactivate<ComponentCanDeactivate> {
  @HostListener('window:beforeunload')
  async canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    const canDeactivate = await Promise.resolve(component.canDeactivate());

    if (!canDeactivate) {
      const confirmation = await Swal.fire({
        title: 'Are you sure?',
        text: 'You have unsaved changes, are you sure you want to leave?',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonText: 'Yes',
      });

      if (confirmation.value === true) {
        return true;
      } else {
        return false;
      }
    }

    return true;
  }

  @HostListener('window:beforeunload', ['$event'])
  handleUnload($event) {
    alert('test');
    $event.returnValue = false;
    return false;
  }
}

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}
