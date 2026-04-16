import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaDefaultCardComponent, RequestCardComponent, RequestCardData, ReviewCardComponent, ReviewCardData, StatsCardComponent, StatsCardData, SubmissionCardComponent, SubmissionCardData, SummaryCardComponent, SummaryCardData, ExecutionCardComponent, ExecutionCardData, AavaIconComponent, ActionCardComponent, ActionCardData, WelcomeCardComponent, WelcomeCardData, ProfileCardComponent, ProfileCardData } from '../../../../../play-core/src/public-api';
import { TabItem } from '../../../../../play-core/src/lib/components/tabs/aava-tabs.component';
import { FooterComponent, FooterData } from '../../../../../play-core/src/lib/studios/cards/footer/footer.component';
import { HeaderComponent, HeaderData } from '../../../../../play-core/src/lib/studios/cards/header/header.component';

@Component({
  selector: 'app-console-cards',
  imports: [CommonModule, AavaDefaultCardComponent, HeaderComponent, FooterComponent, StatsCardComponent, SubmissionCardComponent, ReviewCardComponent, RequestCardComponent, SummaryCardComponent, ExecutionCardComponent, AavaIconComponent, ActionCardComponent, WelcomeCardComponent, ProfileCardComponent],
  templateUrl: './console-cards.component.html',
  styleUrl: './console-cards.component.scss'
})
export class ConsoleCardsComponent {

  // Artifact Metrics
  artifactMetricsHeaderData: HeaderData = {
    primaryHeading: "Artifact Metrics",
    secondaryHeading: "Overview of Artifacts Across Realms",
    tabs: [
      { id: 'your-realm', label: 'Your Realm' },
      { id: 'system-wide', label: 'System-wide' }
    ]
  };

  artifactMetricsStatsCards: StatsCardData[] = [
    {
      icon: 'url:assets/card-robo.svg',
      label: 'Agent',
      value: '56',
      valueColor: '#8B5CF6'
    },
    {
      icon: 'url:assets/card-tick.svg',
      label: 'Published',
      value: '20',
      valueColor: '#10B981'
    },
    {
      icon: 'url:assets/card-shape.svg',
      label: 'Pipeline',
      value: '42',
      valueColor: '#F59E0B'
    },
    {
      icon: 'url:assets/card-pen.svg',
      label: 'Draft',
      value: '15',
      valueColor: '#6B7280'
    }
  ];

  artifactMetricsFooterData: FooterData = {
    buttonText: "Check Metrics"
  };

  // Review Submission
  reviewSubmissionHeaderData: HeaderData = {
    primaryHeading: "Review Submission",
    secondaryHeading: "Track and Approve New Artifacts"
  };

  reviewSubmissionCards: SubmissionCardData[] = [
    {
      icon: {
        name: 'bot',
        size: 24
      },
      text: 'AI Assistant v2.1',
      topTag: {
        label: '7 days ago',
        color: 'custom',
        bg: '#FEF3C7',
        textColor: '#D97706'
      },
      tags: [
        { label: 'Ascendion', color: 'default' },
        { label: 'Pipeline', color: 'custom', bg: '#EBF8FF', textColor: '#2563EB' },
        { label: 'New Request', color: 'custom', bg: '#DCFCE7', textColor: '#16A34A' }
      ],
      avatar: {
        imageUrl: 'assets/1.svg',
        size: 'xxs'
      },
      label: 'Harvey Specter'
    },
    {
      icon: {
        name: 'bot',
        size: 24
      },
      text: 'Data Processing Line',
      topTag: {
        label: '4 days ago',
        color: 'custom',
        bg: '#DBEAFE',
        textColor: '#1D4ED8'
      },
      tags: [
        { label: 'Ascendion', color: 'default' },
        { label: 'Agent', color: 'custom', bg: '#F0F9FF', textColor: '#0EA5E9' },
        { label: 'New Request', color: 'custom', bg: '#DCFCE7', textColor: '#16A34A' }
      ],
      avatar: {
        imageUrl: 'assets/1.svg',
        size: 'xxs'
      },
      label: 'Harvey Specter'
    }
  ];

