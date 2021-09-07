import { AfterViewInit, Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {

  @ViewChildren('paginator') paginator: MatPaginator;


  displayedColumns: string[] = ['name', 'description', 'star'];
  categories: any[] = [];
  totalCats = 0;
  catsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10, 20];
  isLoading = false;

  private catSub: Subscription;


  constructor(
    private catService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.isLoading = true;
    this.catService.getAdminCategories(this.currentPage, this.catsPerPage);
    this.catSub = this.catService.getAdminCategoriesUpdateListener().subscribe((catsData: {categories: any[], maxCats: number}) => {
      this.isLoading = false;
      this.categories = catsData.categories;
      this.totalCats = catsData.maxCats;
      console.log(catsData.maxCats)
    })
    // .subscribe((data) => {
    //   if (data.response.success) {
    //     this.isLoading = false;
    //     this.categories = data.response.categories;
    //     this.totalCats = data.response.maxCats;
    //   }
    // });
  }

  onDeleteCategory(id: string) {
    this.isLoading = true;
    this.catService.deleteCategory(id).subscribe((data) => {
      if (data.response.success) {
        this.isLoading = false;
        this.snackBar.open('Category Deleted', 'success', { duration: 5000 });
        this.catService.getAdminCategories(this.currentPage, this.catsPerPage);
      }
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.paginator.pageIndex = this.currentPage;
    this.catsPerPage = pageData.pageSize;
    this.catService.getAdminCategories(this.currentPage, this.catsPerPage);
  }


  ngOnDestroy() {
    this.catSub.unsubscribe();
  }
}

