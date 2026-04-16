import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSSOLoginComponent } from '@aava/play-core';
import { ssoLoginEvents } from '../../sso-login-demo.data';

@Component({
  selector: 'ava-sso-login-events-demo',
  standalone: true,
  imports: [CommonModule, AavaSSOLoginComponent],
  template: `
    <div class="sso-login-events-demo-wrapper">
      <div class="demo-description">
        <h3>SSO Login Events</h3>
        <p>Explore the comprehensive event system of the SSO Login component for integration with your application.</p>
      </div>
      
      <div class="events-grid">
        <div 
          class="event-item" 
          *ngFor="let event of events"
        >
          <div class="event-header">
            <h4>{{ event.title }}</h4>
            <p>{{ event.description }}</p>
          </div>
          
          <div class="event-component">
            <aava-sso-login
              (login)="onLogin($event, event.id)"
              (ssoLogin)="onSSOLogin(event.id)"
              (forgotPassword)="onForgotPassword($event, event.id)"
              (troubleSignin)="onTroubleSigningIn(event.id)"
              (loginEvent)="onLoginEvent($event, event.id)"
            ></aava-sso-login>
          </div>
        </div>
      </div>

      <div class="demo-output" *ngIf="lastEvent">
        <h4>Last Event:</h4>
        <pre>{{ lastEvent | json }}</pre>
      </div>

      <div class="events-log">
        <h4>Events Log:</h4>
        <div class="log-entries">
          <div 
            class="log-entry" 
            *ngFor="let entry of eventsLog; trackBy: trackByIndex"
          >
            <span class="log-time">{{ entry.timestamp | date:'HH:mm:ss' }}</span>
            <span class="log-type">{{ entry.type }}</span>
            <span class="log-data">{{ entry.data | json }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .sso-login-events-demo-wrapper {
        max-width: 1200px;
        margin: 2rem auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
      }

      .demo-description {
        text-align: center;
        max-width: 600px;
      }

      .demo-description h3 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .demo-description p {
        color: var(--color-text-secondary);
        line-height: 1.6;
      }

      .events-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
        gap: 2rem;
        width: 100%;
      }

      .event-item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1.5rem;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-lg);
        border: 1px solid var(--color-border-subtle);
      }

      .event-header {
        text-align: center;
      }

      .event-header h4 {
        margin-bottom: 0.5rem;
        color: var(--color-text-primary);
        font-size: var(--global-font-size-lg);
      }

      .event-header p {
        color: var(--color-text-secondary);
        font-size: var(--global-font-size-sm);
        line-height: 1.4;
      }

      .event-component {
        display: flex;
        justify-content: center;
      }

      .demo-output {
        width: 100%;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-md);
        padding: 1rem;
        margin-top: 1rem;
      }

      .demo-output h4 {
        margin-bottom: 0.5rem;
        color: var(--color-text-primary);
      }

      .demo-output pre {
        background: var(--color-surface);
        padding: 1rem;
        border-radius: var(--global-radius-sm);
        overflow-x: auto;
        font-size: var(--global-font-size-sm);
        color: var(--color-text-secondary);
      }

      .events-log {
        width: 100%;
        background: var(--color-surface-subtle);
        border-radius: var(--global-radius-md);
        padding: 1rem;
        margin-top: 1rem;
      }

      .events-log h4 {
        margin-bottom: 1rem;
        color: var(--color-text-primary);
      }

      .log-entries {
        max-height: 300px;
        overflow-y: auto;
        background: var(--color-surface);
        border-radius: var(--global-radius-sm);
        padding: 0.5rem;
      }

      .log-entry {
        display: flex;
        gap: 1rem;
        padding: 0.5rem;
        border-bottom: 1px solid var(--color-border-subtle);
        font-family: monospace;
        font-size: var(--global-font-size-sm);
      }

      .log-entry:last-child {
        border-bottom: none;
      }

      .log-time {
        color: var(--color-text-tertiary);
        min-width: 80px;
      }

      .log-type {
        color: var(--color-primary);
        font-weight: var(--global-font-weight-bold);
        min-width: 120px;
      }

      .log-data {
        color: var(--color-text-secondary);
        flex: 1;
        word-break: break-all;
      }

      @media (max-width: 768px) {
        .events-grid {
          grid-template-columns: 1fr;
        }
        
        .event-item {
          padding: 1rem;
        }

        .log-entry {
          flex-direction: column;
          gap: 0.25rem;
        }
      }

      :host {
        display: block;
        margin-top: 0;
      }
    `,
  ],
})
export class AppSSOLoginEventsDemoComponent {
  events = ssoLoginEvents;
  lastEvent: { type: string; eventId: string; data: unknown } | null = null;
  eventsLog: Array<{ timestamp: Date; type: string; data: unknown }> = [];

  onLogin(credentials: unknown, eventId: string) {
    console.log('Login event for:', eventId, credentials);
    this.lastEvent = { type: 'login', eventId, data: credentials };
    this.addToLog('login', credentials);
  }

  onSSOLogin(eventId: string) {
    console.log('SSO Login event for:', eventId);
    this.lastEvent = { type: 'sso-login', eventId, data: null };
    this.addToLog('sso-login', null);
  }

  onForgotPassword(email: string, eventId: string) {
    console.log('Forgot Password event for:', eventId, email);
    this.lastEvent = { type: 'forgot-password', eventId, data: email };
    this.addToLog('forgot-password', email);
  }

  onTroubleSigningIn(eventId: string) {
    console.log('Trouble Signing In event for:', eventId);
    this.lastEvent = { type: 'trouble-signin', eventId, data: null };
    this.addToLog('trouble-signin', null);
  }

  onLoginEvent(event: unknown, eventId: string) {
    console.log('Login Event for:', eventId, event);
    this.lastEvent = { type: 'login-event', eventId, data: event };
    this.addToLog('login-event', event);
  }

  private addToLog(type: string, data: unknown) {
    this.eventsLog.unshift({
      timestamp: new Date(),
      type,
      data
    });

    // Keep only last 50 entries
    if (this.eventsLog.length > 50) {
      this.eventsLog = this.eventsLog.slice(0, 50);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
