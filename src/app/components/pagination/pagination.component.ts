import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() paginatorConfig: any;
  pages: number[];
  pagesFiltered: any;
  fromIndex: number;
  toIndex: number;
  ngOnInit(): void {
    this.calculatePages();
  }

  ngOnChanges(changes): void {
    this.calculatePages();
  }

  calculatePages(): void {
    const pagesToShow = 4; // Number of pages to show before and after the current page
    const totalPages = this.paginatorConfig.totalPages;
    const currentPage = this.paginatorConfig.number + 1;
    let startPage: number, endPage: number;

    if (totalPages <= pagesToShow * 2 + 1) {
      // If there are fewer pages than the number to show, display all pages
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= pagesToShow + 1) {
      // If the current page is near the beginning, display the first pagesToShow * 2 + 1 pages
      startPage = 1;
      endPage = pagesToShow * 2 + 1;
    } else if (currentPage >= totalPages - pagesToShow) {
      // If the current page is near the end, display the last pagesToShow * 2 + 1 pages
      startPage = totalPages - pagesToShow * 2;
      endPage = totalPages;
    } else {
      // Display pagesToShow pages before and after the current page
      startPage = currentPage - pagesToShow;
      endPage = currentPage + pagesToShow;
    }

    this.pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
}
