import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AavaLoaderComponent } from '../../components/loader/aava-loader.component';

@Component({
  selector: 'aava-cubical-loading',
  imports: [AavaLoaderComponent],
  templateUrl: './aava-cubical-loading.component.html',
  styleUrl: './aava-cubical-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaCubicalLoadingComponent {
  @Input() background: string = 'black';
}
