import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from "../_services/authentication.service";
import { Player } from '@/_models/players';
import { Rank } from '@/_services/rank.service';
import { merge, Observable, of as observableOf, Subscription } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { UtilityService } from '@/_services/utils.service';
import { FilterSortService } from '@/_services/filter-sort.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  pageTitle = 'Rankings';
  //playerListSub: Subscription;
  //playerList: Player[];
  //filteredPlayers: Player[];
  
 // loading: boolean;
 // error: boolean;
  //sortedPlayers: Player[];

  myData = Array();
  dataSource = new MatTableDataSource(this.myData);
  displayedColumns: string[] = ['Rank', 'Nickname', 'Name', 'Faction', 'Score'];
  
  resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); //Remove whitespace
    filterValue = filterValue.toLowerCase(); //MatTableSorts defaults to lowercase
    this.dataSource.filter = filterValue;
  }

  constructor(public rank: Rank, private title: Title) {
                rank.getPlayers().subscribe(data =>{
                  this.myData = data;
                  this.dataSource.data = this.myData;
                });
              }
  
  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

export interface Rows {
  Rank: number;
  Name: string;
  Username: string;
  Score: number;
  Faction: string;
}