/*
 * Public API Surface of play-core
 */

// src/public-api.ts

export * from './lib/components/button/aava-button.component';
export * from './lib/components/icon/aava-icon.component';
export * from './lib/components/checkbox/aava-checkbox.component';
export * from './lib/components/toggle/aava-toggle.component';
export type {
  ToggleSize,
  TogglePosition,
} from './lib/components/toggle/aava-toggle.component';
export * from './lib/components/flyout/aava-flyout.component';
export type { FlyoutAlignment } from './lib/components/flyout/aava-flyout.component';

export * from './lib/components/pagination-controls/aava-pagination-controls.component';
export * from './lib/components/accordion/aava-accordion.component';
export * from './lib/components/textbox/aava-textbox.component';
export * from './lib/components/textarea/aava-textarea.component';
export * from './lib/components/avatars/aava-avatars.component';
export * from './lib/components/badges/aava-badges.component';
export * from './lib/components/spinner/aava-spinner.component';
export * from './lib/components/progressbar/aava-progressbar.component';
export * from './lib/components/card/aava-card.component';
export * from './lib/components/card/card-header/aava-card-header.component';
export * from './lib/components/card/card-content/aava-card-content.component';
export * from './lib/components/card/card-footer/aava-card-footer.component';
export * from './lib/components/card/product-card/aava-product-card.component';
export * from './lib/components/card/default-card/aava-default-card.component';
export * from './lib/components/link/aava-link.component';
export * from './lib/composite-components/approval-card/aava-approval-card.component';
export * from './lib/components/badges/aava-badges.component';
export * from './lib/components/breadcrumbs/aava-breadcrumbs.component';
export * from './lib/composite-components/image-card/aava-image-card.component';
export * from './lib/composite-components/text-card/aava-text-card.component';
export * from './lib/composite-components/txt-card/aava-txt-card.component';
export * from './lib/components/avatars/aava-avatars.component';
export * from './lib/components/sidebar/aava-sidebar.component';
export * from './lib/components/slider/aava-slider.component';
export * from './lib/components/fileupload/aava-fileupload.component';
export * from './lib/components/chat-bubble/aava-chat-bubble.component';
export * from './lib/components/datepicker/aava-datepicker.component';
export type { SupportedDateFormat } from './lib/components/datepicker/aava-datepicker.component';
export * from './lib/components/time-picker/aava-time-picker.component';
export * from './lib/composite-components/date-time-picker/aava-date-time-picker.component';
export * from './lib/components/file-attach-pill/aava-file-attach-pill.component';

export * from './lib/components/snackbar/snackbar.service';
export * from './lib/components/dialog/aava-dialog-service';
export type { DialogPosition } from './lib/components/dialog/aava-dialog-service';
export * from './lib/components/dialog/modal/aava-modal.component';
export * from './lib/components/dialog/dialog-container/aava-dialog-container.component';
export * from './lib/components/dialog/success/aava-success.component';
export * from './lib/components/dialog/error/aava-error.component';
export * from './lib/components/dialog/warning/aava-warning.component';
export * from './lib/components/dialog/info/aava-info.component';
export * from './lib/components/dialog/confirmation/aava-confirmation.component';
export * from './lib/components/dialog/loading/aava-loading.component';
export * from './lib/components/dialog/custom/aava-custom.component';
export * from './lib/components/dialog/feedback/aava-feedback.component';
export type { SuccessButton } from './lib/components/dialog/success/aava-success.component';
export * from './lib/components/snackbar/aava-snackbar.component';

// Toast Components
export * from './lib/components/toast/aava-toast.service';
export * from './lib/components/toast/toast-container/aava-toast-container.component';
export * from './lib/components/toast/success/aava-success.component';
export * from './lib/components/toast/error/aava-error.component';
export * from './lib/components/toast/warning/aava-warning.component';
export * from './lib/components/toast/info/aava-info.component';
export * from './lib/components/toast/default/aava-default.component';
export * from './lib/components/toast/custom/aava-custom.component';
export * from './lib/components/stepper/aava-stepper.component';
export * from './lib/components/tabs/aava-tabs.component';
export * from './lib/components/list/aava-list-items/aava-list-items.component';

export type {
  TabItem,
  TabVariant,
  TabSize,
} from './lib/components/tabs/aava-tabs.component';
export * from './lib/composite-components/carousel/aava-carousel.component';
export * from './lib/components/tags/aava-tags.component';
export * from './lib/components/list/aava-list.component';
export * from './lib/components/tags/aava-tags.component';
export * from './lib/components/list/aava-list.component';
export * from './lib/components/radio-button/aava-radio-button.component';
export * from './lib/composite-components/custom-sidebar/aava-custom-sidebar.component';
export * from './lib/composite-components/filter/aava-filter.component';
export type {
  AavaFilterOption,
  AavaFilterGroup,
  SelectionType,
} from './lib/composite-components/filter/aava-filter.component';

export * from './lib/composite-components/dashboard-widget-grid/aava-dashboard-widget-grid.component';
export * from './lib/composite-components/user-profile-card/aava-user-profile-card.component';
export * from './lib/composite-components/login/aava-login.component';
export * from './lib/composite-components/rating-card/aava-rating-card.component';
export * from './lib/composite-components/chat-window/aava-chat-window.component';
export * from './lib/components/tooltip/aava-tooltip.component';
export * from './lib/directives/aava-tooltip.directive';
export * from './lib/directives/badge.directive';
export * from './lib/components/pop-over/aava-pop-over.component';
export * from './lib/directives/aava-popover.directive';
export type {
  PopOverData,
  PopOverConfig,
} from './lib/components/pop-over/aava-pop-over.component';
export * from './lib/components/ava-option/aava-option.component';
export * from './lib/composite-components/textarea-counter/aava-textarea-counter.component';
export * from './lib/composite-components/search-bar/aava-search-bar.component';
export type { SearchSuggestion } from './lib/composite-components/search-bar/aava-search-bar.component';
export * from './lib/composite-components/flip-card/aava-flip-card.component';
export * from './lib/components/menu/aava-menu.component';
export * from './lib/components/otp/aava-otp.component';
export type {
  MenuItem,
  MenuPosition,
  MenuAlignment,
  MenuItemDisplayOptions,
  MenuPositionConfig,
} from './lib/components/menu/aava-menu.component';
export * from './lib/composite-components/nav-bar/aava-nav-bar.component';
export type { NavBarContainerStyles } from './lib/composite-components/nav-bar/aava-nav-bar.component';

export * from './lib/composite-components/footer/aava-footer.component';
export * from './lib/components/footer/footer-centre/aava-footer-centre.component';
export * from './lib/components/footer/footer-left/aava-footer-left.component';
export * from './lib/components/footer/footer-right/aava-footer-right.component';
export * from './lib/composite-components/sso-login/aava-sso-login.component';
export * from './lib/components/autocomplete';
export * from './lib/components/select/aava-select.component';
export * from './lib/components/select/select-option/aava-select-option.component';
export * from './lib/components/select-flyout/aava-select-flyout.component';
export * from './lib/components/dividers/aava-dividers.component';
export * from './lib/components/drawer/aava-drawer.component';
export * from './lib/components/skeleton/aava-skeleton.component';
export * from './lib/composite-components/list-card/aava-list-card.component';

export type { SelectboxSize } from './lib/components/select/aava-select.component';
export type {
  DrawerPosition,
  DrawerSize,
} from './lib/components/drawer/aava-drawer.component';
export type {
  ChatMessage,
  ChatWindowIcon,
} from './lib/composite-components/chat-window/aava-chat-window.component';


// Console Dashboard Components
export * from './lib/studios/cards/stats-card/stats-card.component';
export type { StatsCardData } from './lib/studios/cards/stats-card/stats-card.component';
export * from './lib/studios/cards/submission-card/submission-card.component';
export type {
  SubmissionCardData,
  SubmissionCardIcon,
  SubmissionCardTag,
  SubmissionCardAvatar
} from './lib/studios/cards/submission-card/submission-card.component';
export * from './lib/studios/cards/review-card/review-card.component';
export type {
  ReviewCardData,
  ReviewCardTag,
} from './lib/studios/cards/review-card/review-card.component';
export * from './lib/studios/cards/summary-card/summary-card.component';
export type {
  SummaryCardData,
  SummaryCardIcon,
  SummaryCardTag
} from './lib/studios/cards/summary-card/summary-card.component';
export * from './lib/studios/cards/request-card/request-card.component';
export type { RequestCardData } from './lib/studios/cards/request-card/request-card.component';
export * from './lib/studios/cards/execution-card/execution-card.component';
export type { ExecutionCardData } from './lib/studios/cards/execution-card/execution-card.component';
export * from './lib/studios/cards/action-card/action-card.component';
export type {
  ActionCardData,
  ActionCardIcon,
  ActionCardIconBackground,
  ActionCardStyling
} from './lib/studios/cards/action-card/action-card.component';
export * from './lib/studios/cards/welcome-card/welcome-card.component';
export type { WelcomeCardData } from './lib/studios/cards/welcome-card/welcome-card.component';
export * from './lib/studios/cards/profile-card/profile-card.component';
export type { ProfileCardData, ProfileCardStatItem } from './lib/studios/cards/profile-card/profile-card.component';

