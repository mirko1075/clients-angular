import { Component } from '@angular/core';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  client: Client = new Client();
  title: string = 'Crear client';
  id: any;
  error: string;
  clienteForm: FormGroup;

  constructor(
    private clientService: ClientsService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.title = 'Editar client';
        this.retrieveClient(this.id);
      }
    });
  }

  public createForm(): void {
    this.clienteForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public retrieveClient(id: any) {
    this.clientService.getOne(id).subscribe({
      next: (client) => {
        this.client = new Client(client);
        this.clienteForm.patchValue(this.client);
      },
      error: (error) => (this.error = error.error.message),
    });
  }

  public save(): void {
    Swal.fire({
      title: 'Confirmation!',
      text: 'Do you want to continue',
      icon: 'warning',
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          const formValue = this.clienteForm.getRawValue();
          let message: string;
          let title: string;
          if (this.id) {
            this.clientService.putOne(formValue, this.id).subscribe({
              next: (result) => this.router.navigate(['/']),
            });
            title = 'Client edited';
            message = 'Client has been edited successfully';
          } else {
            this.clientService.createOne(formValue).subscribe({
              next: (result) => this.router.navigate(['/']),
            });
            title = 'Client created';
            message = 'Client has been saved successfully';
          }
          Swal.fire({
            title: title,
            text: message,
            icon: 'success',
          });
        }
      })
      .catch((reason) => console.log('reason', reason));
  }
}
