import { SharedPipesModule } from './../shared/pipes/shared-pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { LeverSelectionComponent } from './lever-selection/lever-selection.component';

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule,
        LayoutRoutingModule, ReactiveFormsModule, FormsModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LeverSelectionComponent ]
})
export class LayoutModule {}
