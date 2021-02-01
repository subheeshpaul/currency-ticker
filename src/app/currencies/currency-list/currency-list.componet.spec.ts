import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CurrencyListComponent } from './currency-list.compoment';


describe('CurrencyListComponent', () => {
    
  let fixture: ComponentFixture<CurrencyListComponent>;
  let component: CurrencyListComponent;
 
  beforeEach(async () => {
  
     await TestBed.configureTestingModule({
     
      declarations: [
        CurrencyListComponent
      ],
      imports:[
          CommonModule
      ],
      schemas:[NO_ERRORS_SCHEMA]

    }).compileComponents();

    

  });

   function CreateComponent(): void {

    fixture = TestBed.createComponent(CurrencyListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

   }
  

  it('should create the CurrencyList component', () => {
    CreateComponent();
    expect(component).toBeTruthy();
  });

  describe('When the component is loaded', () => {

    it(`should have correct contents`, () => {

        CreateComponent();
    
        const pageTitle = fixture.debugElement.query(By.css('.card-header'));
        const dateComponet  = fixture.debugElement.queryAll(By.css('date-selector'));
        const currencyComponent  = fixture.debugElement.queryAll(By.css('currency-display'));

        expect(pageTitle.nativeElement.innerText).toEqual("Historical Currency Rates");
        expect(dateComponet.length).toEqual(1);
        expect(currencyComponent.length).toEqual(1);
        });

  })

});
