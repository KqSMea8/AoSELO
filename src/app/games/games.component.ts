import { Component, OnInit, ViewChild } from '@angular/core';
import { Games } from "../_services/games.service";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  displayedColumns: string[] = ['Winner', 'WinningFaction','Loser', 'LosingFaction', 'Result', 'Battleplan', 'PointsLevel'];
  dataSource = new MatTableDataSource<any>();
  
  loading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public games: Games) {}
  
  ngOnInit() {
    
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.refresh();
  }

  async refresh() {
    this.loading = true;
    const data = await this.games.getGames();
    this.dataSource.data = data;
    this.loading = false;
  }
}


export interface Rows {
  Winner: string;
  WinningFaction: string;
  Loser: string;
  LosingFaction: string;
  Result: string;
  BattlePlan: string;
  PointsLevel: boolean;
}
