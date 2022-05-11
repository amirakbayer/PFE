import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUri: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
   }

   errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

   uploadFile(file_to_upload : File): Observable<any>{
    let url = `http://localhost:4000/upload`;
    console.log("passed data",file_to_upload);
    const formData: FormData = new FormData();
    formData.append('file', file_to_upload);
     return this.http.post(url, formData).pipe(catchError(this.errorMgmt));
   }

   saveFile(data): Observable<any>{
    let url = `http://localhost:4000/fichier/saveFichier`;
     return this.http.post(url, data).pipe(catchError(this.errorMgmt));
   }

   getFiles(){
    let url = `http://localhost:4000/fichier/`;
    return this.http.get(url);
   }
   getFileDet(nom): Observable<any>{
    let url = `${this.baseUri}/fichier/readFichier/${nom}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
 }

 getFileDetByID(id): Observable<any>{
  let url = `${this.baseUri}/fichier/readFichierByID/${id}`;
  return this.http.get(url, { headers: this.headers }).pipe(
    map((res: Response) => {
      return res || {};
    }),
    catchError(this.errorMgmt)
  );
}

   downloadFile(name): any{
    let url = `${this.baseUri}/files/${name}`;
    return url
    //this.http.get(url, { headers: this.headers }).pipe(
      //map((res: Response) => {
        //return res || {};
      //}),
      //catchError(this.errorMgmt)
    //);
 }
}
