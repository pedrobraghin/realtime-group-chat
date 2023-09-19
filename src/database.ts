import { User } from './types/user';

export class Database {
  public users: User[] = [];

  removeUser(id: string): void {
    this.users = this.users.filter((u) => u.id !== id);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  get usersCount() {
    return this.users.length;
  }
}