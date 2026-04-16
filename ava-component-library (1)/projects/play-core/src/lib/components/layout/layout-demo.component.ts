import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AavaLayoutComponent } from './aava-layout.component';
import { AavaButtonComponent } from '../button/aava-button.component';

@Component({
    selector: 'aava-layout-demo',
    standalone: true,
    imports: [CommonModule, AavaLayoutComponent, AavaButtonComponent],
    template: `
    <aava-layout 
      headerHeight="100px" 
      sidebarWidth="250px"
      footerText="© 2024 AVA Component Library">
      
      <!-- Header Content -->
      <div slot="header" class="demo-header">
        <div class="header-content">
          <h1>AVA Layout Demo</h1>
          <nav class="header-nav">
            <a href="#" class="nav-link">Home</a>
            <a href="#" class="nav-link">About</a>
            <a href="#" class="nav-link">Contact</a>
          </nav>
        </div>
      </div>

      <!-- Sidebar Content -->
      <div slot="sidebar" class="demo-sidebar">
        <div class="sidebar-section">
          <h3>Navigation</h3>
          <ul class="sidebar-nav">
            <li><a href="#" class="sidebar-link">Dashboard</a></li>
            <li><a href="#" class="sidebar-link">Users</a></li>
            <li><a href="#" class="sidebar-link">Settings</a></li>
            <li><a href="#" class="sidebar-link">Reports</a></li>
          </ul>
        </div>
        
        <div class="sidebar-section">
          <h3>Quick Actions</h3>
          <aava-button variant="primary" size="sm" class="sidebar-btn">
            New Project
          </aava-button>
          <aava-button variant="secondary" size="sm" class="sidebar-btn">
            Import Data
          </aava-button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="demo-main-content">
        <h2>Welcome to the Layout Component</h2>
        <p>This is a demonstration of the AVA Layout component. It provides a consistent structure with:</p>
        
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Header Section</h3>
            <p>Fixed height with full width, perfect for navigation and branding.</p>
          </div>
          
          <div class="feature-card">
            <h3>Sidebar</h3>
            <p>Fixed width sidebar with customizable content and responsive behavior.</p>
          </div>
          
          <div class="feature-card">
            <h3>Main Content</h3>
            <p>Flexible content area that adapts to the available space.</p>
          </div>
          
          <div class="feature-card">
            <h3>Footer</h3>
            <p>Bottom section with dynamic text support and customizable content.</p>
          </div>
        </div>

        <div class="demo-controls">
          <h3>Component Controls</h3>
          <p>Use the following inputs to customize the layout:</p>
          <ul>
            <li><code>headerHeight</code>: Set header height (default: 100px)</li>
            <li><code>sidebarWidth</code>: Set sidebar width (default: 100px)</li>
            <li><code>footerText</code>: Set default footer text</li>
            <li><code>showSidebar</code>: Toggle sidebar visibility</li>
            <li><code>showFooter</code>: Toggle footer visibility</li>
          </ul>
        </div>
      </div>

      <!-- Footer Content -->
      <div slot="footer" class="demo-footer">
        <p>Built with ❤️ using Angular and AVA Component Library</p>
        <div class="footer-links">
          <a href="#">Documentation</a>
          <a href="#">GitHub</a>
          <a href="#">Support</a>
        </div>
      </div>
    </aava-layout>
  `,
    styles: [`
    .demo-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0 20px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
    }

    .header-content h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }

    .header-nav {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .nav-link:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .demo-sidebar {
      padding: 20px;
      color: #333;
    }

    .sidebar-section {
      margin-bottom: 30px;
    }

    .sidebar-section h3 {
      margin: 0 0 15px 0;
      font-size: 16px;
      color: #555;
      border-bottom: 1px solid #e0e0e0;
      padding-bottom: 8px;
    }

    .sidebar-nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sidebar-link {
      display: block;
      padding: 10px 0;
      color: #666;
      text-decoration: none;
      transition: color 0.3s;
    }

    .sidebar-link:hover {
      color: #333;
    }

    .sidebar-btn {
      display: block;
      width: 100%;
      margin-bottom: 10px;
    }

    .demo-main-content {
      padding: 20px;
    }

    .demo-main-content h2 {
      color: #333;
      margin-bottom: 20px;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }

    .feature-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .feature-card h3 {
      color: #333;
      margin: 0 0 10px 0;
    }

    .feature-card p {
      color: #666;
      margin: 0;
      line-height: 1.5;
    }

    .demo-controls {
      background: #e3f2fd;
      padding: 20px;
      border-radius: 8px;
      margin: 30px 0;
    }

    .demo-controls h3 {
      color: #1976d2;
      margin: 0 0 15px 0;
    }

    .demo-controls ul {
      margin: 0;
      padding-left: 20px;
    }

    .demo-controls li {
      margin-bottom: 8px;
      color: #333;
    }

    .demo-controls code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    .demo-footer {
      text-align: center;
      padding: 20px;
    }

    .demo-footer p {
      margin: 0 0 15px 0;
      color: #666;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    .footer-links a {
      color: #666;
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-links a:hover {
      color: #333;
    }

    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 15px;
      }

      .header-nav {
        gap: 10px;
      }

      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AavaLayoutDemoComponent { }
