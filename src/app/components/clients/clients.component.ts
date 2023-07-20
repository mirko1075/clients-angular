import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  currentPage: number = 0;

  paginator: any;

  constructor(
    private clientsService: ClientsService,
    private router: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.currentPage = +params.get('page') ?? 0;
      this.getData();
    });
  }

  getData(): void {
    this.clientsService
      .getAll(this.currentPage)
      .pipe(
        tap((response) => {
          this.paginator = response;
        })
      )
      .subscribe({ next: (response) => (this.clients = response.content) });
  }

  deleteClient(clientId: number): void {
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you want to delete this client?',
      icon: 'warning',
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.clientsService.deleteOne(clientId).subscribe({
            next: () =>
              (this.clients = this.clients.filter((c) => c.id !== clientId)),
          });
          Swal.fire({
            title: 'Client deleted!',
            text: 'Client has been successfully deleted',
            icon: 'success',
          });
        }
      })
      .catch(() => null);
  }

  editClient(clientId: number): void {
    this.navigateToRoute('/clients/add/' + clientId);
  }

  public navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
