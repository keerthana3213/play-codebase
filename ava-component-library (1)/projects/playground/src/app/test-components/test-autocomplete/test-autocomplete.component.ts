import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AavaAutocompleteComponent, AavaAutocompleteOption } from '../../../../../play-core/src/public-api';

@Component({
    selector: 'app-test-autocomplete',
    standalone: true,
    imports: [CommonModule, AavaAutocompleteComponent],
    templateUrl: './test-autocomplete.component.html',
    styleUrl: './test-autocomplete.component.scss'
})
export class TestAutocompleteComponent {

    // JSON mode options
    fruits: AavaAutocompleteOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
        { label: 'Elderberry', value: 'elderberry' },
        { label: 'Fig', value: 'fig' },
        { label: 'Grape', value: 'grape' },
        { label: 'Honeydew', value: 'honeydew' },
    ];

    // Template mode options (custom data)
    cities = [
        { name: 'New York', country: 'USA', population: '8.3M' },
        { name: 'London', country: 'UK', population: '9.0M' },
        { name: 'Tokyo', country: 'Japan', population: '13.9M' },
        { name: 'Paris', country: 'France', population: '2.1M' },
        { name: 'Sydney', country: 'Australia', population: '5.3M' },
        { name: 'Mumbai', country: 'India', population: '20.7M' },
        { name: 'Berlin', country: 'Germany', population: '3.6M' },
        { name: 'Toronto', country: 'Canada', population: '2.9M' },
    ];

    cars = [
        { model: 'Tesla Model S', brand: 'Tesla', year: 2023, price: '$89,990' },
        { model: 'BMW M4', brand: 'BMW', year: 2024, price: '$78,100' },
        { model: 'Audi RS6', brand: 'Audi', year: 2023, price: '$121,900' },
        { model: 'Porsche 911', brand: 'Porsche', year: 2024, price: '$114,400' },
        { model: 'Mercedes-AMG G63', brand: 'Mercedes', year: 2024, price: '$179,000' },
        { model: 'Ferrari SF90', brand: 'Ferrari', year: 2023, price: '$524,815' },
        { model: 'Lamborghini Revuelto', brand: 'Lamborghini', year: 2024, price: '$608,358' },
        { model: 'Toyota Supra', brand: 'Toyota', year: 2024, price: '$45,540' },
    ];

    selectedFruit = '';
    selectedCity = '';
    selectedCar = '';

    filteredCars = [...this.cars]; 
    hideFlyout = false;

    onOptionSelected(option: AavaAutocompleteOption) {
        this.selectedFruit = option.label;
        console.log('Standard option selected:', option);
    }

    onCitySelected(option: any) {
        this.selectedCity = option.name ?? option.label;
        console.log('City selected:', option);
    }

    onCarSelected(option: any) {
        this.selectedCar = option.model ?? option.label;
        console.log('Car selected:', option);
    }

    filterCities(query: string | string[]) {
        const q = Array.isArray(query) ? query[0] : query;
        if (!q) return this.cities;
        const normalizedQuery = q.toLowerCase();
        return this.cities.filter(c =>
            c.name.toLowerCase().includes(normalizedQuery) ||
            c.country.toLowerCase().includes(normalizedQuery)
        );
    }

    filterCars(query: string | string[]) {
        const q = Array.isArray(query) ? query[0] : query;
        const normalizedQuery = (q || '').toLowerCase();
        this.filteredCars = this.cars.filter(car =>
            car.model.toLowerCase().includes(normalizedQuery) ||
            car.brand.toLowerCase().includes(normalizedQuery)
        );
        this.hideFlyout = this.filteredCars.length === 0;
    }
}
