import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable()
export class FilterSortService {

    constructor() {}

    private _objArrayCheck(array: any[]): boolean {
        const item0 = array[0];
        const check = !!(array.length && item0 !== null && 
            Object.prototype.toString.call(item0) === '[object Object]');
            return check;
    }

    searchPlayerByID(array: any[], query: string) {
        const lQuery = query.toLowerCase();
        const filteredArray = array.filter(function(err, player){
          
        });
      }
    
      noSearchResults(arr: any[], query: string): boolean {
        // Check if array searched by query returned any results
        return !!(!arr.length && query);
      }
    
      orderByScore(array: any[], prop: number, reverse?: boolean) {
        if (!prop || !this._objArrayCheck(array)) {
          return array;
        }
        const sortedArray = array.sort((a, b) => {
          const rankA = 10000;
          const rankB = 1;

          return !reverse ? rankA - rankB : rankB - rankA;
        });

        return sortedArray;
      }
    

}