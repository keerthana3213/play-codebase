import {
  Injectable,
  ApplicationRef,
  createComponent,
  EmbeddedViewRef,
  Injector,
  EnvironmentInjector,
  inject,
  ComponentRef,
} from '@angular/core';
import { AavaToastContainerComponent } from './toast-container/aava-toast-container.component';
import { AavaSuccessToastComponent } from './success/aava-success.component';
import { AavaErrorToastComponent } from './error/aava-error.component';
import { AavaWarningToastComponent } from './warning/aava-warning.component';
import { AavaInfoToastComponent } from './info/aava-info.component';
import { AavaDefaultToastComponent } from './default/aava-default.component';
import { AavaCustomToastComponent, CustomAction } from './custom/aava-custom.component';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastType =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'default'
  | 'custom';

export interface ToastConfig {
  title?: string;
  message?: string;
  duration?: number;
  position?: ToastPosition;
  showCloseButton?: boolean;
  showProgress?: boolean;
  icon?: string;
  iconColor?: string;
  customWidth?: string;
  customHeight?: string;
  design?: string;
  size?: string;
}

export interface SuccessToastConfig extends ToastConfig {
  type?: 'success';
}

export interface ErrorToastConfig extends ToastConfig {
  type?: 'error';
  showRetryButton?: boolean;
  retryButtonText?: string;
}

export interface WarningToastConfig extends ToastConfig {
  type?: 'warning';
  showActionButton?: boolean;
  actionButtonText?: string;
}

export interface InfoToastConfig extends ToastConfig {
  type?: 'info';
  showLearnMoreButton?: boolean;
  learnMoreButtonText?: string;
}

export interface DefaultToastConfig extends ToastConfig {
  type?: 'default';
}

export interface CustomToastConfig extends ToastConfig {
  type?: 'custom';
  customWidth?: string;
  customHeight?: string;
  customContent?: string;
  customBackground?: string;
  customTextColor?: string;
  progressColor?: string;
  showCustomActions?: boolean;
  customActions?: CustomAction[];
}

export interface ToastResult {
  action: 'close' | 'retry' | 'action' | 'learn-more' | 'timeout' | string;
  data?: any;
}

interface ActiveToast {
  ref: ComponentRef<any>;
  resolve: (result: ToastResult) => void;
  timeoutId: number | null;
  remainingTime: number;
  startTime: number;
}

@Injectable({
  providedIn: 'root',
})
export class AavaToastService {
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private envInjector = inject(EnvironmentInjector);

  private toastContainerRef: ComponentRef<AavaToastContainerComponent> | null =
    null;
  private activeToasts = new Map<number, ActiveToast>();
  private toastIdCounter = 0;
  private currentPosition: ToastPosition = 'top-right';

  private ensureContainer() {
    if (!this.toastContainerRef) {
      this.toastContainerRef = createComponent(AavaToastContainerComponent, {
        environmentInjector: this.envInjector,
        elementInjector: this.injector,
      });

      this.appRef.attachView(this.toastContainerRef.hostView);
      const containerElem = (
        this.toastContainerRef.hostView as EmbeddedViewRef<any>
      ).rootNodes[0] as HTMLElement;
      document.body.appendChild(containerElem);

      // Set initial position
      this.toastContainerRef.instance.setPosition(this.currentPosition);
    }
  }

