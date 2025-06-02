export class SearchVideoQuery {
  constructor(
    public readonly q: string,
    public readonly pageToken?: string,
    public readonly maxResults: number = 10,
  ) {}
}
