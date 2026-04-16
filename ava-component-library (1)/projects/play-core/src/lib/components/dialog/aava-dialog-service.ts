import {
    ApplicationRef,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    Type,
    createComponent,
    EnvironmentInjector
} from '@angular/core';
import { AavaDialogContainerComponent } from './dialog-container/aava-dialog-container.component'
import { AavaModalComponent } from './modal/aava-modal.component';
import { AavaSuccessComponent } from './success/aava-success.component';
import { AavaErrorComponent, ErrorButton } from './error/aava-error.component';
import { AavaWarningComponent, WarningButton } from './warning/aava-warning.component';
import { AavaInfoComponent, InfoButton } from './info/aava-info.component';
import { AavaConfirmationComponent } from './confirmation/aava-confirmation.component';
import { AavaLoadingComponent } from './loading/aava-loading.component';
import { AavaCustomComponent } from './custom/aava-custom.component';
import { AavaFeedbackComponent } from './feedback/aava-feedback.component';

// Dialog Types and Interfaces
export type DialogPosition = 'center' | 'left-top' | 'right-top' | 'right-bottom' | 'left-bottom';
export type DialogOverlay = true | false | 'transparent'; // true = normal overlay, false = no overlay, 'transparent' = invisible overlay

export interface DialogConfig {
    title?: string;
    message?: string;
    icon?: string;
    iconColor?: string;
    iconSize?: number;
    showCloseButton?: boolean;
    backdrop?: boolean;
    overlay?: DialogOverlay; // Controls overlay: true = normal, false = none, 'transparent' = invisible but blocks interaction
    position?: DialogPosition; // Controls dialog position on screen (default: 'center')
    width?: string;
    height?: string;
    data?: any;
    customOverlayStyle?: Record<string, string>;
    customDialogStyle?: Record<string, string>;
    closeOnBackdropClick?: boolean; // Controls whether clicking outside closes the dialog (default: true)
}

export interface SuccessDialogConfig extends DialogConfig {
    buttons?: DialogButton[];
    showButtons?: boolean;
    bottomBorder?: boolean;
    size?: 'lg' | 'md' | 'sm';
}

export interface ErrorDialogConfig extends DialogConfig {
    showRetryButton?: boolean;
    retryButtonText?: string;
    closeButtonText?: string;
    bottomBorder?: boolean;
    buttons?: ErrorButton[];
    showButtons?: boolean;
    size?: 'lg' | 'md' | 'sm';
}

export interface WarningDialogConfig extends DialogConfig {
    showProceedButton?: boolean;
    proceedButtonText?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    bottomBorder?: boolean;
    buttons?: WarningButton[];
    showButtons?: boolean;
    size?: 'lg' | 'md' | 'sm';
}

export interface InfoDialogConfig extends DialogConfig {
    showOkButton?: boolean;
    okButtonText?: string;
    showLearnMoreButton?: boolean;
    learnMoreButtonText?: string;
    bottomBorder?: boolean;
    buttons?: InfoButton[];
    showButtons?: boolean;
    size?: 'lg' | 'md' | 'sm';
}

export interface ConfirmationDialogConfig extends DialogConfig {
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    cancelButtonVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    destructive?: boolean;
    bottomBorder?: boolean;
}

export interface LoadingDialogConfig extends DialogConfig {
    progress?: number;
    showProgress?: boolean;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    spinnerColor?: string;
    indeterminate?: boolean;
    bottomBorder?: boolean;
}

export interface CustomDialogConfig extends DialogConfig {
    buttons?: DialogButton[];
    variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
    customContent?: string;
    showIcon?: boolean;
    showTitle?: boolean;
    showMessage?: boolean;
    bottomBorder?: boolean;
    label?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    destructive?: boolean;
}
export interface DialogAnimationHooks {
    onEnter?: (element: HTMLElement) =>any | void;
    onExit?: (element: HTMLElement) => any | void;
}
export interface ModalDialogConfig extends DialogConfig {
    maxWidth?: string;
    maxHeight?: string;
    minHeight?: string;
    showCloseButton?: boolean;
    animation?: DialogAnimationHooks

}

