import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TooltipHotkey, TooltipPosition } from "./common/ui/tooltip/tooltip.enums";
import { IMAGE_TOOLTIP, SIMPLE_TOOLTIP } from "./common/ui/templates";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public IMAGE_TOOLTIP: string = IMAGE_TOOLTIP;
  public SIMPLE_TOOLTIP: string = SIMPLE_TOOLTIP;
  public TooltipHotkey: typeof TooltipHotkey = TooltipHotkey;
  public TooltipPosition: typeof TooltipPosition = TooltipPosition;
}
