import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AavaButtonComponent, ConfettiConfig, ConfettiDirective } from "../../../../../play-core/src/public-api";

@Component({
  selector: 'app-test-confetti',
  standalone: true,
  imports: [
    CommonModule,
    AavaButtonComponent,
    ConfettiDirective
  ],
  templateUrl: './test-confetti.component.html',
  styleUrl: './test-confetti.component.scss'
})
export class TestConfettiComponent {
  // Full Screen Animation Configurations
  bottomConfig: ConfettiConfig = {
    count: 200,
    duration: 4000,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 3, max: 8 },
    spread: 80
  };

  fallingConfig: ConfettiConfig = {
    count: 150,
    duration: 5000,
    colors: ['#87CEEB', '#98D8C8', '#B0E0E6', '#AFEEEE', '#E0F6FF'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 2, max: 6 },
    spread: 100
  };

  sideConfig: ConfettiConfig = {
    count: 120,
    duration: 3500,
    colors: ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#DA70D6'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 4, max: 8 },
    spread: 60
  };

  singleConfig: ConfettiConfig = {
    count: 80,
    duration: 2500,
    colors: ['#FF4500', '#FF6347', '#FFA500', '#FFD700'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 3, max: 7 },
    spread: 45
  };

  explosionsConfig: ConfettiConfig = {
    count: 300,
    duration: 6000,
    colors: ['#FF1493', '#00CED1', '#FFD700', '#32CD32', '#FF6347', '#9370DB'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 2, max: 10 },
    spread: 90
  };

  // Shape-specific Configurations
  circleShapesConfig: ConfettiConfig = {
    count: 150,
    duration: 4000,
    colors: ['#FF69B4', '#FF1493', '#DC143C', '#B22222'],
    shapes: ['circle'],
    size: { min: 1, max: 5 },
    speed: { min: 3, max: 7 },
    spread: 70
  };

  squareShapesConfig: ConfettiConfig = {
    count: 120,
    duration: 3500,
    colors: ['#4169E1', '#0000FF', '#1E90FF', '#00BFFF'],
    shapes: ['square'],
    size: { min: 1, max: 5 },
    speed: { min: 2, max: 6 },
    spread: 80
  };

  triangleShapesConfig: ConfettiConfig = {
    count: 100,
    duration: 3000,
    colors: ['#32CD32', '#00FF00', '#ADFF2F', '#7FFF00'],
    shapes: ['triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 3, max: 8 },
    spread: 60
  };

  mixedShapesConfig: ConfettiConfig = {
    count: 250,
    duration: 5000,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 2, max: 9 },
    spread: 100
  };

  // Extreme Configurations
  megaConfig: ConfettiConfig = {
    count: 500,
    duration: 8000,
    colors: ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 1, max: 12 },
    spread: 120
  };

  rainbowConfig: ConfettiConfig = {
    count: 300,
    duration: 6000,
    colors: ['#FF0000', '#FF4500', '#FFD700', '#ADFF2F', '#00CED1', '#4169E1', '#8A2BE2', '#FF1493'],
    shapes: ['circle', 'square', 'triangle'],
    size: { min: 1, max: 5 },
    speed: { min: 2, max: 8 },
    spread: 100
  };
}