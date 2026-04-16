import { ChangeDetectionStrategy, Component, Input, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

export type ConfettiShape = 'circle' | 'square' | 'triangle';
export type ConfettiAnimation = 'bottom' | 'explosions' | 'side' | 'falling' | 'single';

export interface ConfettiConfig {
  count?: number;
  duration?: number;
  colors?: string[];
  shapes?: ConfettiShape[];
  size?: { min: number; max: number };
  speed?: { min: number; max: number };
  spread?: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  color: string;
  shape: ConfettiShape;
  life: number;
  maxLife: number;
}

@Component({
  selector: 'aava-confetti',
  imports: [],
  templateUrl: './aava-confetti.component.html',
  styleUrl: './aava-confetti.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AavaConfettiComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  
  @Input() animation: ConfettiAnimation = 'explosions';
  @Input() config: ConfettiConfig = {};

  private ctx!: CanvasRenderingContext2D;
  private particles: ConfettiParticle[] = [];
  private animationId: number = 0;
  private particleId = 0;
  private initialized = false;
  
  public isActive = false;

  private readonly defaultConfig: Required<ConfettiConfig> = {
    count: 100,
    duration: 3000,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 3, max: 8 },
    speed: { min: 1, max: 5 },
    spread: 50
  };

  ngAfterViewInit() {
    if (!this.initialized) {
      this.initCanvas();
    }
  }

  ngOnDestroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    this.resizeCanvas();
  }

  public initCanvas() {
    if (this.initialized) return;
    
    const canvas = this.canvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    
    // Set initial size and position
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    
    this.resizeCanvas();
    window.addEventListener('resize', this.handleResize);
    this.initialized = true;
  }

  private resizeCanvas() {
    const canvas = this.canvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  public trigger() {
    if (!this.initialized) {
      this.initCanvas();
    }
    
    this.stop();
    this.isActive = true;
    this.particles = [];
    
    const mergedConfig = { ...this.defaultConfig, ...this.config };
    this.createParticles(mergedConfig);
    this.animate(mergedConfig.duration);
  }

  public stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
    this.isActive = false;
    this.particles = [];
    this.ctx?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
  }

  private createParticles(config: Required<ConfettiConfig>, triggerRect?: DOMRect) {
    const { width, height } = this.canvas.nativeElement;
    
    for (let i = 0; i < config.count; i++) {
      const particle = this.createParticle(config, width, height);
      this.particles.push(particle);
    }
  }

  private createParticle(config: Required<ConfettiConfig>, width: number, height: number): ConfettiParticle {
    const { x, y, vx, vy } = this.getInitialPosition(width, height, config.spread);
    
    return {
      id: this.particleId++,
      x,
      y,
      vx: vx * this.random(config.speed.min, config.speed.max),
      vy: vy * this.random(config.speed.min, config.speed.max),
      rotation: this.random(0, Math.PI * 2),
      rotationSpeed: this.random(-0.1, 0.1),
      size: this.random(config.size.min, config.size.max),
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      shape: config.shapes[Math.floor(Math.random() * config.shapes.length)],
      life: config.duration,
      maxLife: config.duration
    };
  }

  private getInitialPosition(width: number, height: number, spread: number) {
    const spreadRad = (spread * Math.PI) / 180;
    
    switch (this.animation) {
      case 'bottom':
        // Start from the bottom of the screen, spread across full width
        return {
          x: this.random(0, width),
          y: height + 10,
          vx: this.random(-3, 3),  // Increased horizontal spread
          vy: this.random(-12, -8) // Increased upward velocity
        };
        
      case 'side':
        const side = Math.random() > 0.5;
        // Start from the edges of the screen, use full height
        return {
          x: side ? -10 : width + 10,
          y: this.random(0, height), // Full screen height
          vx: side ? this.random(4, 8) : this.random(-8, -4), // Increased horizontal velocity
          vy: this.random(-4, 4) // Increased vertical spread
        };
        
      case 'falling':
        // Start from top of screen, spread across full width
        return {
          x: this.random(0, width),
          y: -10,
          vx: this.random(-2, 2), // Increased horizontal drift
          vy: this.random(3, 7)  // Varied falling speed
        };
        
      case 'single':
        // Center of screen for single burst
        const centerX = width / 2;
        const centerY = height / 2;
        const angle = this.random(-spreadRad / 2, spreadRad / 2);
        const speed = this.random(5, 12); // Increased speed for more impact
        
        return {
          x: centerX,
          y: centerY,
          vx: Math.cos(angle - Math.PI / 2) * speed,
          vy: Math.sin(angle - Math.PI / 2) * speed
        };
        
      case 'explosions':
      default:
        // Multiple explosion points across the screen
        const expCenterX = this.random(width * 0.2, width * 0.8); // Random position within middle 60% of screen width
        const expCenterY = this.random(height * 0.2, height * 0.8); // Random position within middle 60% of screen height
        const expAngle = this.random(0, Math.PI * 2);
        const expSpeed = this.random(6, 15); // Increased speed for more dramatic effect
        
        return {
          x: expCenterX,
          y: expCenterY,
          vx: Math.cos(expAngle) * expSpeed,
          vy: Math.sin(expAngle) * expSpeed
        };
    }
  }

  private animate(duration: number) {
    const startTime = Date.now();
    
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      
      this.particles = this.particles.filter(particle => {
        this.updateParticle(particle);
        this.drawParticle(particle);
        return particle.life > 0;
      });
      
      if (progress < 1 && this.particles.length > 0) {
        this.animationId = requestAnimationFrame(frame);
      } else {
        this.stop();
      }
    };
    
    this.animationId = requestAnimationFrame(frame);
  }

  private updateParticle(particle: ConfettiParticle) {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += 0.3; // gravity
    particle.rotation += particle.rotationSpeed;
    particle.life -= 16; // ~60fps
    
    // Fade out
    const alpha = particle.life / particle.maxLife;
    particle.color = particle.color.replace(/rgba?\([^)]+\)/, '') + 
      (particle.color.includes('rgba') ? '' : `rgba(${this.hexToRgb(particle.color)}, ${alpha})`);
  }

  private drawParticle(particle: ConfettiParticle) {
    this.ctx.save();
    this.ctx.translate(particle.x, particle.y);
    this.ctx.rotate(particle.rotation);
    
    this.ctx.fillStyle = particle.color;
    
    switch (particle.shape) {
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
        
      case 'square':
        this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        break;
        
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(0, -particle.size / 2);
        this.ctx.lineTo(-particle.size / 2, particle.size / 2);
        this.ctx.lineTo(particle.size / 2, particle.size / 2);
        this.ctx.closePath();
        this.ctx.fill();
        break;
    }
    
    this.ctx.restore();
  }

  private random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
      '0, 0, 0';
  }
}