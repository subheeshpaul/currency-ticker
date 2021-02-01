import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, throwError} from 'rxjs';
import { CurrencyService } from '../currency.service';
import { HistoricCurrenyDetails } from '../interfaces/histroric-currency-details.model';
import { DateSelectorComponent } from './date-selector.component';

describe('DateSelectorComponent', () => {
    
  let fixture: ComponentFixture<DateSelectorComponent>;
  let component: DateSelectorComponent;
  let mockCurrencyService: CurrencyService;
  let historicCurrencyDetails: HistoricCurrenyDetails[]= [];

  beforeEach(async () => {
  
     historicCurrencyDetails = [
        {
            date: new Date("2018-06-01"),
            currencyDetails: {"CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351}
        },
        {
            date: new Date("2018-06-02"),
            currencyDetails: {"CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351}
        }
    ]
    mockCurrencyService = jasmine.createSpyObj(CurrencyService.name, ["selectedDateChanged"], {currenyList$: of(historicCurrencyDetails)});

    await TestBed.configureTestingModule({
     
      declarations: [
        DateSelectorComponent
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

    fixture = TestBed.createComponent(DateSelectorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

   }
  

  it('should create the Dateselector component', () => {
    CreateComponent();
    expect(component).toBeTruthy();
  });

  describe('When the component is loaded', () => {

    it(`should have correct contents`, () => {

        CreateComponent();
    
        const optionInput = fixture.debugElement.query(By.css('select')).nativeElement;
        
        expect(optionInput.options.length).toEqual(3);
        expect(optionInput.options[0].innerText).toEqual("- Please select a date -");
        expect(optionInput.options[1].innerText).toEqual("1/Jun/2018")
        expect(optionInput.options[2].innerText).toEqual("2/Jun/2018")
      });

  })

  describe('When the user selects 1/jun/2018 from dropdown', () => {

    it(`should have called the selectedDateChanged method`, () => {

        CreateComponent();
    
        const optionInput = fixture.debugElement.query(By.css('select'));
        optionInput.triggerEventHandler("change", {target:  {value: "1/jun/2018" }})
        fixture.detectChanges();

        expect(mockCurrencyService.selectedDateChanged).toHaveBeenCalledWith(new Date("1/jun/2018"));
        
      });

  })

  describe('When the user changes the date in the dropdown', () => {

    it(`should have called the selectedDateChanged method with correct parameter`, () => {

        CreateComponent();
    
        const optionInput = fixture.debugElement.query(By.css('select'));
        optionInput.triggerEventHandler("change", {target:  {value: "1/jun/2018" }})
        fixture.detectChanges();

        expect(mockCurrencyService.selectedDateChanged).toHaveBeenCalledWith(new Date("1/jun/2018"));
        
      });

  })

  describe('When the user selects - Please select a date - in the dropdown', () => {

    it(`should not have called the selectedDateChanged method`, () => {

        CreateComponent();
    
        const optionInput = fixture.debugElement.query(By.css('select'));
        optionInput.triggerEventHandler("change", {target:  {value: "0" }})
        fixture.detectChanges();

        expect(mockCurrencyService.selectedDateChanged).not.toHaveBeenCalled();
        
      });

  })
  describe('When the service returns error', () => {

    xit(`should show the error message`, () => {

        mockCurrencyService = jasmine.createSpyObj(CurrencyService.name, ["selectedDateChanged"], {currenyList$: throwError("error")});
        TestBed.overrideProvider(CurrencyService, {useValue: mockCurrencyService})

        CreateComponent();
           
        const errorMessageElement = fixture.debugElement.query(By.css('.alert'));
        expect(errorMessageElement.nativeElement.innerText).toEqual("test");
      });

  })
});
