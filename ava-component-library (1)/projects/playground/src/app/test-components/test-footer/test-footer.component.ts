import { Component, ViewEncapsulation } from '@angular/core';
import { AavaAvatarsComponent, AavaButtonComponent, AavaDividersComponent, AavaFooterComponent, AavaLinkComponent, AavaTextboxComponent, } from '@aava/play-core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AavaFooterLeftComponent, AavaFooterRightComponent, AavaFooterCentreComponent } from '@aava/play-core';

@Component({
    selector: 'app-test-footer',
    imports: [CommonModule, FormsModule, AavaFooterLeftComponent, AavaFooterRightComponent, AavaFooterCentreComponent, AavaFooterComponent, AavaButtonComponent, AavaAvatarsComponent, AavaDividersComponent, AavaLinkComponent, AavaTextboxComponent],
    templateUrl: './test-footer.component.html',
    styleUrl: './test-footer.component.scss',
    encapsulation: ViewEncapsulation.None

})
export class TestFooterComponent {
    background: string = '';
    brandName: string = 'ASCENDION';
    brandLogo: string = 'assets/ascendion.png';
    navLinks: any[] = [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Get in touch', url: '/contact' },
        { label: 'FAQ', url: '/faq' }
    ];

    serviceLinks: any[] = [
        { label: 'Architecture', url: '/services/architecture' },
        { label: 'Buildings', url: '/services/buildings' },
        { label: '3D maps', url: '/services/maps' },
        { label: 'Structure design', url: '/services/design' }
    ];

    developerLinks: any[] = [
        { label: 'Features', url: '/developers/features' },
        { label: 'Testimonials', url: '/developers/testimonials' },
        { label: 'Referrals', url: '/developers/referrals' }
    ];


    socialLinks: any[] = [
        { icon: 'assets/facebook.png', url: 'https://facebook.com' },
        { icon: 'assets/instagram.png', url: 'https://instagram.com' },
        { icon: 'assets/linkedin.png', url: 'https://linkedin.com' }
    ];
    extraLabels: any[] = [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' }
    ];
    email: string = '';

    get hyperlinksColor() {
        return "var(--color-text-primary)"
    }

    handleSubscribe() {
        console.log("Subscribed with email:", this.email);
    }

    redirectTo(idx: any) {
        const url = idx.url;
        if (url) {
            window.open(url, '_blank');
        }
    }

}
