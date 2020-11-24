import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWrapperReactComponent } from './MyWrapperReactComponent';
import { MyWrapperReactRoutingModule } from './MyWrapperReactRoutingModule';

@NgModule({
    declarations: [MyWrapperReactComponent],
    imports: [CommonModule, MyWrapperReactRoutingModule],
    exports: [MyWrapperReactComponent],
})
export class MyWrapperReactModule {}
