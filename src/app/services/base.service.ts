import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
export class BaseService<Type> {
    private httpClient: HttpClient;
    private uri: string;
    constructor(hc: HttpClient, uri: string) {
        this.httpClient = hc;
        this.uri = uri;
    }
    get(): Observable<Array<Type>> {
        return this.httpClient.get<Array<Type>>(this.uri);
    }

    getById(id: number): Observable<Type> {
        return this.httpClient.get<Type>(`${this.uri}/${id}`);
    }

    create(data: Partial<Type>):Observable<Type> {
        return this.httpClient.post<Type>(`${this.uri}`, data);
    }

    update(id: number, data: Partial<Type>):Observable<Type> {
        return this.httpClient.patch<Type>(`${this.uri}/${id}`, data);
    }

    delete(id: number):Observable<Type> {
        return this.httpClient.delete<Type>(`${this.uri}/${id}`);
    }
}
