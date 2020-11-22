import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyWrapperReactComponent } from './MyWrapperReactComponent';


const routes: Routes = [
  { path: '', component: MyWrapperReactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyWrapperReactRoutingModule {}
