# Nested Table Demo Component

## Overview
This component demonstrates how to create a table inside another table using the existing `@ava/play-core` table component. Both the main table and nested table use the `aava-table` component for consistency and reusability. It shows a financial ledger with expandable rows that reveal detailed transaction information.

## Features
- **Main Table**: Uses `aava-table` component to show account summary information
- **Nested Table**: Uses `aava-table` component to display transaction details when rows are expanded
- **Expandable Rows**: Click the action icon to expand/collapse transaction details
- **Reusable Components**: Both tables use the same `aava-table` component for consistency
- **Dynamic Data**: Shows real financial ledger data
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme Support**: Automatically adapts to user's system preference

## Usage

### 1. Navigate to the Demo
- Go to `/nested-table-demo` in the playground
- Or click on "Nested Table" in the navigation menu

### 2. Interact with the Table
- **Expand Row**: Click the expand icon in the Actions column
- **Collapse Row**: Click the collapse icon in the Actions column
- **View Transactions**: Expanded rows show detailed transaction information
- **Summary Row**: Each expanded section shows totals for credits, debits, and net amount

### 3. Sample Data Structure
The component uses realistic financial data:
- **Cash Account**: Shows 5 transactions with varying amounts
- **Accounts Payable**: Liabilities account (collapsed by default)
- **Subscription Revenue**: Revenue account (collapsed by default)
- **Advertising Revenue**: Revenue account (collapsed by default)

## Technical Implementation

### Component Structure
```
NestedTableDemoComponent
├── Main Table (using aava-table component)
│   ├── Account Details
│   ├── Category
│   ├── Opening Balance
│   ├── Debit
│   ├── Credit
│   ├── Balance
│   └── Actions (expand/collapse icons)
└── Nested Table (using aava-table component)
    ├── Reference
    ├── Date
    ├── Transaction Type
    ├── Credit
    ├── Debit
    └── Amount
```

### Key Methods
- `getMainTableData()`: Converts account data to format suitable for aava-table component
- `toggleExpansion(account)`: Expands/collapses account rows
- `handleAction(action, row)`: Handles action clicks from the aava-table component
- `formatCurrency(value)`: Formats numbers as currency with proper formatting
- `getTotalCredits(transactions)`: Calculates total credits for a set of transactions
- `getTotalDebits(transactions)`: Calculates total debits for a set of transactions
- `getNetAmount(transactions)`: Calculates net amount for a set of transactions

### Data Flow
1. **Account Data**: Original account data with transactions
2. **Main Table Data**: Transformed data for the aava-table component
3. **Action Handling**: Click events from the table trigger row expansion
4. **Nested Display**: Expanded rows show nested aava-table with transaction details

### Styling Features
- **Consistent Design**: Both tables use the same component for visual consistency
- **Expandable Sections**: Visual feedback for expanded vs collapsed states
- **Responsive Layout**: Adapts to mobile and desktop screens
- **Accessibility**: Proper contrast and interactive elements

## Customization

### Adding New Account Types
1. Add new data to the `accountData` array
2. Include transaction data if needed
3. Set `isExpanded` property as desired
4. The `getMainTableData()` method will automatically handle the transformation

### Modifying Table Columns
1. Update `mainTableColumns` for the main table
2. Update `transactionColumns` for the nested table
3. Both use the same `TableColumn` interface for consistency
4. Adjust the HTML template accordingly

### Styling Changes
- Modify the SCSS file to change colors, spacing, and layout
- Add new CSS classes for custom styling
- Update responsive breakpoints as needed
- The aava-table component handles its own internal styling

## Browser Compatibility
- **Modern Browsers**: Full support for all features
- **Mobile Devices**: Responsive design with touch-friendly interactions
- **Accessibility**: Screen reader compatible with proper ARIA attributes

## Performance Considerations
- **Lazy Loading**: Transaction data is only rendered when rows are expanded
- **Efficient Rendering**: Uses Angular's change detection for optimal performance
- **Memory Management**: Collapsed rows don't consume unnecessary resources
- **Component Reuse**: Both tables use the same optimized aava-table component

## Future Enhancements
- **Sorting**: Add column sorting functionality to both tables
- **Filtering**: Implement row filtering capabilities
- **Pagination**: Add pagination for large datasets
- **Export**: Include data export options (CSV, PDF)
- **Real-time Updates**: Integrate with live data sources
- **Advanced Interactions**: Add drag-and-drop for reordering rows