  reviewSubmissionFooterData: FooterData = {
    buttonText: "View All Submissions"
  };

  // ============================================================================
  // CARD 3: REVISIONS PENDING - Review Cards for User Authentication Flow and Payment Integration API
  // ============================================================================

  revisionsPendingHeaderData: HeaderData = {
    primaryHeading: "Revisions Pending",
    secondaryHeading: "Artifacts returned to users and resubmitted for review"
  };

  revisionsPendingCards: ReviewCardData[] = [
    {
      text: 'User Authentication Flow',
      topTag: {
        label: 'For Revision',
        color: 'custom',
        bg: '#FEF3C7',
        textColor: '#D97706',
        iconName: 'user',
        iconColor: '#D97706'
      },
      description: '"Security vulnerabilities in password"',
      byText: 'By: Sarah Mitchell • 4 days ago'
    },
    {
      text: 'Payment Integration API',
      topTag: {
        label: 'Resubmitted',
        color: 'custom',
        bg: '#E0E7FF',
        textColor: '#3730A3',
        iconName: 'user',
        iconColor: '#3730A3'
      },
      description: '"Missing error handling for declined payments"',
      byText: 'By: Sarah Mitchell • 2hrs ago'
    }
  ];

  revisionsPendingFooterData: FooterData = {
    buttonText: "View All Pending"
  };

  // Resume Drafts
  resumeDraftsHeaderData: HeaderData = {
    primaryHeading: "Resume Drafts",
    secondaryHeading: "Continue Unfinished tasks"
  };

  resumeDraftsCards: SummaryCardData[] = [
    {
      title: 'AI Content Generator',
      subtitle: '2 hours ago',
      tag: {
        label: 'Pipeline',
        color: 'custom',
        bg: '#EBF8FF',
        textColor: '#2563EB'
      }
    },
    {
      title: 'Smart Email Assistant',
      subtitle: '1 day ago',
      tag: {
        label: 'Agent',
        color: 'custom',
        bg: '#F0F9FF',
        textColor: '#0EA5E9'
      }
    }
  ];

  resumeDraftsFooterData: FooterData = {
    buttonText: "View All Draft"
  };

  // Manage User
  manageUserHeaderData: HeaderData = {
    primaryHeading: "Manage User",
    secondaryHeading: "Add, edit, assign permissions",
    numberText: {
      number: "2279",
      text: "Total Users",
      numberColor: "#10B981"
    }
  };

  manageUserCards: RequestCardData[] = [
    {
      name: 'Jennifer Walsh',
      department: 'Marketing • 2 hours ago',
      buttons: [
        {
          label: 'Approve',
          variant: 'secondary',
          action: 'approve'
        },
        {
          label: 'Reject',
          variant: 'secondary',
          color: '#6B7280',
          action: 'reject'
        }
      ]
    },
    {
      name: 'Robert Chen',
      department: 'Engineering • 1d ago',
      buttons: [
        {
          label: 'Approve',
          variant: 'secondary',
          action: 'approve'
        },
        {
          label: 'Reject',
          variant: 'secondary',
          color: '#6B7280',
          action: 'reject'
        }
      ]
    }
  ];

  manageUserFooterData: FooterData = {
    buttonText: "Check All Users"
  };

  // ============================================================================
  // CARD 6: SECURITY ALERTS - Review Cards for Failed Login and Unusual Activity
  // ============================================================================

  securityAlertsHeaderData: HeaderData = {
    primaryHeading: "Security Alerts",
    secondaryHeading: "System Security Status"
  };

