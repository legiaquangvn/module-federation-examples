import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWrapperReactComponent } from './MyWrapperReactComponent';
import { MdmfSharedModule } from 'mdmf-shared/src/lib/modules/mdmf-shared.module';
import { MyWrapperReactRoutingModule } from './MyWrapperReactRoutingModule';
import { Store } from '@ngxs/store';
import { UserState } from 'mdmf-shared/src/lib/app-state/state/user.state';

@NgModule({
  declarations: [MyWrapperReactComponent],
  imports: [
    CommonModule,
    MyWrapperReactRoutingModule
    // MdmfSharedModule    
  ],
  exports: [MyWrapperReactComponent],
  // providers: [
  //   Store, UserState
  // ]
})
export class MyWrapperReactModule { }
