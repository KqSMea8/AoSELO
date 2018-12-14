import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class UtilityService {

    constructor() {}

    isLoaded(loading: boolean): boolean {
        return loading === false;
    }
}