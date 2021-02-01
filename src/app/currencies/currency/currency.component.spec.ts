import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {  of, throwError } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { Currency } from '../interfaces/currency.model';
import { HistoricCurrenyDetails } from '../interfaces/histroric-currency-details.model';
import { CurrencyComponent } from './currency.component';


describe('CurrencyComponent', () => {
    
  let fixture: ComponentFixture<CurrencyComponent>;
  let component: CurrencyComponent;
  let mockCurrencyService: CurrencyService;
  let historicCurrencyDetails: HistoricCurrenyDetails[]= [];
  let currencies: Currency[] = [];

  beforeEach(async () => {
  
    historicCurrencyDetails = [
        {
            date: new Date("2018-06-01"),
            currencyDetails:  {"CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351}
        },
        {
            date: new Date("2018-06-02"),
            currencyDetails: {"CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351}
        }
    ]

    currencies = [
        {
            currencyType: "CAD",
            rate: 1.5332
        },
        {
            currencyType: "HKD",
            rate: 8.9241
        }
    ]
    mockCurrencyService = jasmine.createSpyObj(CurrencyService.name, ["selectedDateChanged"],  {selectedCurrencyDetails$: of(currencies)} );

    await TestBed.configureTestingModule({
     
      declarations: [
        CurrencyComponent
      ],
      imports:[
          CommonModule
      ],

      providers:[
          {provide: CurrencyService, useValue: mockCurrencyService}
      ]
    }).compileComponents();

    

  });

   function CreateComponent(): void {

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

   }
  
  it('should create the Currency component', () => {
    CreateComponent();
    expect(component).toBeTruthy();
  });

  describe('When the component is loaded', () => {

    it(`should have correct contents`, () => {

        CreateComponent();
    
        const tableHeader = fixture.debugElement.queryAll(By.css('th'));
        const tableItems  = fixture.debugElement.queryAll(By.css('td'));

        expect(tableHeader.length).toEqual(2);
        expect(tableHeader[0].nativeElement.innerText).toEqual("Currency Code");
        expect(tableHeader[1].nativeElement.innerText).toEqual("Rate");

        expect(tableItems.length).toEqual(4);
        expect(tableItems[0].nativeElement.innerText).toEqual("CAD");
        expect(tableItems[1].nativeElement.innerText).toEqual("001.533");
        expect(tableItems[2].nativeElement.innerText).toEqual("HKD");
        expect(tableItems[3].nativeElement.innerText).toEqual("008.924");
        });

  })

  describe('When the service returns error', () => {

    xit(`should show the error message`, () => {

        mockCurrencyService = jasmine.createSpyObj(CurrencyService.name, ["selectedDateChanged"], {currenyList$: throwError("error")});
        TestBed.overrideProvider(CurrencyService, {useValue: mockCurrencyService})

        CreateComponent();
        component.errorMessage$.subscribe(err => console.log(err));
    
        const errorMessageElement = fixture.debugElement.query(By.css('.alert'));
        expect(errorMessageElement.nativeElement.innerText).toEqual("test");
      });

  })
});
