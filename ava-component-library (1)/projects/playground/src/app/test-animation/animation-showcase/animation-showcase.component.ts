import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaButtonComponent, AavaTabsComponent } from '../../../../../play-core/src/public-api';
import { AavaDefaultCardComponent, AavaDialogService } from '@aava/play-core';
import { PlayAnimateDirective, PlayAnimationService } from '../../../../../play-animation/src/lib';
import { ModalContentComponent } from '../../components/app-dialog/demo/modal-demo/modal-demo.component';

@Component({
    selector: 'app-animation-showcase',
    standalone: true,
    imports: [CommonModule, AavaButtonComponent, AavaDefaultCardComponent, AavaTabsComponent, PlayAnimateDirective],
    templateUrl: './animation-showcase.component.html',
    styleUrls: ['./animation-showcase.component.scss']
})
export class AnimationShowcaseComponent {
    // Tabs for the interactive demo
    activeTabId = 'tab1';
    tabItems = [
        { id: 'tab1', label: 'Overview' },
        { id: 'tab2', label: 'Details' },
        { id: 'tab3', label: 'Settings' }
    ];

    constructor(private dialogService: AavaDialogService, private anim: PlayAnimationService) { }

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
}
