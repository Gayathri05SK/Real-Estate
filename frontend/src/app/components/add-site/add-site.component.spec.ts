import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteComponent } from './add-site.component';

describe('AddSiteComponent', () => {
  let component: AddSiteComponent;
  let fixture: ComponentFixture<AddSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