export interface DialogButton {
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    action?: string;
    disabled?: boolean;
}

export interface DialogResult {
    action?: string;
    data?: any;
    confirmed?: boolean;
}

export type DialogType = 'success' | 'error' | 'warning' | 'info' | 'confirmation' | 'loading' | 'custom';


@Injectable({ providedIn: 'root' })
export class AavaDialogService {
    private dialogStack: ComponentRef<AavaDialogContainerComponent>[] = [];
    constructor(
        private appRef: ApplicationRef,
        private injector: Injector,
        private envInjector: EnvironmentInjector
    ) { }
    closeAnimation:any;
    
    private get dialogRef(): ComponentRef<AavaDialogContainerComponent> | undefined {
        return this.dialogStack[this.dialogStack.length - 1];
    }
    
    private pushDialog(dialogRef: ComponentRef<AavaDialogContainerComponent>): void {
        this.dialogStack.push(dialogRef);
    }
    
    private popDialog(): ComponentRef<AavaDialogContainerComponent> | undefined {
        return this.dialogStack.pop();
    }
    open<T extends object>(component: Type<T>, data?: Partial<T>): Promise<any> {
        // Prevent body scrolling only if this is the first dialog
        if (this.dialogStack.length === 0) {
            document.body.style.overflow = 'hidden';
        }

        // Create container
        const newDialogRef = createComponent(AavaDialogContainerComponent, {
            environmentInjector: this.envInjector,
            elementInjector: this.injector
        });

        // Set stack index for proper z-index calculation
        newDialogRef.instance.stackIndex = this.dialogStack.length;

        // Apply custom styles, overlay setting, and position if provided
        if (data && (data as any).overlay !== undefined) {
            newDialogRef.instance.overlay = (data as any).overlay;
        }
        if (data && (data as any).position) {
            newDialogRef.instance.position = (data as any).position;
        }
        if (data && (data as any).customOverlayStyle) {
            newDialogRef.instance.customOverlayStyle = (data as any).customOverlayStyle;
        }
        if (data && (data as any).customDialogStyle) {
            newDialogRef.instance.customDialogStyle = (data as any).customDialogStyle;
        }
        if (data && (data as any).closeOnBackdropClick !== undefined) {
            newDialogRef.instance.closeOnBackdropClick = (data as any).closeOnBackdropClick;
        }

        this.appRef.attachView(newDialogRef.hostView);
        const containerElem = (newDialogRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        document.body.appendChild(containerElem);

        // Push to stack
        this.pushDialog(newDialogRef);

        // Create the target component dynamically inside the container
        const viewRef = newDialogRef.instance.container.createComponent(component, {
            injector: this.injector,
            environmentInjector: this.envInjector
        });

        if (data) {
            Object.assign(viewRef.instance, data);

            // Apply CSS classes to dialog container based on component properties

            requestAnimationFrame(() => {
                const dialogContent = containerElem.querySelector('.ava-dialog-content') as HTMLElement;
                if (dialogContent && data) {
                    // Apply bottom border class
                    if ((data as any).bottomBorder) {
                        dialogContent.classList.add('has-bottom-border');

                        // For non-custom dialogs, determine variant from component type
                        if (component === AavaSuccessComponent) {
                            dialogContent.classList.add('success');
                        } else if (component === AavaErrorComponent) {
                            dialogContent.classList.add('error');
                        } else if (component === AavaWarningComponent) {
                            dialogContent.classList.add('warning');
                        } else if (component === component) {
                            dialogContent.classList.add('info');
                        } else if ((data as any).destructive) {
                            dialogContent.classList.add('error'); // Destructive actions use error color
                        } else {
                            dialogContent.classList.add('default');
                        }

                        // Apply variant class for border color (for custom dialogs)
                        const variant = (data as any).variant;
                        if (variant && variant !== 'default') {
                            dialogContent.classList.add(variant);
                        }
                    }
                }
            });
        }

        return new Promise(resolve => {
            // Forward close from dialog shell
            const containerSub = newDialogRef.instance.closed.subscribe((result: any) => {
                this.closeSpecificDialog(newDialogRef);
                containerSub.unsubscribe();
                resolve(result);
            });

            // Optionally: Listen to `closed` output from the inner component
            const inner = viewRef.instance as any;
            if (inner.closed && typeof inner.closed.subscribe === 'function') {
                const innerSub = inner.closed.subscribe((result: any) => {
                    this.closeSpecificDialog(newDialogRef);
                    innerSub.unsubscribe();
                    resolve(result);
                });
            }
        });
    }
    
    private closeSpecificDialog(dialogRef: ComponentRef<AavaDialogContainerComponent>): void {
        // Find and remove this specific dialog from the stack
        const index = this.dialogStack.indexOf(dialogRef);
        if (index > -1) {
            this.dialogStack.splice(index, 1);
        }
        
        // Restore body scrolling only if all dialogs are closed
        if (this.dialogStack.length === 0) {
            document.body.style.overflow = '';
        }

        this.appRef.detachView(dialogRef.hostView);
        dialogRef.destroy();
    }

    close() {
        const dialogRef = this.popDialog();
        if (dialogRef) {
            // Restore body scrolling only if all dialogs are closed
            if (this.dialogStack.length === 0) {
                document.body.style.overflow = '';
            }

            this.appRef.detachView(dialogRef.hostView);
            dialogRef.destroy();
        }
    }
    success(config?: Partial<SuccessDialogConfig>): Promise<DialogResult> {
        return this.open(AavaSuccessComponent, {
            title: 'Success',
            message: 'Operation completed successfully!',
            buttons: [],
            showButtons: false,
            bottomBorder: true,
            size: 'lg',
            ...config
        });
    }

    error(config?: Partial<ErrorDialogConfig>): Promise<DialogResult> {
        return this.open(AavaErrorComponent, {
            title: 'Error',
            message: 'An error occurred. Please try again.',
            showRetryButton: false,
            showCloseButton: true,
            bottomBorder: true,
            buttons: [],
            showButtons: false,
            size: 'lg',
            ...config
        });
    }

    warning(config?: Partial<WarningDialogConfig>): Promise<DialogResult> {
        return this.open(AavaWarningComponent, {
            title: 'Warning',
            message: 'Please review the following information carefully.',
            showProceedButton: false,
            showCancelButton: true,
            bottomBorder: true,
            buttons: [],
            showButtons: false,
            size: 'lg',
            ...config
        });
    }

    info(config?: Partial<InfoDialogConfig>): Promise<DialogResult> {
        return this.open(AavaInfoComponent, {
            title: 'Information',
            message: 'Here is some important information for you.',
            showOkButton: true,
            showLearnMoreButton: false,
            bottomBorder: true,
            buttons: [],
            showButtons: false,
            size: 'lg',
            ...config
        });
    }

    confirmation(config?: Partial<ConfirmationDialogConfig>): Promise<DialogResult> {
        return this.open(AavaConfirmationComponent, {
            title: 'Confirm Action',
            message: 'Are you sure you want to proceed with this action?',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            confirmButtonVariant: 'primary',
            cancelButtonVariant: 'secondary',
            destructive: false,
            bottomBorder: false,
            ...config
        });
    }

    loading(config?: Partial<LoadingDialogConfig>): Promise<DialogResult> {
        return this.open(AavaLoadingComponent, {
            title: 'Loading...',
            message: 'Please wait while we process your request.',
            showProgress: false,
            progress: 0,
            showCancelButton: false,
            indeterminate: true,
            bottomBorder: false,
            ...config
        });
    }

    custom(config?: Partial<CustomDialogConfig>): Promise<DialogResult> {
        return this.open(AavaCustomComponent, {
            title: 'Dialog',
            message: '',
            variant: 'default',
            showIcon: true,
            showTitle: true,
            showMessage: true,
            buttons: [],
            bottomBorder: false,
            ...config
        });
    }

    feedback(config?: Partial<CustomDialogConfig>): Promise<DialogResult> {
        return this.open(AavaFeedbackComponent, {
            title: 'Feedback',
            message: 'Please provide your feedback',
            variant: 'default',
            showIcon: true,
            showTitle: true,
            showMessage: true,
            buttons: [],
            bottomBorder: false,
            label: 'Your feedback',
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            destructive: false,
            ...config
        });
    }

    /**
     * Opens a modal dialog with content projection support
     * Use this method when you want to provide custom content with header, body, and footer sections
     */
    async openModal<T extends object>(component: Type<T>, config?: Partial<ModalDialogConfig>, data?: Partial<T>): Promise<any> {
        // Prevent body scrolling only if this is the first dialog
        if (this.dialogStack.length === 0) {
            document.body.style.overflow = 'hidden';
        }

        // Create container
        const newDialogRef = createComponent(AavaDialogContainerComponent, {
            environmentInjector: this.envInjector,
            elementInjector: this.injector
        });

        // Set stack index for proper z-index calculation
        newDialogRef.instance.stackIndex = this.dialogStack.length;

        // Apply custom styles, overlay setting, and position if provided
        if (config && config.overlay !== undefined) {
            newDialogRef.instance.overlay = config.overlay;
        }
        if (config && config.position) {
            newDialogRef.instance.position = config.position;
        }
        if (config && config.customOverlayStyle) {
            newDialogRef.instance.customOverlayStyle = config.customOverlayStyle;
        }
        if (config && config.customDialogStyle) {
            newDialogRef.instance.customDialogStyle = config.customDialogStyle;
        }
        if (config && config.closeOnBackdropClick !== undefined) {
            newDialogRef.instance.closeOnBackdropClick = config.closeOnBackdropClick;
        }
        if (config && config.showCloseButton === false) {
            newDialogRef.instance.showCloseButton = config.showCloseButton;
        }

        this.appRef.attachView(newDialogRef.hostView);
        const containerElem = (newDialogRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        // Add class to indicate modal usage (removes default padding)
        const dialogContent = containerElem.querySelector('.ava-dialog-content');
        if (dialogContent) {
            dialogContent.classList.add('has-modal');
        }

        document.body.appendChild(containerElem);
        
        // Push to stack
        this.pushDialog(newDialogRef);
        
        if (config?.animation?.onEnter) {
            const maybePromise = config.animation.onEnter(containerElem);
            if (maybePromise instanceof Promise) await maybePromise;
        }

        // Create the ModalComponent as a wrapper
        const modalRef = newDialogRef.instance.container.createComponent(AavaModalComponent, {
            injector: this.injector,
            environmentInjector: this.envInjector
        });

        // Apply modal configuration
        if (config) {
            Object.assign(modalRef.instance, {
                width: config.width,
                height: config.height,
                maxWidth: config.maxWidth,
                maxHeight: config.maxHeight,
                minHeight: config.minHeight,
                showCloseButton: config.showCloseButton ?? true
            });
        }

        // Create the target component inside the modal's dynamic container
        const componentRef = modalRef.instance.container.createComponent(component, {
            injector: this.injector,
            environmentInjector: this.envInjector
        });

        if (data) {
            Object.assign(componentRef.instance, data);
        }

        return new Promise(resolve => {
            // Forward close from dialog container
            const containerSub = newDialogRef.instance.closed.subscribe((result: any) => {
                this.closeSpecificDialog(newDialogRef);
                containerSub.unsubscribe();
                resolve(result);
            });

            // Forward close from modal component
            const modalSub = modalRef.instance.closed.subscribe((result: any) => {
                this.closeSpecificDialog(newDialogRef);
                modalSub.unsubscribe();
                resolve(result);
            });

            // Optionally: Listen to `closed` output from the inner component
            const inner = componentRef.instance as any;
            if (inner.closed && typeof inner.closed.subscribe === 'function') {
                const innerSub = inner.closed.subscribe((result: any) => {
                    this.closeSpecificDialog(newDialogRef);
                    innerSub.unsubscribe();
                    resolve(result);
                });
            }
        });
    }


}