// Studio Card Header and Footer Components
export * from './lib/studios/cards/header/header.component';
export type {
  HeaderData,
  HeaderButton
} from './lib/studios/cards/header/header.component';
export * from './lib/studios/cards/footer/footer.component';
export type { FooterData } from './lib/studios/cards/footer/footer.component';


// Services
export * from './lib/services/theme.service';
export * from './lib/services/portal.service';


// Loader Components
export * from './lib/components/loader/aava-loader.component';
export * from './lib/composite-components/cubical-loading/aava-cubical-loading.component';
export type { TreeNode } from './lib/components/trees/aava-trees.component';
export * from './lib/components/trees/aava-trees.component';
export * from './lib/components/rating/aava-rating.component';
export * from './lib/components/header/aava-header.component';
export * from './lib/components/layout/aava-layout.component';
export * from './lib/components/layout/layout-demo.component';
export * from './lib/components/timeline/aava-timeline.component';
export * from './lib/components/banner/aava-banner.component';
export * from './lib/components/chat-bubble/aava-chat-bubble.component';

//prompt Bar
export type {
  PromptIcons,
  PromptBarTag,
} from './lib/composite-components/prompt-bar/aava-prompt-bar.component';
export * from './lib/composite-components/prompt-bar/aava-prompt-bar.component';

//Table Components
export * from './lib/components/user-table/aava-user-table.component';
export type {

  ColumnConfig,
  ActionConfig,
  ExpandableRow,
  FilterOption,
} from './lib/components/user-table/aava-user-table.component';
export * from './lib/components/treeview/aava-treeview.component';
export * from './lib/composite-components/aava-elderwand-header/aava-elderwand-header.component';
export * from './lib/composite-components/aava-rail-navigation-sidebar/aava-rail-navigation-sidebar.component';
export type { SecondaryAvatarSelectItem } from './lib/composite-components/aava-rail-navigation-sidebar/aava-rail-navigation-sidebar.component';
export * from './lib/composite-components/aava-rail-navigation-sidebar/secondary-avatar-selection-modal/secondary-avatar-selection-modal.component';
export * from './lib/composite-components/aava-navigation-cards/aava-navigation-cards.component';
export * from './lib/composite-components/chat-panel/aava-chat-panel.component';
export type {
  NavigationCardsConfig,
  NavigationCard,
} from './lib/composite-components/aava-navigation-cards/aava-navigation-cards.component';

export * from './lib/components/timeline/aava-timeline.component';
export * from './lib/components/banner/aava-banner.component';
export * from './lib/components/chat-bubble/aava-chat-bubble.component';
export * from './lib/components/chat-bubble/aava-chat-bubble.component';
export * from './lib/composite-components/aava-confetti/aava-confetti.component';
export * from './lib/composite-components/aava-confetti/confetti.directive';
export type {
  ConfettiAnimation,
  ConfettiConfig,
  ConfettiShape,
} from './lib/composite-components/aava-confetti/aava-confetti.component';

// Reset Password Component
export * from './lib/composite-components/reset-password/aava-reset-password.component';
export type {
  PasswordRule,
  PasswordValidationState,
  RuleValidationResult,
} from './lib/composite-components/reset-password/aava-reset-password.component';


export * from './lib/components/table';
export * from './lib/composite-components/views-card/aava-views-card.component';
//need to remove
export * from './lib/components/data-grid/aava-data-grid.component';
export * from './lib/components/data-grid/directive/ava-column-def.directive';
export * from './lib/components/data-grid/directive/ava-cell-def.directive';
export * from './lib/components/data-grid/directive/ava-header-cell-def.directive';
export * from './lib/components/dropdown/aava-dropdown.component';