  private show(component: any, config?: any): Promise<ToastResult> {
    if (config?.position) {
      this.setPosition(config.position);
    }
    this.ensureContainer();

    const id = this.toastIdCounter++;

    return new Promise((resolve) => {
      // Create the toast component
      const toastRef =
        this.toastContainerRef!.instance.container.createComponent(component, {
          injector: this.injector,
          environmentInjector: this.envInjector,
        });

      // Set default config
      const defaultConfig = {
        duration: 4000,
        showCloseButton: true,
        showProgress: true,
        ...config,
      };

      // Apply config to component
      if (config) {
        Object.assign(toastRef.instance as any, defaultConfig);
      }

      // Store the toast reference with timer management
      let timeoutId: number | null = null;
      let remainingTime = defaultConfig.duration;
      let startTime = Date.now();

      this.activeToasts.set(id, {
        ref: toastRef,
        resolve,
        timeoutId,
        remainingTime,
        startTime,
      });

      // Set up event handlers
      const instance = toastRef.instance as any;
      if (instance.closeToast) {
        instance.closeToast.subscribe(() => {
          this.dismiss(id, { action: 'close' });
        });
      }

      if (instance.retryAction) {
        instance.retryAction.subscribe(() => {
          this.dismiss(id, { action: 'retry' });
        });
      }

      if (instance.actionClick) {
        instance.actionClick.subscribe(() => {
          this.dismiss(id, { action: 'action' });
        });
      }

      if (instance.learnMoreClick) {
        instance.learnMoreClick.subscribe(() => {
          this.dismiss(id, { action: 'learn-more' });
        });
      }

      if (instance.customActionClick) {
        instance.customActionClick.subscribe((action: CustomAction) => {
          this.dismiss(id, { action: action.action, data: action });
        });
      }

      // Set up hover pause/resume functionality (only if auto-dismiss is enabled)
      if (defaultConfig.duration && defaultConfig.duration > 0) {
        const toastElement = toastRef.location.nativeElement;

        const pauseTimer = () => {
          const toast = this.activeToasts.get(id);
          if (toast && toast.timeoutId) {
            clearTimeout(toast.timeoutId);
            const elapsed = Date.now() - toast.startTime;
            toast.remainingTime = Math.max(0, toast.remainingTime - elapsed);
            toast.timeoutId = null;
          }
        };

        const resumeTimer = () => {
          const toast = this.activeToasts.get(id);
          if (toast && !toast.timeoutId && toast.remainingTime > 0) {
            toast.startTime = Date.now();
            toast.timeoutId = setTimeout(() => {
              if (this.activeToasts.has(id)) {
                this.dismiss(id, { action: 'timeout' });
              }
            }, toast.remainingTime) as any;
          }
        };

        toastElement.addEventListener('mouseenter', pauseTimer);
        toastElement.addEventListener('mouseleave', resumeTimer);
      }

      // Auto dismiss if duration is set
      if (defaultConfig.duration && defaultConfig.duration > 0) {
        const toast = this.activeToasts.get(id)!;
        toast.timeoutId = setTimeout(() => {
          if (this.activeToasts.has(id)) {
            this.dismiss(id, { action: 'timeout' });
          }
        }, defaultConfig.duration) as any;
      }
    });
  }

  private dismiss(id: number, result: ToastResult) {
    const toast = this.activeToasts.get(id);
    if (toast) {
      // Clear any active timer
      if (toast.timeoutId) {
        clearTimeout(toast.timeoutId);
      }

      // Add hide animation class
      const toastElement = toast.ref.location.nativeElement;
      toastElement.classList.add('toast-hide');

      setTimeout(() => {
        toast.ref.destroy();
        this.activeToasts.delete(id);
        toast.resolve(result);

        // Clean up container if no more toasts
        if (this.activeToasts.size === 0 && this.toastContainerRef) {
          this.toastContainerRef.destroy();
          this.toastContainerRef = null;
        }
      }, 400); // Animation duration
    }
  }

  success(config?: Partial<SuccessToastConfig>): Promise<ToastResult> {
    return this.show(AavaSuccessToastComponent, {
      title: 'Success!',
      message: 'Operation completed successfully.',
      ...config,
    });
  }

  error(config?: Partial<ErrorToastConfig>): Promise<ToastResult> {
    return this.show(AavaErrorToastComponent, {
      title: 'Error!',
      message: 'An error occurred. Please try again.',
      showRetryButton: false,
      ...config,
    });
  }

  warning(config?: Partial<WarningToastConfig>): Promise<ToastResult> {
    return this.show(AavaWarningToastComponent, {
      title: 'Warning!',
      message: 'Please review the following information carefully.',
      showActionButton: false,
      ...config,
    });
  }

  info(config?: Partial<InfoToastConfig>): Promise<ToastResult> {
    return this.show(AavaInfoToastComponent, {
      title: 'Information',
      message: 'Here is some important information for you.',
      showLearnMoreButton: false,
      ...config,
    });
  }

  default(config?: Partial<DefaultToastConfig>): Promise<ToastResult> {
    return this.show(AavaDefaultToastComponent, {
      title: 'Notification',
      message: 'This is a default toast with white background.',
      ...config,
    });
  }

  custom(config?: Partial<CustomToastConfig>): Promise<ToastResult> {
    return this.show(AavaCustomToastComponent, {
      title: 'Custom Toast',
      message: 'This is a custom toast.',
      customWidth: '400px',
      customHeight: 'auto',
      ...config,
    });
  }

  setPosition(position: ToastPosition) {
    this.currentPosition = position;
    if (this.toastContainerRef) {
      this.toastContainerRef.instance.setPosition(position);
    }
  }

  dismissAll() {
    const toastIds = Array.from(this.activeToasts.keys());
    toastIds.forEach((id) => {
      this.dismiss(id, { action: 'close' });
    });
  }
}
