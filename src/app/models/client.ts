export class Client {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  constructor(client?: Client) {
    this.id = client?.id;
    this.nombre = client?.nombre;
    this.apellido = client?.apellido;
    this.createAt = client?.createAt;
    this.email = client?.email;
  }
}
