import { Component } from '@angular/core';
import { AavaListCardComponent, ListCardData } from '@aava/play-core';

@Component({
  selector: 'app-test-list-card',
  imports: [AavaListCardComponent],
  templateUrl: './test-list-card.component.html',
  styleUrl: './test-list-card.component.scss'
})
export class TestListCardComponent {

  onButtonClick(event: { action: string | undefined, item: any }) {
    const heading = event.item.column2?.heading || 'No heading';
    alert(`Button clicked! Heading: "${heading}" | Action: ${event.action}`);
    console.log('Button click event:', event);
  }

  onLinkClick(event: { link: any, item: any }) {
    alert(`Link clicked! Text: ${event.link.text}`);
    console.log('Link click event:', event);
  }

  // Sample data with different combinations
  sampleData1: ListCardData = {
    heading: "Heading",
    listItems: [
      {
        column1: {
          columnItem: "icon",
          columnItemProps: {
            iconName: "bell",
            iconColor: "#000000",
            iconSize: 24
          }
        },
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "View Details",
            href: "/angular-intro",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "start-learning",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "icon",
          columnItemProps: {
            iconName: "bell",
            iconColor: "#000000",
            iconSize: 24
          }
        },
        column2: {
          heading: "JavaScript Fundamentals and Advanced Programming Concepts",
          description: "Master the core concepts of JavaScript programming language",
          link: {
            text: "Continue Reading",
            href: "#javascript",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "continue-learning",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "icon",
          columnItemProps: {
            iconName: "bell",
            iconColor: "#000000",
            iconSize: 24
          }
        },
        column2: {
          heading: "Database Design and Schema Optimization Techniques",
          description: "Learn how to design efficient and scalable database schemas",
          link: {
            text: "View Details",
            href: "/angular-intro",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "enroll",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "icon",
          columnItemProps: {
            iconName: "bell",
            iconColor: "#000000",
            iconSize: 24
          }
        },
        column2: {
          heading: "REST API Development with Modern Frameworks and Best Practices",
          description: "Build robust REST APIs using modern frameworks and best practices",
          link: {
            text: "API Documentation",
            href: "/api-docs",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "start-api",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "icon",
          columnItemProps: {
            iconName: "bell",
            iconColor: "#000000",
            iconSize: 24
          }
        },
        column2: {
          heading: "REST API Development with Modern Frameworks and Best Practices",
          description: "Build robust REST APIs using modern frameworks and best practices",
          link: {
            text: "API Documentation",
            href: "/api-docs",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "start-api",
            variant: "primary"
          }
        }
      }
    ]
  };

  // Test Case 1: No icon/avatar, no button - column2 spans all columns
  noIconNoButton: ListCardData = {
    heading: "Heading",
    listItems: [
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      }
    ]
  };

  // Test Case 2: No icon/avatar, has button - column2 spans columns 1-2
  noIconHasButton: ListCardData = {
    heading: "Heading",
    listItems: [
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "action1",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "action2",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "action3",
            variant: "primary",
            color: "#E91E63"
          }
        }
      },
      {
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        },
        column3: {
          button: {
            text: "Label",
            action: "action4",
            variant: "primary",
            color: "#E91E63"
          }
        }
      }
    ]
  };

  // Test Case 3: Has avatar, no button - column2 spans to column3
  hasAvatarNoButton: ListCardData = {
    heading: "Heading",
    listItems: [
      {
        column1: {
          columnItem: "avatar",
          columnItemProps: {
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            size: "lg",
            shape: "pill"
          }
        },
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "avatar",
          columnItemProps: {
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            size: "lg",
            shape: "pill"
          }
        },
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "avatar",
          columnItemProps: {
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            size: "lg",
            shape: "pill"
          }
        },
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      },
      {
        column1: {
          columnItem: "avatar",
          columnItemProps: {
            imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            size: "lg",
            shape: "pill"
          }
        },
        column2: {
          heading: "Heading Comes Here",
          description: "Description text goes here",
          link: {
            text: "Label",
            href: "#",
            color: "#E91E63"
          }
        }
      }
    ]
  };
}
