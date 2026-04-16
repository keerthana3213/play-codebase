import { Component } from '@angular/core';
import { AavaTextboxComponent } from '@aava/play-core';

@Component({
  selector: 'app-test-textbox',
  standalone: true,
  imports: [AavaTextboxComponent],
  templateUrl: './test-textbox.component.html',
  styleUrl: './test-textbox.component.scss'
})
export class TestTextboxComponent {

change(event : any){
console.log(open,event);
}

}
