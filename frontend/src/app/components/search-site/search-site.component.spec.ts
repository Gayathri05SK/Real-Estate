import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSiteComponent } from './search-site.component';

describe('SearchSiteComponent', () => {
  let component: SearchSiteComponent;
  let fixture: ComponentFixture<SearchSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
