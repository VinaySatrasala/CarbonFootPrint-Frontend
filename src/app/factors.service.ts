import {
  catchError,
  Observable,
  ObservableInput,
  Subject,
  throwError,
} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FactorsService {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  private submitStatusSource = new Subject<string>();
  submitStatus$ = this.submitStatusSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  /**checks if current user already has an emission record for current month
   *if yes,returns the record id; else creates a new record and returns the id **/
  putRecordIfAbsent(): Observable<string | null> {
    let url;
    let emissionIDSource = new Subject<string>();
    const userID = sessionStorage.getItem('userID');
    let year = new Date().getFullYear();
    let month: string | number = new Date().getMonth();
    month++;
    if (month < 10) month = '0' + month;
    let date = `${year}-${month}`;
    if (userID) {
      url = `http://localhost:8070/api/v1/emissions/${userID}/${date}`;
      this.httpClient.get(url).subscribe({
        next: (response) => {
          if (response) {
            emissionIDSource.next((response as any)['id']);
          }
        },
        error: (e) => {
          url = 'http://localhost:8070/api/v1/emissions';
          let body = { userID: userID, date: date };
          this.httpClient.post(url, body).subscribe({
            next: (response) => {
              emissionIDSource.next((response as any)['id']);
            },
            error: (e) => emissionIDSource.error(e),
            complete: () => {
              /**console.info('complete')**/
            },
          });
          console.warn(e);
          // throwError(() => {
          //   new Error(e);
          // });
        },
        complete: () => {
          /**console.info('complete')**/
        },
      });
    }
    return emissionIDSource;
  }

  /** for cumulatively updating consumption n emission details in any category */
  updateRecord(
    category: string,
    body: any,
    emissionID: string
  ): Observable<boolean> {
    let url = `http://localhost:8070/api/v1/emissions/${emissionID}/cumulate/${category}`;
    let success = new Subject<boolean>();
    this.httpClient.put(url, body).subscribe({
      next: (response) => {
        if (response) success.next(true);
      },
      error: (e) => {
        success.error(e);
        throwError(() => {
          new Error(e);
        });
      },
      complete: () => {
        /**console.info('complete')**/
        // success.next(true);
      },
    });

    return success;
  }

  //fetch current month data
  fetchCurrentMonthData(): Observable<string | null> {
    let year = new Date().getFullYear();
    let month: any = new Date().getMonth();
    month = this.months[month];
    return this.fetchMonthData(year, month);
  }

  //fetch any month emission data
  fetchMonthData(
    year: number,
    month: string | number
  ): Observable<string | null> {
    let url;
    let emissionRecord = new Subject<any>();
    const userID = sessionStorage.getItem('userID');
    month = this.months.indexOf(month as any);
    month++;
    if (month < 10) month = '0' + month;
    let date = `${year}-${month}`;

    if (userID) {
      url = `http://localhost:8070/api/v1/emissions/${userID}/${date}`;
      this.httpClient.get(url).subscribe({
        next: (response) => {
          if (response) {
            emissionRecord.next(response);
          }
        },
        error: (e) => {
          emissionRecord.error(e);
        },
        complete: () => {
          /**console.info('complete')**/
        },
      });
    }
    return emissionRecord;
  }

  getCountryRecords(): Observable<any> {
    return this.httpClient.get('assets/emissionPerCapita.json');
  }

  fetchAllUserRecords(): Observable<any> {
    let url;
    let emissionRecords = new Subject<any>();
    const userID = sessionStorage.getItem('userID');
    if (userID) {
      url = `http://localhost:8070/api/v1/emissions/${userID}`;
      this.httpClient.get(url).subscribe({
        next: (response) => {
          if (response) emissionRecords.next(response);
        },
        error: (e) => {
          emissionRecords.error(e);
          throwError(() => {
            new Error(e);
          });
        },
        complete: () => {
          /**console.info('complete')**/
        },
      });
    }
    return emissionRecords;
  }

  alertSubmitStatus(status: string): void {
    this.submitStatusSource.next(status);
  }
}
