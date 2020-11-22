import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Inject,
  Injector,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as React from 'react';

import * as ReactDOM from 'react-dom';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MyReactComponent } from '../react-components/MyReactComponent';
import { UserState } from 'mdmf-shared/src/lib/app-state/state/user.state';
import { User } from 'mdmf-shared/src/lib/app-state/models/User';


const containerElementName = 'myReactComponentContainer';


@Component({
  selector: 'app-my-wrapper-react-component',
  template: `<span #${containerElementName}></span>`,
  encapsulation: ViewEncapsulation.None
})
export class MyWrapperReactComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {


  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;

  @Select(UserState.getUsers) users: Observable<User[]>;

  @Inject('store') store: Store


  // constructor(private userState: UserState) {}
  // constructor(private store: Store) {}
  constructor() {}
 
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {

    if (this.users) {
      this.users.subscribe(
        xs => xs.forEach(
          u => console.log('MyWrapperReactComponent: accessing Angular shared store user.name = ', u.name)          
        )
      );
    }

    ReactDOM.render(
      <div style={{color: "blue"}}>
        <MyReactComponent /> 
      </div>, 
      this.containerRef.nativeElement
    );
  }
}