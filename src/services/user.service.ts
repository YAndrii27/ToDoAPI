import argon2 from 'argon2';
import { Repository } from 'typeorm';

import { AppDataSource } from '../configs/database.config';
import { User } from '../entities/user.entity';

export class UserService {

	private userRepository: Repository<User>;

	constructor() {
		this.userRepository = AppDataSource.getRepository(User);
	}

  async register(login: string, email: string, password: string) : Promise<User> {
    const user = new User();

		user.login = login;
    user.email = email;
		user.passwordHash = await argon2.hash(password);

    await this.userRepository.save(user);

    return user;
  }

  async login(login: string, password: string) : Promise<User | void> {
    const user = await this.userRepository.findOneBy({login: login});
		const isPasswordCorrect = await argon2.verify(user.passwordHash, password)
		if (isPasswordCorrect) {
			return user;
		} else {
			return;
		}
  }

	async getUser(id: number): Promise<User>;
	async getUser(login: string): Promise<User>;
	async getUser(idOrlogin: number | string): Promise<User> {
		if (typeof idOrlogin === "number") {
			const user: User = await this.userRepository.findOneBy({ id: idOrlogin });
			return user;
		} else {
			const user: User = await this.userRepository.findOneBy({ login: idOrlogin });
			return user;
		}
	}

	async updateUser(data) : Promise<User> {
    const user: User = await this.getUser(data.id);

		const updatedUser = Object.assign(user, data);

    await this.userRepository.save(updatedUser);

    return user;
  }

	async deleteUser(userID: number) : Promise<void> {
		const user = await this.getUser(userID);
		await this.userRepository.remove(user);
		return;
	}

}