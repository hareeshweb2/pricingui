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
import { FilterPipe,FilterPipe2 } from '../shared/pipes/filter.pipe';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

@NgModule({
    imports: [
        CommonModule,
        SharedPipesModule,
        LayoutRoutingModule, ReactiveFormsModule, FormsModule,
        NgbDropdownModule.forRoot(),
        NgHttpLoaderModule
    ],
    declarations: [LayoutComponent, SidebarComponent, HeaderComponent, LeverSelectionComponent,FilterPipe, FilterPipe2 ]
})
export class LayoutModule {}
