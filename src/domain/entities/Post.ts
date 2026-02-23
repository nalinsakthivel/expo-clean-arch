export class Post {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly title: string,
    public readonly body: string,
  ) {}

  isValid(): boolean {
    return this.title.trim().length > 0 && this.body.trim().length > 0;
  }
}
