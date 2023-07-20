import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
  @Input() paginatorConfig: any;
  pages: number[];
  ngOnInit(): void {
    this.pages = new Array(this.paginatorConfig?.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
