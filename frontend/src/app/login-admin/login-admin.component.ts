import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Listing {
  _id: string;
  title: string;
  size: number; // Size in square feet
  price: number;
}

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  listings: Listing[] = []; // Store all listings
  message: string = ''; // To display success/error messages
  email: string = ''; // Login email
  password: string = ''; // Login password
  isLoggedIn: boolean = false; // Login status
  listingsLoaded: boolean = false; // Track if listings are loaded

  private validEmail: string = 'rvaisaali677@gmail.com';
  private validPassword: string = 'vaisaali@18';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initially do nothing; listings will load after login
  }

  // Login method
  login(): void {
    if (this.email === this.validEmail && this.password === this.validPassword) {
      this.isLoggedIn = true; // Set login status to true if credentials match
      this.message = 'Login successful!';
      this.fetchListings(); // Fetch listings after successful login
    } else {
      this.message = 'Invalid email or password. Please try again.'; // Show error if credentials are incorrect
      this.isLoggedIn = false;
    }
  }

  // Fetch all listings from the backend (only when logged in)
  fetchListings(): void {
    this.http.get<Listing[]>('http://localhost:5003/api/listings')
      .subscribe(
        data => {
          this.listings = data; // Store the fetched listings
          this.listingsLoaded = true; // Mark listings as loaded
        },
        error => {
          this.message = error.error?.message || 'Failed to fetch listings.'; // Handle any errors
          this.listingsLoaded = true; // Mark as loaded even on error
        }
      );
  }

  // Delete a listing by ID
  deleteListing(id: string): void {
     
    const apiUrl = `http://localhost:5003/api/listings/${id}`;
    
    if (confirm('Are you sure you want to delete this listing?')) {
      this.http.delete<{ message: string }>(apiUrl)
        .subscribe(
          response => {
            this.message = response.message; // Display success message
            this.listings = this.listings.filter(listing => listing._id !== id); // Remove the deleted listing from the local list
          },
          error => {
            console.error('Error deleting listing:', error); // Log the error to the console
            this.message = error.error?.message || 'Failed to delete listing.'; // Handle any errors
          }
        );
    }
  }

  // Track listings by their unique ID for performance
  trackByListingId(index: number, listing: Listing): string {
    return listing._id;
  }
}
