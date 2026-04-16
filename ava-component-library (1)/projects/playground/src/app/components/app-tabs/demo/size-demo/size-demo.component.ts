import { Component } from '@angular/core';
import { AavaTabsComponent } from '../../../../../../../play-core/src/public-api';
import { CommonModule } from '@angular/common';
import { buttonTabs } from '../tabs-demo.data';

@Component({
  selector: 'app-size-demo',
  imports: [AavaTabsComponent, CommonModule],
  templateUrl: './size-demo.component.html',
  styleUrl: './size-demo.component.scss'
})
export class SizeDemoComponent {
  buttonTabs = buttonTabs;
  
  activeTabIds = {
    xl: this.buttonTabs[0]?.id || 'overview',
    lg: this.buttonTabs[0]?.id || 'overview',
    md: this.buttonTabs[0]?.id || 'overview',
    sm: this.buttonTabs[0]?.id || 'overview',
    xs: this.buttonTabs[0]?.id || 'overview',
  };
}
