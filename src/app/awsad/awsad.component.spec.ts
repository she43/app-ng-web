import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsadComponent } from './awsad.component';

describe('AwsadComponent', () => {
  let component: AwsadComponent;
  let fixture: ComponentFixture<AwsadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
