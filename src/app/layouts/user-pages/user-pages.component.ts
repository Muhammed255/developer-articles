import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.scss']
})
export class UserPagesComponent implements OnInit {

  categories: any[];
  auth_user: any;
  userImage = 'assets/faces/face-0.jpg';
  @ViewChild(MatMenuTrigger, {static: true}) topicsTriggerMenu: MatMenuTrigger;

  constructor(
    public authService: AuthService,
    private catService: CategoryService,
    public flashMessagesService: FlashMessagesService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    if(localStorage.getItem("userId")) {
      this.authService.findUserById(localStorage.getItem("userId")).subscribe(data => {
        this.auth_user = data.response.user;
      })
    }
  }


  ngAfterViewInit() {
  }

  getAllCategories() {
    this.catService.getTopicsByCategory().subscribe((data) => {
      if (data.response.success) {
        this.categories = data.response.topicsByCat;
      }
    });
  }

}
