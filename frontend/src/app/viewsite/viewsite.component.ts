import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewsite',
  templateUrl: './viewsite.component.html',
  styleUrls: ['./viewsite.component.css']
})
export class ViewsiteComponent implements OnInit {
  listings: any[] = []; // Holds the listings from backend
  selectedListing: any = null; // Holds the selected listing for detailed view

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchListings();
  }

  fetchListings() {
    this.http.get('http://localhost:5003/api/listings')
      .subscribe((data: any) => {
        this.listings = data; // Store fetched listings
      }, error => {
        console.error('Error fetching listings:', error);
      });
  }

  // Set selected listing for detailed view
  showDetails(listing: any) {
    this.selectedListing = listing;
  }
}
