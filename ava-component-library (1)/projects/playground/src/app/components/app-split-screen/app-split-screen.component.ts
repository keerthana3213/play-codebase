import { Component, Input } from '@angular/core';
import { SplitScreenComponent } from '../../../../../@aava/play-core/src/lib/components/split-screen/split-screen.component';
import { LeftPanelComponent } from '../../../../../@aava/play-core/src/lib/components/split-screen/panel-components/left-panel.component';
import { RightPanelComponent } from '../../../../../@aava/play-core/src/lib/components/split-screen/panel-components/right-panel.component';
import { ChatWindowComponent } from '../../../../../@aava/play-core/src/lib/components/chat-window/chat-window.component';
import { CommonModule } from '@angular/common';
import { IconsComponent } from '../../../../../@aava/play-core/src/public-api';

type IconStatus = 'default' | 'active' | 'disable';

@Component({
  selector: 'app-split-screen',
  imports: [
    CommonModule,
    SplitScreenComponent,
    LeftPanelComponent,
    RightPanelComponent,
    ChatWindowComponent,
    IconsComponent,
  ],
  templateUrl: './app-split-screen.component.html',
  styleUrl: './app-split-screen.component.scss',
})
export class AppSplitScreenComponent {
  //variables for tabs of split-screen header
  isHistoryActive: boolean = false;
  isCodeActive: boolean = true;
  isPreviewActive: boolean = false;
  isLogsActive: boolean = false;

  //History tab logins
  toggleHistoryView(): void {
    this.isHistoryActive = !this.isHistoryActive;
  }
  toggleCodeView(): void {
    this.isCodeActive = true;
    this.isPreviewActive = false;
    this.isLogsActive = false;
  }
  togglePreviewView(): void {
    this.isCodeActive = false;
    this.isPreviewActive = true;
    this.isLogsActive = false;
  }
  toggleLogsView(): void {
    this.isCodeActive = false;
    this.isPreviewActive = false;
    this.isLogsActive = true;
  }

  //logic for collapsing split-screen
  isLeftPanelCollapsed: boolean = false;

  @Input() defaultLeftPanelWidth: string = '50%';
  @Input() defaultRightPanelWidth: string = '50%';

  toggleLeftPanel(): void {
    const leftPanel = document.querySelector('.awe-leftpanel') as HTMLElement;
    const rightPanel = document.querySelector('.awe-rightpanel') as HTMLElement;

    if (leftPanel && rightPanel) {
      if (this.isLeftPanelCollapsed) {
        // Expand left panel (return to default position)
        leftPanel.style.width = this.defaultLeftPanelWidth;
        rightPanel.style.width = this.defaultRightPanelWidth;
        this.isLeftPanelCollapsed = false;
      } else {
        // Collapse left panel
        leftPanel.style.width = '0%';
        rightPanel.style.width = '100%';
        this.isLeftPanelCollapsed = true;
      }
    }
  }

  //for chat window
  darkPrompt: string = '';
  lightPrompt: string = '';

  darkMessages: { text: string; from: 'user' | 'ai'; theme: 'dark' }[] = [
    {
      text: 'This is a dark theme intro message from AI.',
      from: 'ai',
      theme: 'dark',
    },
  ];

  lightMessages: { text: string; from: 'user' | 'ai'; theme: 'light' }[] = [
    {
      text: 'This is a light theme intro message from AI.',
      from: 'ai',
      theme: 'light',
    },
  ];

  rightIcons: { name: string; status: IconStatus }[] = [
    { name: 'awe_enhanced_alternate', status: 'default' },
    { name: 'awe_enhance', status: 'active' },
    { name: 'awe_enhanced_send', status: 'active' },
  ];

