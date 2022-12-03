import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TooltipHotkey, TooltipPosition } from "./common/ui/tooltip/tooltip.enums";
import { DEFAULT_HOTKEY, GLOBAL_HOTKEY } from "./common/ui/constants";
import { Block1Component } from "./components/block1/block1.component";
import { Block2Component } from "./components/block2/block2.component";

const CHANGE_HOTKEY_TEXT = 'Change hotkey';
const LISTENING_HOTKEY_TEXT = 'Listening...';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  public GLOBAL_HOTKEY = GLOBAL_HOTKEY;
  public IMAGE_TOOLTIP = Block1Component;
  public SIMPLE_TOOLTIP = Block2Component;
  public TooltipHotkey: typeof TooltipHotkey = TooltipHotkey;
  public TooltipPosition: typeof TooltipPosition = TooltipPosition;
  public buttonText = CHANGE_HOTKEY_TEXT;

  private eventListener: (event: KeyboardEvent) => void = this.handleHotkeyChanging.bind(this);

  changeHotkey(isDefault = false): void {
    if (isDefault) {
      this.GLOBAL_HOTKEY.key = DEFAULT_HOTKEY;
      return;
    }
    this.buttonText = LISTENING_HOTKEY_TEXT;
    document.addEventListener('keydown', this.eventListener);
  }

  handleHotkeyChanging(event: KeyboardEvent): void {
    document.removeEventListener('keydown', this.eventListener);
    this.GLOBAL_HOTKEY.key = event.key;
    this.buttonText = CHANGE_HOTKEY_TEXT;
  }
}
