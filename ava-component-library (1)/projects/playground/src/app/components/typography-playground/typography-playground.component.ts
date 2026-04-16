import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-typography-playground',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './typography-playground.component.html',
    styleUrl: './typography-playground.component.scss'
})
export class TypographyPlaygroundComponent {

    // Mulish Primary Font Classes with actual sizes
    mulishClasses = {
        light: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        regular: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        medium: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        bold: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ]
    };

    // Inter Secondary Font Classes with actual sizes
    interClasses = {
        light: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        regular: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        medium: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ],
        bold: [
            { token: '25', size: '0.625rem', pixels: '10px' },
            { token: '50', size: '0.75rem', pixels: '12px' },
            { token: '75', size: '0.875rem', pixels: '14px' },
            { token: '100', size: '1rem', pixels: '16px' },
            { token: '200', size: '1.125rem', pixels: '18px' },
            { token: '300', size: '1.25rem', pixels: '20px' },
            { token: '400', size: '1.5rem', pixels: '24px' },
            { token: '500', size: '1.75rem', pixels: '28px' },
            { token: '600', size: '2rem', pixels: '32px' },
            { token: '700', size: '2.25rem', pixels: '36px' },
            { token: '800', size: '2.5rem', pixels: '40px' }
        ]
    };

    // Utility Classes
    utilityClasses = {
        fontFamily: ['font-primary', 'font-secondary'],
        textSizes: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'],
        fontWeights: ['font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold'],
        lineHeights: ['leading-tight', 'leading-snug', 'leading-normal', 'leading-relaxed', 'leading-loose'],
        letterSpacing: ['tracking-tighter', 'tracking-tight', 'tracking-normal', 'tracking-wide', 'tracking-wider', 'tracking-widest'],
        textAlign: ['text-left', 'text-center', 'text-right', 'text-justify'],
        textTransform: ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
        textDecoration: ['underline', 'line-through', 'no-underline'],
        textStyle: ['text-italic', 'text-underline', 'text-normal']
    };

    // Sample text for demonstration
    sampleText = 'The quick brown fox jumps over the lazy dog';
    sampleTextLong = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
}
