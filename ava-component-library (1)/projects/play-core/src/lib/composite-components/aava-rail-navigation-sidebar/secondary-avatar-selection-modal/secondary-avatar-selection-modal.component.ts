import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    AavaSelectComponent,
    AavaSelectOptionComponent,
    AavaAvatarsComponent,
    AavaIconComponent
} from '../../../../public-api';

export interface SecondaryAvatarSelectItem {
    id: string;
    label: string;
    avatar?: string;
    initials?: string;
    initialsBackground?: string;
    initialsColor?: string;
    isSelected?: boolean;
    action?: string;
}

@Component({
    selector: 'app-secondary-avatar-selection-modal',
    standalone: true,
    imports: [
        CommonModule,
        AavaSelectComponent,
        AavaSelectOptionComponent,
        AavaAvatarsComponent,
        AavaIconComponent
    ],
    templateUrl: './secondary-avatar-selection-modal.component.html',
    styleUrls: ['./secondary-avatar-selection-modal.component.scss']
})
export class SecondaryAvatarSelectionModalComponent {
    @Input() items: SecondaryAvatarSelectItem[] = [];
    @Input() label: string = 'Select Realm';
    @Input() placeholder: string = 'Select realm here';
    @Output() closed = new EventEmitter<{ selectedItem?: SecondaryAvatarSelectItem }>();

    iconColor = "#0084FF";

    onSecondaryAvatarSelect(itemId: string): void {
        // First, update the selected state in the items array
        this.items.forEach(item => {
            item.isSelected = item.id === itemId;
        });

        const selectedItem = this.items.find(r => r.id === itemId);
        if (selectedItem) {
            this.closed.emit({ selectedItem });
        }
    }
}
