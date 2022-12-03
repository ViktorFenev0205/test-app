import {
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input, OnChanges, SimpleChanges,
  ViewContainerRef
} from '@angular/core';
import { TooltipComponent } from "./tooltip.component";
import { TooltipHotkey, TooltipPosition } from "./tooltip.enums";
import { GLOBAL_HOTKEY } from "../constants";

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective implements OnChanges {

  @Input() tooltip: any = null;
  @Input() isOpen = false;
  @Input() position: TooltipPosition = TooltipPosition.DEFAULT;
  @Input() hotkeys: TooltipHotkey[] = [];

  private componentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const isOpenByDefault = changes['isOpen']?.currentValue;
    if (isOpenByDefault) {
      this.initializeTooltip();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.initializeTooltip();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownEnter(event: KeyboardEvent): void {
    if (event.key === GLOBAL_HOTKEY.key) {
      this.initializeTooltip();
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyupEnter(event: KeyboardEvent): void {
    if (event.key === GLOBAL_HOTKEY.key) {
      this.destroy();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  private initializeTooltip(): void {
    if (this.componentRef === null) {
      this.componentRef = this.viewContainerRef.createComponent(TooltipComponent);
      this.setTooltipComponentProperties();
    }
  }

  private setTooltipComponentProperties(): void {
    if (this.componentRef !== null) {
      this.componentRef.instance.tooltip = this.tooltip;
      this.componentRef.instance.position = this.position;
      this.componentRef.instance.hotkeys = this.hotkeys;

      const {left, right, top, bottom} = this.elementRef.nativeElement.getBoundingClientRect();


      // KEEP IN MIND - instance point is a central point, not edge/border!!!
      // U should find block point + he's central difference and assign it to same point of tooltip

      switch (this.position) {
        case TooltipPosition.BELOW: {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(bottom);
          break;
        }
        case TooltipPosition.ABOVE: {
          this.componentRef.instance.left = Math.round((right - left) / 2 + left);
          this.componentRef.instance.top = Math.round(top);
          break;
        }
        case TooltipPosition.RIGHT: {
          this.componentRef.instance.left = Math.round(right);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        case TooltipPosition.LEFT: {
          this.componentRef.instance.left = Math.round(left);
          this.componentRef.instance.top = Math.round(top + (bottom - top) / 2);
          break;
        }
        default: {
          break;
        }
      }
      this.componentRef.instance.visible = true;
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  destroy(): void {
    if (this.componentRef !== null) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
