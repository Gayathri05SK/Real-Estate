import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Media {
  type: string;
  url: string;
}

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit, OnDestroy {
  property = {
    title: '',
    description: '',
    size: null,
    price: null,
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    mapLink: '',
    propertyType: '',
    purpose: '',
    media: [] as Media[]
  };

  contact = {
    contactName: '',
    phone: '',
    email: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Initialize component properties or fetch data if needed
    console.log('AddSiteComponent initialized');
  }

  ngOnDestroy() {
    // Perform any necessary cleanup
    console.log('AddSiteComponent destroyed');
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.property.media = [];
      this.convertFilesToBase64(files);
    }
  }

  convertFilesToBase64(files: FileList) {
    const promises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      promises.push(this.convertFileToBase64(file, 'image'));
    }
    Promise.all(promises).then((base64Images) => {
      this.property.media.push(...base64Images);
    }).catch(error => console.error("Error converting images: ", error));
  }

  convertFileToBase64(file: File, type: string): Promise<Media> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ type, url: reader.result as string });
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      const listingData = {
        ...this.property,
        contact: this.contact
      };

      this.http.post('http://localhost:5003/api/listings', listingData, {
        headers: { 'Content-Type': 'application/json' }
      })
      .subscribe(response => {
        console.log('Listing created:', response);
        alert('Your property has been submitted successfully!');
        this.resetForm(form);
      }, error => {
        console.error('Error creating listing:', error);
        alert('Failed to submit your property. Please try again.');
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  resetForm(form: any) {
    form.reset();
    this.property = {
      title: '',
      description: '',
      size: null,
      price: null,
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      mapLink: '',
      propertyType: '',
      purpose: '',
      media: []
    };
    this.contact = {
      contactName: '',
      phone: '',
      email: ''
    };
  }
}
