import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

import { CurrencyService } from './currency.service';
import { CurrencyResponse } from './interfaces/currency-response.model';
import { HistoricCurrenyDetails } from './interfaces/histroric-currency-details.model';


describe('CurrencyService Tests', () => {

  let currencyService: CurrencyService;
  let httpTestingController: HttpTestingController;

  //   let currencyDetailsForFirstDay: CurrencyDetails = {
  //   "CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351
  // };

  // let currencyDetailsForSecondDay: CurrencyDetails = {
  //   "CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351
  // };

  // let historicCurrencyRates: HistoricCurrencyRates = {
  //   "2018-12-19": currencyDetailsForFirstDay,
  //   "2018-10-09": currencyDetailsForSecondDay

  // }

  let currencyResponse: CurrencyResponse = {
    base: "EUR",
    end_at: "2019-11-30",
    rates: {
      "2018-12-19":  { "CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351},
      "2018-10-09": { "CAD":1.5332,"HKD":8.9241,"ISK":138.8,"PHP":60.5351 }  
    },
    start_at: "2018-06-01"
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CurrencyService ]
    });

    currencyService = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('currencyList$', () => {

  it('should get the response', () => {
    currencyService.currenyList$
      .subscribe((data: HistoricCurrenyDetails[]) => {
        expect((<HistoricCurrenyDetails[]>data).length).toEqual(2);
      });

    let currencyRequest: TestRequest = httpTestingController.expectOne('https://api.exchangeratesapi.io/history?start_at=2018-06-01&end_at=2019-11-30');
    expect(currencyRequest.request.method).toEqual('GET');

    currencyRequest.flush(currencyResponse);

  });

  it('should return an error', () => {
    currencyService.currenyList$
      .subscribe(
        (data:HistoricCurrenyDetails[]) => fail('this should have been an error'),
        (err: string) => {
          expect(err).toEqual("Backend returned code 500");
        }
      );

    let booksRequest: TestRequest = httpTestingController.expectOne('https://api.exchangeratesapi.io/history?start_at=2018-06-01&end_at=2019-11-30');

    booksRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });
  });

  });

});