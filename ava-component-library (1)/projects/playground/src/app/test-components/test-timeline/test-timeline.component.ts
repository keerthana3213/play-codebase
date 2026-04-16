import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaTimelineComponent } from '../../../../../play-core/src/public-api';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-test-timeline',

  imports: [CommonModule, AavaTimelineComponent],
  templateUrl: './test-timeline.component.html',
  styleUrl: './test-timeline.component.scss',
})
export class TestTimelineComponent {
  // Basic timeline events
  isDisabled: boolean = false;

  orderTrackingEvents = [
    {
      // year: '2020',
      time: '10:30',
      title: 'Project Overview Project Overview Project Overview',
      // description: 'Lorem ipsum dolor sit amet...',
      iconName: 'circle-check',
      iconSize: '24px',
      iconColor: '#e91e63',
      showReadMore: true,
    },
    {
      // year: '2020',
      time: '10:40',
      title: 'Layout Analyzed',
      // description: 'Lorem ipsum dolor sit amet...',
      iconName: 'circle-check',
      iconSize: '20px',
      iconColor: '#e91e63',
      showReadMore: true,
    },
    {
      // year: '2020',
      time: '10:50',
      title: 'Build Completed',
      // description: 'Lorem ipsum dolor sit amet...',
      iconName: 'loader',
      iconSize: '16px',
      iconColor: '#e91e63',
      showReadMore: true,
    },
  ];
  axos = [
    {
      //year: '2020',
      //time: '10:30',
      title: 'Approved',
      description: `
                    <span style="display:block">
                      Saranya Anandh 5:23 2025 9:30 AM
                    </span>
                    <span style="display:block">
                      James Smith 10:23 2025 10:30 AM
                    </span>`,
      iconName: 'circle-check',
      iconSize: '24px',
      iconColor: 'green',
      iconStyle: {},
      bodyStyle: {
        year: {},
        time: {},
        text: {},
        title: { 'color': 'green', 'font-size': '16px', 'margin-top': '7px' },
        description: {},

      },
      titleStyle: {}

    },
    {
      //year: '2020',
      //time: '10:30',
      title: 'Rejected',
      description: `
                    <span style="display:block">
                      Hussain Hollis 5:23 2025 9:30 AM
                    </span>`,
      iconName: 'circle-x',
      iconSize: '24px',
      iconColor: 'red',
      iconStyle: {},
      bodyStyle: {
        year: {},
        time: {},
        text: {},
        title: { 'color': 'red', 'font-size': '16px', 'margin-top': '7px' },
        description: {},

      },
       tooltip: {
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Vestibulum viverra, nulla at tincidunt sagittis, nunc augue commodo libero, 
sed varius lorem elit nec mauris.`,
        messageIcon: 'MessageSquare',
       
      },
     


    },
    {
      //year: '2020',
      //time: '10:30',
      title: 'Resubmitted',
      description: `
                    <span style="display:block">
                      Alen Hollis 5:23 2025 9:30 AM
                    </span>`,
      iconName: 'circle-minus',
      iconSize: '24px',
      iconColor: 'gray',
      iconStyle: {},
      bodyStyle: {
        year: {},
        time: {},
        text: {},
        title: { 'color': 'gray', 'font-size': '16px', 'margin-top': '7px' },
        description: {},

      },
      titleStyle: {}

    },
  ];



  basicEvents = [
    {
      time: '10:00 AM',
      text: 'Project Kickoff Meeting',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      description: 'Initial project planning actions ',
    },
    {
      time: '2:00 PM',
      text: 'Development Phase Started',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      description: 'Begin coding and implementation',
    },
    {
      time: '4:30 PM',
      text: 'First Milestone Completed',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
      description: 'Successfully completed.',
    },
  ];

  basicEvents2 = [
    {
      time: '10:00 AM',
      text: 'Project Kickoff Meeting',
      iconName: 'circle-check',
      iconColor: '#ffffff',
      iconSize: '24px',
      year: '2025',
      description: 'Initial project planning actions ',
    },
    {
      time: '2:00 PM',
      text: 'Development Phase Started',
      iconName: 'loader',
      iconColor: '#ffffff',
      iconSize: '20px',
      year: '2025',
      description: 'Begin coding and implementation',
    },
    {
      time: '4:30 PM',
      text: 'First Milestone Completed',
      iconName: 'circle-check',
      iconColor: '#ffffff',
      iconSize: '16px',
      year: '2025',
      description: 'Successfully completed.',
    },
  ];

  // Events for text alignment demonstrations (includes image in icon circle example)
  alignmentEvents = [
    {
      time: '9:00 AM',
      iconName: 'loader',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
    },
    {
      time: '11:30 AM',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
    },
    {
      time: '2:00 PM',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
    },
  ];

  // // Events for text alignment demonstrations (includes image in icon circle example)
  alignmentEvents1 = [
    {
      time: '9:00 AM',
      imageUrl: 'assets/1.png',
      imageSize: '60px',
      year: '2025',
    },
    {
      time: '11:30 AM',
      imageUrl: 'assets/1.png',
      imageSize: '50px',
      year: '2025',
    },
    {
      time: '2:00 PM',
      imageUrl: 'assets/1.png',
      imageSize: '50px',
      year: '2025',
    },
    {
      time: '4:30 PM',
      imageUrl: 'assets/1.png',
      imageSize: '50px',
      year: '2025',
    },
  ];

  alignmentEvents2 = [
    {
      time: '9:00 AM',
      year: '2025',
    },
    {
      time: '11:30 AM',
      year: '2025',
    },
    {
      time: '2:00 PM',
      year: '2025',
    },
    {
      time: '4:30 PM',
      year: '2025',
    },
  ];
  // Events for horizontal timeline
  horizontalEvents = [
    {
      time: '10:00 AM',
      text: 'Project',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '24px',
      year: '2025',
      // description: 'Initial project planning actions ',
    },
    {
      time: '2:00 PM',
      text: 'Development',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '20px',
      year: '2025',
      // description: 'Begin coding and implementation',
    },
    {
      time: '4:30 PM',
      text: 'Completed',
      iconName: 'circle-check',
      iconColor: '#E91E63',
      iconSize: '16px',
      year: '2025',
      // description: 'Successfully completed.',
      isActive: false,
    },
  ];

  horizontalEvents2 = [
    {
      time: '10:00 AM',
      text: 'Project',
      iconName: 'circle-check',
      iconColor: '#ffffff',
      iconSize: '24px',
      year: '2025',
      // description: 'Initial project planning actions ',
    },
    {
      time: '2:00 PM',
      text: 'Development',
      iconName: 'circle-check',
      iconColor: '#ffffff',
      iconSize: '20px',
      year: '2025',
      // description: 'Begin coding and implementation',
    },
    {
      time: '4:30 PM',
      text: 'Completed',
      iconName: 'circle-check',
      iconColor: '#ffffffff',
      iconSize: '16px',
      year: '2025',
      // description: 'Successfully completed.',
      isActive: false,
    },
  ];

  cardEvents1 = [
    {
      title: 'Product Launch Event',
      description:
        'Successfully launched our new product line with great customer response',
      year: '2023',
      time: '10:00 AM',
      iconName: 'circle-check',
      iconColor: 'black',
      cardImageUrl:
        'https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D',
      cardImageAlt: 'Product Launch Event',
    },
    {
      title: 'Team Building Workshop',
      description:
        'Organized a comprehensive team building workshop to improve collaboration',
      year: '2023',
      time: '12:00 PM',
      iconName: 'circle-check',
      iconColor: 'black',
      cardImageUrl:
        'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
      cardImageAlt: 'Team Building Workshop',
    },
    {
      title: 'Quarterly Review Meeting',
      description:
        'Conducted quarterly performance review and planning session',
      year: '2023',
      time: '2:00 PM',
      iconName: 'circle-check',
      iconColor: 'black',
      cardImageUrl:
        'https://t4.ftcdn.net/jpg/02/56/10/07/360_F_256100731_qNLp6MQ3FjYtA3Freu9epjhsAj2cwU9c.jpg',
      cardImageAlt: 'Quarterly Review Meeting',
    },
  ];

  disabledEvents = [
    {
      title: 'Completed',
      iconName: 'circle-check',
      iconSize: '24px',
      iconColor: '#D1D3D8',
      showReadMore: true,
      time: '9:00 AM',
    },
    {
      title: 'Design Phase',
      iconName: 'loader',
      iconSize: '20px',
      iconColor: '#D1D3D8',
      showReadMore: true,
      time: '11:00 AM',
    },
    {
      title: 'Development',
      iconName: 'circle-check',
      iconSize: '16px',
      iconColor: '#D1D3D8',
      showReadMore: true,
      time: '2:00 PM',
    },
  ];

  disabledHorizontalEvents = [
    {
      time: '10:00 AM',
      text: 'Start',
      iconName: 'circle-check',
      iconColor: '#D1D3D8',
      iconSize: '24px',
      year: '2025',
    },
    {
      time: '2:00 PM',
      text: 'Progress',
      iconName: 'loader',
      iconColor: '#D1D3D8',
      iconSize: '20px',
      year: '2025',
    },
    {
      time: '4:30 PM',
      text: 'Complete',
      iconName: 'circle-check',
      iconColor: '#D1D3D8',
      iconSize: '16px',
      year: '2025',
    },
  ];
}