  handleIconClick(event: {
    name: string;
    side: string;
    index: number;
    theme: string;
  }): void {
    const normalizedIconName = event.name.toLowerCase();
    switch (normalizedIconName) {
      case 'awe_enhanced_alternate':
        this.handleEnhancedAlternate();
        break;
      case 'awe_enhance':
        this.handleEnhanceText();
        break;
      case 'awe_enhanced_send':
        if (event.theme === 'dark') {
          this.handleEnhancedSendDark();
        } else if (event.theme === 'light') {
          this.handleEnhancedSendLight();
        }
        break;
    }
  }

  handleEnhancedSendDark(): void {
    if (!this.darkPrompt.trim()) return;

    this.darkMessages.push({
      text: this.darkPrompt,
      from: 'user',
      theme: 'dark',
    });

    setTimeout(() => {
      this.darkMessages.push({
        text: 'This is an AI-generated reply to your message (dark theme).',
        from: 'ai',
        theme: 'dark',
      });
    }, 100);

    this.darkPrompt = '';
  }

  handleEnhancedSendLight(): void {
    if (!this.lightPrompt.trim()) return;

    this.lightMessages.push({
      text: this.lightPrompt,
      from: 'user',
      theme: 'light',
    });

    setTimeout(() => {
      this.lightMessages.push({
        text: 'This is an AI-generated reply to your message (light theme).',
        from: 'ai',
        theme: 'light',
      });
    }, 100);

    this.lightPrompt = '';
  }

  handleEnhancedAlternate(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        alert('File uploaded: ' + input.files[0].name);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }
  //locic for text enhancer
  handleEnhanceText(): void {
    console.log('Enhance text logic not implemented yet.');
  }



  // for documentation
  // Documentation Sections for History Cards Component
  sections = [
    {
      title: 'Basic Usage',
      description: 'This section demonstrates the basic usage of the history card component with an image and title.',
      showCode: false
    }
  ];

  // API Documentation
  apiProps = [
    {
      name: 'fixedLeftPanelWidth',
      type: 'string',
      default: '""',
      description: 'The fixed width of the left panel.'
    },
    {
      name: 'isResizable',
      type: 'boolean',
      default: 'false',
      description: 'Determines if the panels are resizable.'
    },
    {
      name: 'minWidth',
      type: 'string',
      default: '""',
      description: 'The minimum width of the panels.'
    }
  ];

  // Events
  events = [
    {
      name: 'toggleLeftPanel',
      type: 'EventEmitter<void>',
      description: 'Emitted when the left panel is toggled.'
    },
    {
      name: 'toggleHistoryView',
      type: 'EventEmitter<void>',
      description: 'Emitted when the history view is toggled.'
    },
    {
      name: 'toggleCodeView',
      type: 'EventEmitter<void>',
      description: 'Emitted when the code view is toggled.'
    },
    {
      name: 'togglePreviewView',
      type: 'EventEmitter<void>',
      description: 'Emitted when the preview view is toggled.'
    },
    {
      name: 'toggleLogsView',
      type: 'EventEmitter<void>',
      description: 'Emitted when the logs view is toggled.'
    }
  ];

