import { Component, OnInit, ViewChild } from '@angular/core';
import { Games } from "../_services/games.service";
import { AuthService } from "@/_services/authentication.service";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  
  gameData = Array();
  dataSource = new MatTableDataSource(this.gameData);
  displayedColumns: string[] = ['Winner', 'WinningFaction','Loser', 'LosingFaction', 'Result', 'Battleplan', 'PointsLevel'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public games: Games) {
    games.getGames().subscribe(data =>{
      this.gameData = data;
      this.dataSource.data = this.gameData;
    });
  }
  
  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
