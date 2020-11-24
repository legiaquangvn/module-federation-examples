import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellRoutingModule } from './shell-routing.module';
import { HomeComponent } from './components/home/home.component';
import { ListUserComponent } from './components/list-user/list-user.component';

@NgModule({
  declarations: [HomeComponent, ListUserComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ShellModule {}