  // Toggle Section Expansion (for showing code examples)
  toggleSection(index: number): void {
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Toggle Code Visibility (to show or hide the code examples)
  toggleCodeVisibility(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent the click event from bubbling up to the section header
    this.sections[index].showCode = !this.sections[index].showCode;
  }

  // Get Example Code for a Section
  getExampleCode(section: string): string {
    const examples: Record<string, string> = {
      'basic usage': `
      import { Component } from '@angular/core';
import { SplitScreenComponent } from '@awe/@aava/play-core';
import { LeftPanelComponent } from '@awe/@aava/play-core';
import { RightPanelComponent } from '@awe/@aava/play-core';
import { ChatWindowComponent } from '@awe/@aava/play-core';
import { IconsComponent } from '@awe/@aava/play-core';

@Component({
  selector: 'app-basic-split-screen',
  standalone: true,
  imports: [SplitScreenComponent, LeftPanelComponent, RightPanelComponent, ChatWindowComponent, IconsComponent],
  template: \`
  <awe-splitscreen [fixedLeftPanelWidth]="'30%'" class="container" [isResizable]="true" [minWidth]="'300px'">
  <awe-leftpanel [hasHeader]="true" awe-leftpanel>
    <div awe-leftpanel-header>
      <!-- Custom left panel header instead of awe-header -->
      <div class="custom-header light-theme">
        <div class="header-left">
          <awe-icons iconName="awe_home" iconColor="neutralIcon"></awe-icons>
          <awe-icons
            (click)="toggleLeftPanel()"
            iconName="awe_dock_to_right"
            iconColor="neutralIcon"
          ></awe-icons>
        </div>
        <div class="header-right">
          <div
            class="custom-button"
            (click)="toggleHistoryView()"
            [class.active]="isHistoryActive"
          >
            History
          </div>
        </div>
      </div>
    </div>
    <div awe-leftpanel-content>
      <div *ngIf="!isHistoryActive">
        <!--Injected chat-window on left content-->
        <awe-chat-window
          [theme]="'light'"
          [defaultText]="'Ask me'"
          [rightIcons]="rightIcons"
          [(textValue)]="lightPrompt"
          [chatMessages]="lightMessages"
          (iconClicked)="handleIconClick($event)"
          (enterPressed)="handleEnhancedSendLight()"
        >
        </awe-chat-window>
      </div>
      <div class="border history-container" *ngIf="isHistoryActive">
        <div class="history-content">
          <awe-icons
            iconName="awe_arrow_back_left"
            (click)="toggleHistoryView()"
          ></awe-icons>
        </div>
      </div>
    </div>
  </awe-leftpanel>

  <awe-rightpanel [hasHeader]="true" awe-rightpanel>
    <div awe-rightpanel-header>
      <!-- Custom right panel header instead of awe-header -->
      <div class="custom-header light-theme">
        <div class="header-left">
          <awe-icons
            class="dockToRight"
            *ngIf="isLeftPanelCollapsed"
            (click)="toggleLeftPanel()"
            iconName="awe_dock_to_right"
            iconColor="neutralIcon"
          ></awe-icons>
          <div class="button-group">
            <div
              class="custom-button"
              [class.active]="isCodeActive"
              (click)="toggleCodeView()"
            >
              Code
            </div>
            <div
              class="custom-button"
              [class.active]="isPreviewActive"
              (click)="togglePreviewView()"
            >
              Preview
            </div>
            <div
              class="custom-button"
              [class.active]="isLogsActive"
              (click)="toggleLogsView()"
            >
              Logs
            </div>
          </div>
        </div>

        <div class="header-right">
          <awe-icons
            iconName="awe_download"
            iconColor="neutralIcon"
          ></awe-icons>
          <awe-icons iconName="awe_copy" iconColor="neutralIcon"></awe-icons>
          <awe-icons iconName="awe_edit" iconColor="neutralIcon"></awe-icons>
        </div>
      </div>
    </div>
    <div awe-rightpanel-content>
      <div class="border" *ngIf="isCodeActive">
        <div class="content container-fluid">
          <pre><code>
          &lt;div class="container"&gt;
            &lt;h1&gt;Form Modal&lt;/h1&gt;
          
            &lt;div class="form-group"&gt;
              &lt;label for="firstName"&gt;First Name&lt;/label&gt;
              &lt;input type="text" id="firstName" class="form-control" /&gt;
            &lt;/div&gt;
          
            &lt;div class="form-group"&gt;
              &lt;label for="lastName"&gt;Last Name&lt;/label&gt;
              &lt;input type="text" id="lastName" class="form-control" /&gt;
            &lt;/div&gt;
          
            &lt;div class="form-group"&gt;
              &lt;label for="email"&gt;Email&lt;/label&gt;
              &lt;input type="email" id="email" class="form-control" /&gt;
            &lt;/div&gt;

            &lt;div class="form-group"&gt;
              &lt;label for="phone"&gt;Phone Number&lt;/label&gt;
              &lt;input type="tel" id="phone" class="form-control" /&gt;
            &lt;/div&gt;

            &lt;div class="form-group"&gt;
              &lt;label for="address"&gt;Address&lt;/label&gt;
              &lt;input type="text" id="address" class="form-control" /&gt;
            &lt;/div&gt;

            &lt;div class="form-group"&gt;
              &lt;label for="zip"&gt;Zip Code&lt;/label&gt;
              &lt;input type="text" id="zip" class="form-control" /&gt;
            &lt;/div&gt;

            &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;
          &lt;/div&gt;
</code></pre>
        </div>
      </div>

      <div class="border" *ngIf="isPreviewActive">
        <div class="content container-fluid">
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <title>Glowing Login</title>
              <style>
                body {
                  margin: 0;
                  font-family: "Segoe UI", sans-serif;
                  background: linear-gradient(
                    135deg,
                    #0a1f2b,
                    #1f3b52,
                    #263b5b
                  );
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  overflow: hidden;
                }

                .glow-box {
                  background: rgba(255, 255, 255, 0.05);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  border-radius: 16px;
                  padding: 2rem;
                  width: 320px;
                  color: white;
                  backdrop-filter: blur(10px);
                  box-shadow: 0 0 35px rgba(51, 102, 153, 0.8);
                  animation: pulse 3s ease-in-out infinite;
                }

                @keyframes pulse {
                  0%,
                  100% {
                    box-shadow: 0 0 30px rgba(51, 102, 153, 0.8);
                  }
                  50% {
                    box-shadow: 0 0 45px rgba(51, 102, 153, 1);
                  }
                }

                .glow-box h2 {
                  text-align: center;
                  margin-bottom: 1rem;
                  color: #4db8ff;
                }

                .glow-box input {
                  width: 100%;
                  padding: 0.6rem;
                  margin: 0.5rem 0;
                  border: none;
                  border-radius: 8px;
                  outline: none;
                  background: rgba(255, 255, 255, 0.1);
                  color: #4db8ff;
                  box-shadow: inset 0 0 10px rgba(51, 102, 153, 0.6);
                }

                .glow-box button {
                  width: 100%;
                  padding: 0.6rem;
                  margin-top: 1rem;
                  border: none;
                  border-radius: 8px;
                  background: #003366; /* Dark Blue */
                  color: #fff;
                  font-weight: bold;
                  cursor: pointer;
                  transition: background 0.3s ease;
                }

                .glow-box button:hover {
                  background: #002244; /* Darker Blue on Hover */
                }
              </style>
            </head>
            <body>
              <div class="glow-box">
                <h2>Confirm Password</h2>
                <input type="text" />
                <button>Save</button>
              </div>
            </body>
          </html>
        </div>
      </div>

      <div class="border" *ngIf="isLogsActive">
        <div class="content">
          <pre>
15:56:23.123 - INFO - Starting application

15:56:23.234 - DEBUG - Initializing database

15:56:23.345 - WARN - No network connection

15:56:23.456 - ERROR - Unable to connect to database

15:56:23.567 - INFO - Application started

15:56:23.678 - INFO - Attempting reconnection

15:56:23.789 - DEBUG - Reconnection successful

15:56:23.890 - INFO - Application running smoothly
        </pre
          >
        </div>
      </div>
    </div>
  </awe-rightpanel>
</awe-splitscreen>
\`
  })
export class BasicSplitScreenComponent {
  //variables for tabs of split-screen header
  isHistoryActive: boolean = false;
  isCodeActive: boolean = true;
  isPreviewActive: boolean = false;
  isLogsActive: boolean = false;

  //History tab logins
  toggleHistoryView(): void {
    this.isHistoryActive = !this.isHistoryActive;
  }
  toggleCodeView(): void {
    this.isCodeActive = true;
    this.isPreviewActive = false;
    this.isLogsActive = false;
  }
  togglePreviewView(): void {
    this.isCodeActive = false;
    this.isPreviewActive = true;
    this.isLogsActive = false;
  }
  toggleLogsView(): void {
    this.isCodeActive = false;
    this.isPreviewActive = false;
    this.isLogsActive = true;
  }

  //logic for collapsing split-screen
  isLeftPanelCollapsed: boolean = false;

  @Input() defaultLeftPanelWidth: string = '50%';
  @Input() defaultRightPanelWidth: string = '50%';

  toggleLeftPanel(): void {
    const leftPanel = document.querySelector('.awe-leftpanel') as HTMLElement;
    const rightPanel = document.querySelector('.awe-rightpanel') as HTMLElement;

    if (leftPanel && rightPanel) {
      if (this.isLeftPanelCollapsed) {
        // Expand left panel (return to default position)
        leftPanel.style.width = this.defaultLeftPanelWidth;
        rightPanel.style.width = this.defaultRightPanelWidth;
        this.isLeftPanelCollapsed = false;
      } else {
        // Collapse left panel
        leftPanel.style.width = '0%';
        rightPanel.style.width = '100%';
        this.isLeftPanelCollapsed = true;
      }
    }
  }

  //for chat window
  darkPrompt: string = '';
  lightPrompt: string = '';

  darkMessages: { text: string; from: 'user' | 'ai'; theme: 'dark' }[] = [
    {
      text: 'This is a dark theme intro message from AI.',
      from: 'ai',
      theme: 'dark',
    },
  ];

  lightMessages: { text: string; from: 'user' | 'ai'; theme: 'light' }[] = [
    {
      text: 'This is a light theme intro message from AI.',
      from: 'ai',
      theme: 'light',
    },
  ];

  rightIcons: { name: string; status: IconStatus }[] = [
    { name: 'awe_enhanced_alternate', status: 'default' },
    { name: 'awe_enhance', status: 'active' },
    { name: 'awe_enhanced_send', status: 'active' },
  ];

  handleIconClick(event: {
    name: string;
    side: string;
    index: number;
    theme: string;
  }): void {
    const normalizedIconName = event.name.toLowerCase();
    switch (normalizedIconName) {
      case 'awe_enhanced_alternate':
        this.handleEnhancedAlternate();
        break;
      case 'awe_enhance':
        this.handleEnhanceText();
        break;
      case 'awe_enhanced_send':
        if (event.theme === 'dark') {
          this.handleEnhancedSendDark();
        } else if (event.theme === 'light') {
          this.handleEnhancedSendLight();
        }
        break;
    }
  }

  handleEnhancedSendDark(): void {
    if (!this.darkPrompt.trim()) return;

    this.darkMessages.push({
      text: this.darkPrompt,
      from: 'user',
      theme: 'dark',
    });

    setTimeout(() => {
      this.darkMessages.push({
        text: 'This is an AI-generated reply to your message (dark theme).',
        from: 'ai',
        theme: 'dark',
      });
    }, 100);

    this.darkPrompt = '';
  }

  handleEnhancedSendLight(): void {
    if (!this.lightPrompt.trim()) return;

    this.lightMessages.push({
      text: this.lightPrompt,
      from: 'user',
      theme: 'light',
    });

    setTimeout(() => {
      this.lightMessages.push({
        text: 'This is an AI-generated reply to your message (light theme).',
        from: 'ai',
        theme: 'light',
      });
    }, 100);

    this.lightPrompt = '';
  }

  handleEnhancedAlternate(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';

    fileInput.addEventListener('change', (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files?.length) {
        alert('File uploaded: ' + input.files[0].name);
      }
    });

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }
  //locic for text enhancer
  handleEnhanceText(): void {
    console.log('Enhance text logic not implemented yet.');
  }
   }`
    };

    return examples[section] || '';
  }


  // Copy Code to Clipboard (for the code example)
  copyCode(section: string): void {
    const code = this.getExampleCode(section);
    navigator.clipboard.writeText(code).then(() => {
      console.log('Code copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy code:', err);
    });
  }

}
