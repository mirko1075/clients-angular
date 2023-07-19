import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  client: Client;
  title: string = 'Crear client';
  id: any;
  constructor(
    private clientService: ClientsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.retrieveClient(this.id);
      } else this.client = new Client();
    });
  }
  retrieveClient(id: any) {
    this.clientService.getOne(this.id).subscribe({
      next: (client) => {
        console.log('client', client);
        this.client = new Client(client);
      },
    });
  }

  save(): void {
    this.clientService.createOne(this.client).subscribe({
      next: (result) => this.router.navigate(['/']),
    });
  }
  edit(): void {
    this.clientService.putOne(this.client, this.id).subscribe({
      next: (result) => this.router.navigate(['/']),
    });
  }
}
