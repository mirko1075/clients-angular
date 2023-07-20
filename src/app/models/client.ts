export class Client {
  id: number;
  name: string;
  lastName: string;
  createAt: string;
  email: string;
  constructor(client?: Client) {
    this.id = client?.id;
    this.name = client?.name;
    this.lastName = client?.lastName;
    this.createAt = client?.createAt;
    this.email = client?.email;
  }
}