  securityAlertsCards: ReviewCardData[] = [
    {
      text: 'Failed Login',
      topTag: {
        label: 'High Risk',
        color: 'custom',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      },
      description: 'Multiple failed login attempts',
      target: 'Target: admin@company.com',
      variant: 'security'
    },
    {
      text: 'Unusual Activity',
      topTag: {
        label: 'Medium Risk',
        color: 'custom',
        variant: 'filled',
        bg: '#FEF3C7',
        textColor: '#D97706'
      },
      description: 'Off-hours API access detected',
      target: 'Target: Data Pipeline API',
      variant: 'security'
    }
  ];

  securityAlertsFooterData: FooterData = {
    buttonText: "View All Pending"
  };

  // Featured Marketplace
  featuredMarketplaceHeaderData: HeaderData = {
    primaryHeading: "Featured Marketplace",
    secondaryHeading: "User Engagement by Realm"
  };

  featuredMarketplaceCards: SummaryCardData[] = [
    {
      title: 'Universal Data Connector',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'New',
        color: 'custom',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'Universal Data Connector',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'Universal Data Connector',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    }
  ];

  featuredMarketplaceFooterData: FooterData = {
    buttonText: "View Detailed Metrics"
  };

  // Audit Trail
  auditTrailHeaderData: HeaderData = {
    primaryHeading: "Audit Trail",
    secondaryHeading: "Recent Governance Events"
  };

