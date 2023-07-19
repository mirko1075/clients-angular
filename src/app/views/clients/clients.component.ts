import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

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
    const modalRef = this.modalService.open(ConfirmationModalComponent);
    modalRef.result
      .then((result) =>
        this.clientsService.deleteOne(clientId).subscribe({
          next: () =>
            (this.clients = this.clients.filter((c) => c.id !== clientId)),
        })
      )
      .catch(() => null);
  }

  editClient(clientId: number): void {
    this.navigateToRoute('/clients/add/' + clientId);
  }

  public navigateToRoute(route: string): void {
    this.router.navigate([route]);
  }
}
