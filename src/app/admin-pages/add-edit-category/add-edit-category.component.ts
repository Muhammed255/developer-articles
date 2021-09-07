import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";

@Component({
  selector: "app-add-edit-category",
  templateUrl: "./add-edit-category.component.html",
  styleUrls: ["./add-edit-category.component.scss"],
})
export class AddEditCategoryComponent implements OnInit {
  isLoading = false;

  mode = "create";
  category: any;
  catId: any;

  constructor(
    private catService: CategoryService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (paramMap.has("catId")) {
        this.mode = "edit";
        this.catId = paramMap.get("catId");
        this.catService
          .findOneCategory(paramMap.get("catId"))
          .subscribe((data) => {
            if (data.response.success) {
              this.category = data.response.category;
            }
          });
      } else {
        this.mode = "create";
        this.catId = null;
      }
    });
  }

  onSaveCategory(form: NgForm) {
    if (this.mode === "create") {
      this.catService
        .newCategory(form.value.name, form.value.description)
        .subscribe((catData) => {
          if (catData.response.success) {
            this.router.navigate(["/admin/categories"]);
          }
        });
    } else {
      this.catService
        .updateCategory(this.catId, form.value.name, form.value.description)
        .subscribe((data) => {
          if (data.response.success) {
            this.router.navigate(["/admin/categories"]);
          }
        });
    }
  }
}