  auditTrailCards: ExecutionCardData[] = [
    {
      title: 'Admin role granted to...',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'Medium',
        color: 'medium',
        variant: 'filled',
        bg: '#FEF3C7',
        textColor: '#D97706'
      }
    },
    {
      title: 'Deleted \'Legacy Pipelin...',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'High',
        color: 'high',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      }
    },
    {
      title: 'User moved from Sales t...',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'Low',
        color: 'low',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      }
    }
  ];

  auditTrailFooterData: FooterData = {
    buttonText: "View All Pending"
  };

  // My Creations
  myCreationsHeaderData: HeaderData = {
    primaryHeading: "My Creations",
    secondaryHeading: "Continue Unfinished tasks"
  };

  myCreationsCards: SummaryCardData[] = [
    {
      title: 'Smart Email Responder',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Active',
        color: 'custom',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'Data Cleansing Workflow',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Popular',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'FAQ Bot Assistant',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Popular',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    }
  ];

  myCreationsFooterData: FooterData = {
    buttonText: "See all in My Accounts"
  };

  // ============================================================================
  // CARD 10: ONGOING PIPELINES EXECUTION - Execution Cards for pipeline monitoring
  // ============================================================================

  ongoingPipelinesHeaderData: HeaderData = {
    primaryHeading: "Ongoing Pipelines Execution",
    secondaryHeading: "Pipeline Monitoring"
  };

  ongoingPipelinesCards: ExecutionCardData[] = [
    {
      title: 'Daily Data Sync',
      subtitle: 'By Sarah Mitchell • 4 days ago',
      status: {
        label: 'Running',
        color: 'running',
        variant: 'filled',
        bg: '#EBF8FF',
        textColor: '#2563EB'
      }
    },
    {
      title: 'Customer Analytics',
      subtitle: 'By Sarah Mitchell • 4 days ago',
      status: {
        label: 'Completed',
        color: 'completed',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      }
    },
    {
      title: 'Email Processing',
      subtitle: 'By Sarah Mitchell • 4 days ago',
      status: {
        label: 'Failed',
        color: 'failed',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      }
    }
  ];

  ongoingPipelinesFooterData: FooterData = {
    buttonText: "Go to Marketplace"
  };

  // Resume Drafts (Launchpad)
  resumeDraftsLaunchpadHeaderData: HeaderData = {
    primaryHeading: "Resume Drafts",
    secondaryHeading: "Continue Unfinished tasks"
  };

  resumeDraftsLaunchpadCards: SummaryCardData[] = [
    {
      title: 'AI Content Generator',
      subtitle: '2hrs ago',
      tag: {
        label: 'Pipeline',
        color: 'custom',
        variant: 'filled',
        bg: '#EBF8FF',
        textColor: '#2563EB'
      }
    },
    {
      title: 'Smart Email Assistant',
      subtitle: '1 day ago',
      tag: {
        label: 'Agent',
        color: 'custom',
        variant: 'filled',
        bg: '#F0F9FF',
        textColor: '#0EA5E9'
      }
    }
  ];

  resumeDraftsLaunchpadFooterData: FooterData = {
    buttonText: "View All Drafts"
  };

  // Ongoing Pipelines Execution (Launchpad)
  ongoingPipelinesLaunchpadHeaderData: HeaderData = {
    primaryHeading: "Ongoing Pipelines Execution",
    secondaryHeading: "Pipeline Monitoring"
  };

  ongoingPipelinesLaunchpadCards: ExecutionCardData[] = [
    {
      title: 'Daily Data Sync',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'Running',
        color: 'running',
        variant: 'filled',
        bg: '#EBF8FF',
        textColor: '#2563EB'
      }
    },
    {
      title: 'Customer Analytics',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'Completed',
        color: 'completed',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      }
    },
    {
      title: 'Email Processing',
      subtitle: 'By: Sarah Mitchell • 4 days ago',
      status: {
        label: 'Failed',
        color: 'failed',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      }
    }
  ];

  ongoingPipelinesLaunchpadFooterData: FooterData = {
    buttonText: "Go to Marketplace"
  };

  // ============================================================================
  // CARD 13: MY LIST - Execution Cards for personal collections
  // ============================================================================

  myListHeaderData: HeaderData = {
    primaryHeading: "My List",
    secondaryHeading: "Manage personal collections"
  };

  myListCards: ExecutionCardData[] = [
    {
      title: 'AI Assistant v2.1',
      status: {
        label: 'Pipeline',
        color: 'custom',
        variant: 'filled',
        bg: '#EBF8FF',
        textColor: '#2563EB'
      },
      author: 'Last Used: 2hrs Ago'
    },
    {
      title: 'Bug Reports- Critical',
      status: {
        label: 'Agent',
        color: 'custom',
        variant: 'filled',
        bg: '#F0F9FF',
        textColor: '#0EA5E9'
      },
      author: 'Last Used: 2hrs Ago'
    }
  ];

  myListFooterData: FooterData = {
    buttonText: "View All Drafts "
  };

  // Open Studio
  openStudioHeaderData: HeaderData = {
    primaryHeading: "Open Studio",
    secondaryHeading: "Studio environments"
  };

  openStudioCards: ExecutionCardData[] = [
    {
      icon: {
        name: 'url:assets/launchpad/yellow.svg',
        size: 8
      },
      title: 'Product Studio',
      author: 'Assigned to Realm'
    },
    {
      icon: {
        name: 'url:assets/launchpad/green.svg',
        size: 8
      },
      title: 'Experience Studio',
      author: 'Last Used: 2hrs'
    }
  ];

  openStudioFooterData: FooterData = {
    buttonText: "Open All Studio "
  };

  // Revisions Work
  revisionsWorkHeaderData: HeaderData = {
    primaryHeading: "Revisions Work",
    secondaryHeading: "Artifacts returned to admin requiring attention and rework"
  };

  revisionsWorkCards: ReviewCardData[] = [
    {
      icon: {
        name: 'alert-circle',
        size: 24,
        color: '#DC2626'
      },
      text: 'User Registration Component',
      topTag: {
        label: 'High',
        color: 'custom',
        variant: 'filled',
        bg: '#FEE2E2',
        textColor: '#DC2626'
      },
      description: '"Missing input validation and accessibility attributes"',
      byText: 'By: Sarah Mitchell • 4 days ago'
    },
    {
      icon: {
        name: 'check-circle',
        size: 24,
        color: '#10B981'
      },
      text: 'API Authentication Module',
      topTag: {
        label: 'Low',
        color: 'custom',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      },
      description: '"Security concerns with token storage implementation"',
      byText: 'By: Sarah Mitchell • 2hrs ago'
    }
  ];

  revisionsWorkFooterData: FooterData = {
    buttonText: "View All Revision "
  };

  // ============================================================================
  // CARD 16: NEW IN MARKETPLACE - Summary Cards with image on the right
  // ============================================================================

  newInMarketplaceHeaderData: HeaderData = {
    primaryHeading: "New in Marketplace",
    secondaryHeading: "Trending & newly approved",
    // buttons: [
    //   {
    //     label: "View All",
    //     variant: "tertiary"
    //   }
    // ]
  };

  newInMarketplaceCards: SummaryCardData[] = [
    {
      title: 'GPT-4 Code Helper',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'New',
        color: 'custom',
        variant: 'filled',
        bg: '#FCE7F3',
        textColor: '#EC4899'
      }
    },
    {
      title: 'Image Generation Pro',
      subtitle: 'Newly approved',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    },
    {
      title: 'Language Translator',
      subtitle: '95% approval rating',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    }
  ];

  // My Creations (Launchpad)
  myCreationsLaunchpadHeaderData: HeaderData = {
    primaryHeading: "My Creations",
    secondaryHeading: "Continue Unfinished tasks"
  };

  myCreationsLaunchpadCards: SummaryCardData[] = [
    {
      title: 'Smart Email Responder',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Active',
        color: 'custom',
        variant: 'filled',
        bg: '#DCFCE7',
        textColor: '#16A34A'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'Data Cleansing Workflow',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Popular',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    },
    {
      title: 'FAQ Bot Assistant',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Popular',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      },
      rating: {
        value: '4.8',
        icon: {
          name: 'star',
          color: '#F59E0B'
        }
      }
    }
  ];

  myCreationsLaunchpadFooterData: FooterData = {
    buttonText: "See all in My Accounts"
  };

  // ============================================================================
  // CARD 18: FOR YOU (LAUNCHPAD) - Summary Cards with personalized picks
  // ============================================================================

  forYouLaunchpadHeaderData: HeaderData = {
    primaryHeading: "For You",
    secondaryHeading: "Personalised picks"
  };

  forYouLaunchpadCards: SummaryCardData[] = [
    {
      title: 'Creative Writing Assistant',
      subtitle: 'Matches your content style',
      tag: {
        label: 'New',
        color: 'custom',
        variant: 'filled',
        bg: '#FCE7F3',
        textColor: '#EC4899'
      }
    },
    {
      title: 'API Integration Helper',
      subtitle: 'For your dev workflows',
      tag: {
        label: 'Recommended',
        color: 'custom',
        variant: 'filled',
        bg: '#CFFAFE',
        textColor: '#0891B2'
      }
    },
    {
      title: 'Advanced Analytics Suite',
      subtitle: 'Based on your data projects',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    }
  ];

  forYouLaunchpadFooterData: FooterData = {
    buttonText: "Open All Studio"
  };

  // Trending Now
  trendingNowHeaderData: HeaderData = {
    primaryHeading: "Trending Now",
    secondaryHeading: "Trending & newly approved"
  };

  trendingNowCards: SummaryCardData[] = [
    {
      title: 'GPT-4 Code Helper',
      subtitle: '2.4k downloads this week',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    },
    {
      title: 'Image Generation Pro',
      subtitle: 'Newly approved',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    },
    {
      title: 'Language Translator',
      subtitle: '95% approval rating',
      tag: {
        label: 'Trending',
        color: 'custom',
        variant: 'filled',
        bg: '#F3E8FF',
        textColor: '#8B5CF6'
      }
    }
  ];

  trendingNowFooterData: FooterData = {
    buttonText: "Check all trending"
  };

  // My Workspace (Launchpad)
  myWorkspaceLaunchpadHeaderData: HeaderData = {
    primaryHeading: "My Workspace",
    secondaryHeading: "Recently used Workspaces"
  };

  myWorkspaceLaunchpadCards: SummaryCardData[] = [
    {
      title: 'Creative Writing Assistant',
      subtitle: 'Matches your content style'
    },
    {
      title: 'API Integration Helper',
      subtitle: 'For your dev workflows'
    },
    {
      title: 'Advanced Analytics Suite',
      subtitle: 'Based on your data projects'
    }
  ];

  myWorkspaceLaunchpadFooterData: FooterData = {
    buttonText: "View All List"
  };

  // Learn & Get Help

  learnAndGetHelpHeaderData: HeaderData = {
    primaryHeading: "Learn & Get Help",
    secondaryHeading: "Learn & Get Help"
  };

  learnAndGetHelpCards: any[] = [
    {
      icon: {
        name: 'book-open',
        color: '#6366F1'
      },
      title: 'Getting Started Guide'
    },
    {
      icon: {
        name: 'book-open',
        color: '#8B5CF6'
      },
      title: 'Video Tutorials'
    },
    {
      icon: {
        name: 'message-circle',
        color: '#EC4899'
      },
      title: 'Community Support'
    }
  ];

  // Create New Artifacts card

  // Event Handlers

  onTabChange(tab: TabItem): void {
    alert(`Tab clicked: ${tab.label} (ID: ${tab.id})`);
  }

  onFooterButtonClick(cardName: string): void {
    alert(`Footer button clicked on ${cardName} card`);
  }

  onHeaderButtonClick(event: { button: any; action?: string }): void {
    alert(`Header button clicked: ${event.button.label}`);
  }

  onUserButtonClick(event: { action: string, user: RequestCardData }): void {
    console.log('User action:', event.action, 'for user:', event.user.name);
  }

  onRequestButtonClick(event: { action: string, request: RequestCardData }): void {
    console.log('Request action:', event.action, 'for request:', event.request.name);
  }

  // Create New Artifacts card
  createNewArtifactsCard: ActionCardData = {
    icon: {
      name: 'plus',
      size: 24,
      color: '#9661F1'
    },
    title: 'Create New Artifacts',
    styling: {
      textColor: '#9661F1',
      backgroundColor: '#F5E9F7',
      borderColor: '#D6C2F9'
    },
    iconBackground: {
      color: 'rgba(255, 255, 255, 0.80)',
      borderColor: '#D6C2F9'
    },
    action: 'create_artifacts',
    cardStyles: {
      'height': '350px',
      'width': '100%'
    }
  };

  // Welcome Card
  welcomeCardData: WelcomeCardData = {
    greetingText: 'Welcome, Goutam',
    greetingEmoji: '👋',
    subtitle: 'I\'ve organized your agents, pipelines, and approvals',
    heroImage: 'assets/robot00.svg',
    backgroundImage: 'assets/lines.svg'
  };

  // Profile Card
  profileCardData: ProfileCardData = {
    avatarUrl: 'assets/1.svg',
    title: 'Goutam. P',
    subtitle: 'Senior Engineer • Engineering • Admin',
    menuIcon: 'ellipsis-vertical',
    stats: [
      {
        icon: 'briefcase',
        iconColor: '#8B5CF6',
        iconBackgroundColor: '#F3E8FF',
        value: '12',
        label: 'Agents'
      },
      {
        icon: 'git-branch',
        iconColor: '#3B82F6',
        iconBackgroundColor: '#DBEAFE',
        value: '8',
        label: 'Pipelines'
      },
      {
        icon: 'clock',
        iconColor: '#F59E0B',
        iconBackgroundColor: '#FEF3C7',
        value: '2',
        label: 'Pending'
      }
    ]
  };
}
