export class NotWiredError extends Error {
  constructor(service: string) {
    super(
      `${service} is not wired up yet. This is a stub — a human connects the real account before anything sends or syncs.`
    );
    this.name = "NotWiredError";
  }
}
