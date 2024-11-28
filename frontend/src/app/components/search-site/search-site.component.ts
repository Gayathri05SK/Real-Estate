import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-site',
  templateUrl: './search-site.component.html',
  styleUrls: ['./search-site.component.css']
})
export class SearchSiteComponent implements OnInit {
  listings: any[] = []; // Array to hold the fetched listings
  filteredListings: any[] = []; // Array for filtered listings
  selectedListing: any = null; // Selected listing for detailed view

  searchLocation: string = ''; // Holds the search location input
  searchPurpose: string = ''; // Holds the search purpose input
  searchPropertyType: string = ''; // Holds the search property type input

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchListings(); // Fetch listings when the component is initialized
  }

  // Fetch all listings from backend
  fetchListings() {
    this.http.get('http://localhost:5003/api/listings')
      .subscribe((data: any) => {
        this.listings = data; // Store the fetched listings
        this.filteredListings = data; // Initially, all listings are shown
      }, error => {
        console.error('Error fetching listings:', error);
      });
  }

  // Filter listings based on location, purpose, and property type
  filterListings() {
    this.filteredListings = this.listings.filter(listing => {
      const matchesLocation = this.searchLocation ? listing.city.toLowerCase().includes(this.searchLocation.toLowerCase()) : true;
      const matchesPurpose = this.searchPurpose ? listing.purpose === this.searchPurpose : true;
      const matchesPropertyType = this.searchPropertyType ? listing.propertyType === this.searchPropertyType : true;
      return matchesLocation && matchesPurpose && matchesPropertyType;
    });
  }

  // Set selected listing for detailed view
  showDetails(listing: any) {
    this.selectedListing = listing;
  }
}
