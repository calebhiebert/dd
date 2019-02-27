import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  Type,
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynComponentService {
  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) {}

  public getComponent<T>(t: Type<T>): ComponentRef<T> {
    const component = this.resolver
      .resolveComponentFactory(t)
      .create(this.injector);

    this.appRef.attachView(component.hostView);

    return component;
  }

  public getRootNode(component: ComponentRef<any>) {
    return (component.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
  }
}
