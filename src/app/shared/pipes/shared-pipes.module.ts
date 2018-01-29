import { FilterPipe } from './filter.pipe';
import { FilterPipe2 } from "./filter.pipe";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [FilterPipe, FilterPipe2]
})
export class SharedPipesModule {}
