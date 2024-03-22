import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

	data: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
		this.authService.getAdminDashboard().subscribe(res => {
			this.data = res.data;
		})
  }

}
