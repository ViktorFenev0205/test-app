import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TooltipModule } from "./common/ui/tooltip/tooltip.module";
import { Block1Component } from './components/block1/block1.component';
import { Block2Component } from './components/block2/block2.component';

@NgModule({
  declarations: [
    AppComponent,
    Block1Component,
    Block2Component
  ],
  imports: [
    BrowserModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
