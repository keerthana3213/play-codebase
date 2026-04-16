
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { AavaDialogService, } from '../../../../../play-core/src/public-api';
// import { AniButtonComponent } from '@aava/play-core';

//import { PlayAnimateDirective } from '@aava/play-animations';
import { AavaButtonComponent, AavaTabsComponent } from '../../../../../play-core/src/public-api';
import { AavaDefaultCardComponent, AavaTableComponent, } from '@aava/play-core';
import { PlayAnimateDirective, PlayAnimationService } from '../../../../../play-animation/src/lib';
import { ModalContentComponent } from '../../components/app-dialog/demo/modal-demo/modal-demo.component';
import { Turtle } from 'lucide-angular';

@Component({
  selector: 'app-animation-1',
  imports: [AavaButtonComponent, AavaDefaultCardComponent, AavaTabsComponent, PlayAnimateDirective],
  templateUrl: './animation-1.component.html',
  styleUrl: './animation-1.component.scss'
})
export class Animation1Component implements AfterViewInit {
  @ViewChild('box', { static: true }) box!: ElementRef<HTMLDivElement>;
  @ViewChild('animBtn', { static: true }) animBtn!: ElementRef<HTMLButtonElement>;
  tabItems: any[] = [
    { id: 'tab1', label: 'Overview', content: 'Content 1', color: 'red' },
    { id: 'tab2', label: 'Analystics', content: 'Content 2', color: 'yellow' },
    { id: 'tab3', label: 'Report', content: 'Content 1' },
  ];
  activeTabId = 'tab1';
  activeTabId1 = 'tab3';
  constructor(private dialogService: AavaDialogService, private anim: PlayAnimationService) { }

  // SwoopIn Modal 
  openSwoopModal() {
    this.dialogService
      .openModal(ModalContentComponent, {
        width: '500px',
        maxWidth: '90vw',
        showCloseButton: true,
        overlay: true,
        animation: {
          onEnter: (el) => {
            const fn = this.anim.get('swoop');
            return fn ? fn(el, 0, 0, '', 0) : undefined;
          },
        },
      })
      .then((result) => {
        console.log('Swoop modal closed:', result);
      });
  }

  // SwoopOut Modal
  openSwoopOutModal() {
    this.dialogService
      .openModal(ModalContentComponent, {
        width: '500px',
        maxWidth: '90vw',
        showCloseButton: true,
        overlay: true,
        animation: {
          onEnter: (el) => {
            const fn = this.anim.get('swoopOut');
            return fn ? fn(el, 1.0, 0, 'ease-out', 0) : undefined;
          },
        },
      })
      .then((result) => {
        console.log('SwoopOut modal closed:', result);
      });
  }
  ngAfterViewInit() {
    // You can also do an initial animation here
    //gsap.from(this.box.nativeElement, { x: -100, opacity: 0, duration: 1 });
    //   gsap.from(this.animBtn.nativeElement, {
    //   y: -100,
    //   opacity: 0,
    //   duration: 1,
    //   ease: 'bounce.out'
    // });
  }

  // animateBox() {
  //   gsap.to(this.box.nativeElement, {
  //     x: 200,
  //     duration: 1,
  //     ease: 'power2.out'
  //   });
  // }

  //  onButtonClick() {
  //   const btn = this.animBtn.nativeElement;

  //   // Button click animation: scale + glow effect
  //   const tl = gsap.timeline();

  //   tl.to(btn, {
  //     scale: 0.9,
  //     boxShadow: '0 0 20px 4px rgba(0, 150, 255, 0.6)',
  //     duration: 0.1,
  //     ease: 'power1.inOut'
  //   })
  //   .to(btn, {
  //     scale: 1,
  //     boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
  //     duration: 0.3,
  //     ease: 'elastic.out(1, 0.4)'
  //   });
  // }
}