import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload } from '../interfaces/Upload';
import { Item } from '../interfaces/Item';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private apiURL = 'http://localhost:3000/api';

  constructor( private httpClient: HttpClient ) { }

  getAllUploads(): Observable<Upload[]> {
    const url = `${this.apiURL}/uploads`
    return this.httpClient.get<Upload[]>( url )
  }

  createUpload( item: Item ) {
    console.log(item);
    // return this.httpClient.post<Item>(`${this.apiURL}/uploads`, item)
  }
}
