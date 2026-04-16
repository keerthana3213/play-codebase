import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaSearchBarComponent, SearchSuggestion, AavaIconComponent } from '@aava/play-core';

@Component({
  selector: 'aava-search-bar-suggestions-demo',
  standalone: true,
  imports: [CommonModule, AavaSearchBarComponent, AavaIconComponent],
  templateUrl: './suggestions-demo.component.html',
  styleUrl: './suggestions-demo.component.scss'
})
export class SuggestionsDemoComponent {
  // All available suggestions (master list)
  private allSearchSuggestions: SearchSuggestion[] = [
    { id: 1, label: 'Angular', value: 'angular', icon: 'code' },
    { id: 2, label: 'React', value: 'react', icon: 'code' },
    { id: 3, label: 'Vue', value: 'vue', icon: 'code' },
    { id: 4, label: 'TypeScript', value: 'typescript', icon: 'file-code' },
    { id: 5, label: 'JavaScript', value: 'javascript', icon: 'file-code' },
    { id: 6, label: 'Python', value: 'python', icon: 'code' },
    { id: 7, label: 'Java', value: 'java', icon: 'code' },
    { id: 8, label: 'C++', value: 'cpp', icon: 'code' },
    { id: 9, label: 'Ruby', value: 'ruby', icon: 'code' },
    { id: 10, label: 'Go', value: 'go', icon: 'code' }
  ];

  private allProductSuggestions: SearchSuggestion[] = [
    { id: 1, label: 'Laptop', value: 'laptop', icon: 'laptop' },
    { id: 2, label: 'Smartphone', value: 'smartphone', icon: 'smartphone' },
    { id: 3, label: 'Tablet', value: 'tablet', icon: 'tablet' },
    { id: 4, label: 'Headphones', value: 'headphones', icon: 'headphones' },
    { id: 5, label: 'Monitor', value: 'monitor', icon: 'monitor' },
    { id: 6, label: 'Keyboard', value: 'keyboard', icon: 'keyboard' },
    { id: 7, label: 'Mouse', value: 'mouse', icon: 'keyboard' },
    { id: 8, label: 'Webcam', value: 'webcam', icon: 'keyboard' },
    { id: 9, label: 'Speaker', value: 'speaker', icon: 'volume-2' },
    { id: 10, label: 'Microphone', value: 'microphone', icon: 'mic' }
  ];

  // Filtered suggestions (displayed in the UI)
  searchSuggestions: SearchSuggestion[] = [];
  productSuggestions: SearchSuggestion[] = [];

  // Loading state demo properties
  isLoadingDemo = false;
  loadingSuggestions: SearchSuggestion[] = [];
  private loadingTimeout: any;

  // Master list for loading demo (simulates API data)
  private allLoadingProducts: SearchSuggestion[] = [
    { id: 1, label: 'Laptop', value: 'Laptop', icon: 'laptop' },
    { id: 2, label: 'Smartphone', value: 'Smartphone', icon: 'smartphone' },
    { id: 3, label: 'Tablet', value: 'Tablet', icon: 'tablet' },
    { id: 4, label: 'Headphones', value: 'Headphones', icon: 'headphones' },
    { id: 5, label: 'Monitor', value: 'Monitor', icon: 'monitor' },
    { id: 6, label: 'Keyboard', value: 'Keyboard', icon: 'keyboard' },
    { id: 7, label: 'Mouse', value: 'Mouse', icon: 'keyboard' },
    { id: 8, label: 'Webcam', value: 'Webcam', icon: 'keyboard' }
  ];

  onSearchClick(searchTerm: string) {
    console.log('Search clicked with term:', searchTerm);
  }

  onSearchChange(searchTerm: string) {
    console.log('Search changed:', searchTerm);
    // Filter search suggestions based on input
    this.searchSuggestions = this.filterSuggestions(this.allSearchSuggestions, searchTerm);
  }

  onProductSearchChange(searchTerm: string) {
    console.log('Product search changed:', searchTerm);
    // Filter product suggestions based on input
    this.productSuggestions = this.filterSuggestions(this.allProductSuggestions, searchTerm);
  }

  onLoadingDemoSearchChange(searchTerm: string) {
    console.log('Loading demo search changed:', searchTerm);

    // Clear any existing timeout
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }

    if (searchTerm.trim().length === 0) {
      this.isLoadingDemo = false;
      this.loadingSuggestions = [];
      return;
    }

    // Show loading state
    this.isLoadingDemo = true;
    this.loadingSuggestions = [];

    // Simulate API call with 800ms delay
    this.loadingTimeout = setTimeout(() => {
      this.isLoadingDemo = false;

      // Perform real filtering on the search term
      this.loadingSuggestions = this.filterSuggestions(this.allLoadingProducts, searchTerm);
    }, 800);
  }

  private filterSuggestions(suggestions: SearchSuggestion[], searchTerm: string): SearchSuggestion[] {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return [];
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return suggestions.filter(suggestion =>
      suggestion.label.toLowerCase().includes(lowerSearchTerm)
    );
  }
}

