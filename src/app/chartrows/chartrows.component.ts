import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@/_services/authentication.service';

@Component({
  selector: 'app-chartrows',
  templateUrl: './chartrows.component.html',
  styleUrls: ['./chartrows.component.css']
})
export class ChartrowsComponent implements OnInit {

  @Input() character: any;
  @Input() columns: string[];
  
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
