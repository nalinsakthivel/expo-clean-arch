export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
  ) {}

  // Enterprise business rules can be added here
  isValid(): boolean {
    // Example rule
    return this.name.length > 0 && this.email.includes("@");
  }
}
