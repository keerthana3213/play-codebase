import { Component } from '@angular/core';
import { AavaSearchBarComponent } from '@aava/play-core';
@Component({
  selector: 'app-test-search-bar',
  imports: [AavaSearchBarComponent],
  templateUrl: './test-search-bar.component.html',
  styleUrl: './test-search-bar.component.scss'
})
export class TestSearchBarComponent {
  search(value: any) {
    console.log(value);
  }
  change(event: any) {
    console.log("change Value", event);
  }
}
