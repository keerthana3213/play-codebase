import { Component } from '@angular/core';
import { AavaImageCardComponent, ImageCardData } from '@aava/play-core';



@Component({
  selector: 'app-test-img-card',
  imports: [AavaImageCardComponent],
  templateUrl: './test-img-card.component.html',
  styleUrl: './test-img-card.component.scss'
})
export class TestImgCardComponent {
  onButtonClick(event: { action: string | undefined, button: any }) {
    alert(`Button clicked! Text: "${event.button.text}" | Action: ${event.action}`);
    console.log('Button click event:', event);
  }

  onCardClick() {
    console.log('Card clicked!');
  }

  // Card 1: Vertical With Actions
  verticalWithActions: ImageCardData = {
    variant: 'withActions',
    type: 'default',
    title: 'Gen AI 101 Learning Path',
    image: '/assets/card-1-v.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio no...',
    divider: {
      variant: 'solid',
      color: '#E5E7EB'
    },
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      size: 'xxs',
      text: 'Jhone Doe'
    },
    subText: {
      icon: {
        name: 'eye',
        size: 16,
        color: '#BBBEC5'
      },
      text: '440'
    },
    buttons: [
      {
        text: 'Button Text',
        action: 'start-learning',
        variant: 'secondary',
        size: 'md',
      },
      {
        text: 'Button Text',
        action: 'view-details',
        variant: 'primary',
        size: 'md',
      }
    ],
    layout: {
      orientation: 'vertical',
      imageGrid: 'top',
      infoGrid: 'bottom'
    }
  };

  // Card 2: Horizontal With Actions
  horizontalWithActions: ImageCardData = {
    variant: 'withActions',
    type: 'default',
    title: 'Gen AI 101 Learning Path',
    image: '/assets/card-1-h.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio...',
    divider: {
      variant: 'solid',
      color: '#E5E7EB'
    },
    avatar: {
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      size: 'xxs',
      text: 'Jhone Doe'
    },
    subText: {
      icon: {
        name: 'eye',
        size: 16,
        color: '#BBBEC5'
      },
      text: '440'
    },
    buttons: [
      {
        text: 'Button Text',
        action: 'start-learning',
        variant: 'secondary',
        size: 'md',
      },
      {
        text: 'Button Text',
        action: 'view-details',
        variant: 'primary',
        size: 'md',
      }
    ],
    layout: {
      orientation: 'horizontal',
      imageGrid: 'left',
      infoGrid: 'right'
    }
  };

  // Card 3: Vertical Without Actions (Card 1)
  verticalWithoutActions1: ImageCardData = {
    variant: 'withoutActions',
    type: 'default',
    title: 'Generate UI Design',
    image: '/assets/card-1-v.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio...',
    tags: [
      {
        label: 'Tag',
        size: 'xs',
      }
    ],
    subDescription: {
      left: 'Text Casus Generibus(15)',
      right: '15th May, 18:00'
    },
    layout: {
      orientation: 'vertical',
      imageGrid: 'bottom',
      infoGrid: 'top'
    }
  };

  // Card 4: Horizontal Without Actions (Card 2)
  horizontalWithoutActions2: ImageCardData = {
    variant: 'withoutActions',
    type: 'default',
    title: 'Generate UI Design',
    image: '/assets/card-1-h.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio...',
    tags: [
      {
        label: 'Tag',
        size: 'xs',
        color: 'primary',
        shape: 'square'
      }
    ],
    subDescription: {
      left: 'Text Casus Generibus(15)',
      right: '15th May, 18:00'
    },
    layout: {
      orientation: 'horizontal',
      imageGrid: 'left',
      infoGrid: 'right'
    }
  }
  //   // Card 5: Vertical Without Actions (Card 3)
  verticalWithoutActions3: ImageCardData = {
    variant: 'withoutActions',
    type: 'default', // Now valid
    title: 'Generate UI Design',
    image: '/assets/card-1-v.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio...',
    tags: [
      {
        label: 'Tag',
        size: 'xs',
        color: 'primary',
        shape: 'square'
      }
    ],
    subDescription: {
      left: 'Text Casus Generibus(15)',
      right: '15th May, 18:00'
    },
    layout: {
      orientation: 'vertical',
      imageGrid: 'top',
      infoGrid: 'bottom'
    }
  };

  //   // Card 6: Horizontal Without Actions (Card 4)
  horizontalWithoutActions4: ImageCardData = {
    variant: 'withoutActions',
    type: 'default', // Now valid
    title: 'Generate UI Design',
    image: '/assets/card-1-h.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vulputate, odio...',
    tags: [
      {
        label: 'Tag',
        size: 'xs',
        color: 'primary',
        shape: 'square'
      }
    ],
    subDescription: {
      left: 'Text Casus Generibus(15)',
      right: '15th May, 18:00'
    },
    layout: {
      orientation: 'horizontal',
      imageGrid: 'right',
      infoGrid: 'left'
    }
  };

  // Primary Card Example
  primaryCard: ImageCardData = {
    variant: 'withActions',
    type: 'simple',
    title: 'AzureOpenAI',
    image: '/assets/primary-image.png',
    description: 'Azure OpenAI Service delivers enterprise-ready generative AI features...',
    layout: {
      orientation: 'vertical',
      imageGrid: 'top',
      infoGrid: 'bottom'
    },
    buttons: [
      {
        text: 'Button Text',
        action: 'start-learning',
        variant: 'secondary',
      }
    ],
  };
}
