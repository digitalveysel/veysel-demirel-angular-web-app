import { Contact } from '../models/contact.model';

export default class ContactService {
  private readonly ADDRESS = 'contact@veysel.co';

  public async send(payload: Contact): Promise<void> {}
}
