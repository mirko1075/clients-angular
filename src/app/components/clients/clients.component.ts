import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[];

  constructor(
    private clientsService: ClientsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientsService
      .getAll()
      .subscribe({ next: (clients) => (this.clients = clients) });
  }

  deleteClient(clientId: number): void {
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you want to delete this client?',
      icon: 'warning',
      showCancelButton: true,
    })
      .then((result) => {
        console.log('result', result);
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
