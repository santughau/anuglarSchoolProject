import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


const boot: any = [TooltipModule.forRoot(), AccordionModule.forRoot(), AlertModule.forRoot(), ButtonsModule.forRoot(), CarouselModule.forRoot(), BsDatepickerModule.forRoot(), BsDropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(), PopoverModule.forRoot(), ProgressbarModule.forRoot(), RatingModule.forRoot(), SortableModule.forRoot(), TabsModule.forRoot(), TimepickerModule.forRoot(), TypeaheadModule.forRoot(),]



@NgModule({
  declarations: [],
  imports: [boot,

  ],
  exports: [boot,]

})
export class NgxBootstrapModule { }
