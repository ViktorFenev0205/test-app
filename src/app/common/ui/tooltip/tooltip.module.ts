import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";

@NgModule({
  declarations: [
    TooltipComponent,
    TooltipDirective,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [TooltipDirective]
})
export class TooltipModule {
}
