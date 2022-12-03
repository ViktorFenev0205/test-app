import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from '@angular/core';
import { TooltipHotkey, TooltipPosition } from "./tooltip.enums";

@Component({
  selector: 'tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {
  public hotkeys: TooltipHotkey[] = [];
  public position: TooltipPosition = TooltipPosition.DEFAULT;
  public tooltip: any = null;
  public left = 0;
  public top = 0;
  public visible = false;
}
