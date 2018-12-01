import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class Getrank {

  //if MajWin do 
  //  if against better player, +x pts,
  //  if against worse player, +x pts
  //if MinWin do 
  //  if against better player, +x pts,
  //  if against worse player, +x pts
  //if MinLoss do -x pts
  //if MajLoss do -x pts
  
}
