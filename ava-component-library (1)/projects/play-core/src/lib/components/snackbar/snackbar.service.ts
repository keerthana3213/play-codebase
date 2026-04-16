import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  Injectable,
  signal,
  effect,
  EffectRef,
  EmbeddedViewRef,
} from '@angular/core';
import { AavaSnackbarComponent } from './aava-snackbar.component';

/**
 * Default duration for snackbar display in milliseconds.
 */
const DEFAULT_DURATION = 3000;

export type SnackbarPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'bottom-center'
  | 'center';

export interface SnackbarAction {
  text: string;
  color: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  href?: string;
  callback?: () => void;
  showXInside?: boolean;
}

export interface SnackbarIcon {
  name: string;
  color: string;
  size?: number;
  position?: 'left' | 'right';
  iconClose?: boolean;
}

export interface SnackbarData {
  id?: string;
  message: string;
  title?: string;
  duration: number;
  position: SnackbarPosition;
  color: string;
  backgroundColor: string;
  action?: SnackbarAction;
  icon?: SnackbarIcon;
  dismissible?: boolean;
  persistent?: boolean;
  type?: 'medium' | 'strong' | 'max' | 'custom' | string;
  variant?: 'surface-bold' | string;
  buttonLabel?: string;
  onButtonClick?: (event: Event) => void;
  size?: 'sm' | 'md' | 'lg';
  buttonSize?: 'sm' | 'md' | 'lg';
  styleType?: 'success' | 'warning' | 'danger' | 'info';
  iconName?: string;
}

/**
 * Service for managing snackbar notifications.
 * Note: Only one snackbar can be displayed at a time.
 * Showing a new snackbar will automatically dismiss the previous one.
 */
@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private snackbarSignal = signal<SnackbarData | null>(null);
  readonly snackbar$ = this.snackbarSignal.asReadonly();

  private componentRef?: ComponentRef<AavaSnackbarComponent>;
  private snackbarElement?: HTMLElement;
  private dismissTimeout?: ReturnType<typeof setTimeout>;
  private snackbarEffect?: EffectRef;

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector
  ) {
    // Automatically create/destroy snackbar component when signal changes
    // Note: This effect persists for the application lifetime since the service is provided in 'root'
    this.snackbarEffect = effect(() => {
      const data = this.snackbarSignal();
      if (data) {
        this.attachSnackbar();
      } else {
        this.detachSnackbar();
      }
    });
  }

  /**
   * Shows a snackbar notification.
   * @param message - The message to display
   * @param position - Position of the snackbar (default: 'bottom-center')
   * @param duration - Duration in milliseconds before auto-dismiss (default: 3000)
   * @param color - Text color (default: '#fff')
   * @param backgroundColor - Background color (default: '#6B7280')
   * @param options - Additional snackbar options
   */
  show(
    message: string,
    position: SnackbarPosition = 'bottom-center',
    duration = DEFAULT_DURATION,
    color = '#fff',
    backgroundColor = '#6B7280',
    options?: Partial<SnackbarData>
  ): void {
    // Clear any existing dismiss timeout
    this.clearDismissTimeout();

    try {
      this.snackbarSignal.set({
        message,
        position,
        duration,
        color,
        backgroundColor,
        ...options,
      });

      if (!options?.persistent) {
        this.dismissTimeout = setTimeout(() => {
          this.dismiss();
        }, duration);
      }
    } catch (error) {
      console.error('SnackbarService: Error showing snackbar', error);
    }
  }

  /**
   * Dismisses the currently displayed snackbar.
   */
  dismiss(): void {
    this.clearDismissTimeout();
    this.snackbarSignal.set(null);
  }

  /**
   * Clears the dismiss timeout if one exists.
   */
  private clearDismissTimeout(): void {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout);
      this.dismissTimeout = undefined;
    }
  }

  /**
   * Attaches the snackbar component to the DOM.
   * Note: The snackbar data is already stored in the signal and accessed by the component.
   */
  private attachSnackbar(): void {
    try {
      // Clear previous snackbar
      this.detachSnackbar();

      // Create component
      this.componentRef = createComponent(AavaSnackbarComponent, {
        environmentInjector: this.environmentInjector,
      });

      // Attach view to application
      this.appRef.attachView(this.componentRef.hostView);

      // Get DOM element with proper type casting
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hostView = this.componentRef.hostView as EmbeddedViewRef<any>;
      const rootNodes = hostView.rootNodes;
      
      if (rootNodes && rootNodes.length > 0) {
        this.snackbarElement = rootNodes[0] as HTMLElement;
        if (this.snackbarElement && document.body) {
          document.body.appendChild(this.snackbarElement);
        }
      }
    } catch (error) {
      console.error('SnackbarService: Error attaching snackbar', error);
      // Clean up on error
      this.detachSnackbar();
    }
  }

  /**
   * Detaches the snackbar component from the DOM.
   */
  private detachSnackbar(): void {
    try {
      // Remove DOM element first
      if (this.snackbarElement && this.snackbarElement.parentNode) {
        this.snackbarElement.parentNode.removeChild(this.snackbarElement);
      }
      this.snackbarElement = undefined;

      // Detach and destroy component
      if (this.componentRef) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = undefined;
      }
    } catch (error) {
      console.error('SnackbarService: Error detaching snackbar', error);
      // Reset state on error
      this.snackbarElement = undefined;
      this.componentRef = undefined;
    }
  }
}
