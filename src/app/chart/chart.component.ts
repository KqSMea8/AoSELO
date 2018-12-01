import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDetails, AuthenticationService } from "../_services/authentication.service";
import { Player } from '@/_models/players';
import { Rank } from '@/_services/rank.service';
import { merge, Observable, of as observableOf} from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { catchError, startWith, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  displayedColumns: string[] = ['Rank', 'Nickname', 'Name', 'Faction', 'Score'];
  dataSource = new MatTableDataSource<any>();
  //player: Player;
  
  loading = false;
  //sortedPlayers: Player[];
  
  // resultsLength = 0;
  // isLoadingResults = true;
  // isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public rank: Rank) {}
  
  ngOnInit() {
    
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.rank.getPlayers();
    this.dataSource.data = data;
    this.loading = false;
  }

    // this.rank.getPlayers()
    //   .subscribe(player => this.player = player);

}


export interface Rows {
  Rank: number;
  Name: string;
  Username: string;
  Score: number;
  Faction: string;
}
// export class TempName {
//   constructor(private rank: Rank) {}

//   getRepoIssues(sort: string, order: string, page: number):
//   Observable<Player> {
//     return this.rank.getPlayers();
//   }
// }