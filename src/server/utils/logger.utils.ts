export default class Logger {
  private static format(level: string, message: string): string {
    const time = Date().toString();
    return `[${level}] ${message} - ${time}`;
  }

  public static info(message: string): void {
    console.info(this.format('INFO', message));
  }

  public static warn(message: string): void {
    console.warn(this.format('WARN', message));
  }

  public static error(message: string): void {
    console.error(this.format('ERROR', message));
  }
}
