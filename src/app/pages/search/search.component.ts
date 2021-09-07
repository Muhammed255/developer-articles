import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'search-form',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      searchString: [''],
    });
  }

  onSubmitSearchForm() {
    this.router.navigate(['/account/wall'], {
      queryParams: { search: this.searchForm.get('searchString').value },
    });
  }
}
