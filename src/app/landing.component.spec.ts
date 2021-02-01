import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LandingComponent } from './landing.component';

describe('LandingComponent', () => {
    
  let fixture: ComponentFixture<LandingComponent>;
  let component: LandingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
     
      declarations: [
        LandingComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create the Landing component', () => {
    
    expect(component).toBeTruthy();
  });

  describe('When the component is loaded', () => {

    it(`should have correct contents`, () => {
    
        const welcomeText = fixture.debugElement.query(By.css('.card-header'));
        const headerElement  = fixture.debugElement.query(By.css('h1'));
        const tagLines = fixture.debugElement.queryAll(By.css('.text-center'));
        
        expect(welcomeText.nativeElement.innerText).toEqual('Welcome');
        expect(headerElement.nativeElement.innerText).toEqual('SPECTRE FOREX TRADING');
        expect(tagLines[1].nativeElement.innerText).toEqual('Create wealth through knowledge');
      });

  })
 
});
