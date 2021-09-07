import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  totalTopics = 0;
  TopicsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10, 20];
  isLoading = false;
  topics: any[];
  userIsAuthenticated = false;

  constructor(private topicService: TopicService, private authService: AuthService) { }

  ngOnInit() {
    this.getTopics(this.TopicsPerPage, this.currentPage);
    this.userIsAuthenticated = this.authService.getIsAuth();
  }


  getTopics(perPage, current) {
    this.isLoading = true;
    this.topicService.getAdminTopics(perPage, current).subscribe(data => {
      if(data.response.success) {
        this.isLoading = false;
        this.topics = data.response.topics;
        this.totalTopics = this.topics.length;
      }
    })
  }

  OnCreateBtnClicked() {}


  onDelete(id) {
    this.isLoading = true;
    this.topicService.deleteTopic(id).subscribe(data => {
      if(data.success) {
        this.isLoading = false;
        this.getTopics(this.TopicsPerPage, this.currentPage);
      }
    })
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.TopicsPerPage = pageData.pageSize;
    this.getTopics(this.TopicsPerPage, this.currentPage);
  }

}
