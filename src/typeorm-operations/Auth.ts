import crypto from 'crypto';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Account } from '../entity/Account';

const accountRepository: Repository<Account> = AppDataSource.getRepository(Account);

async function validateLogin(
  login: string,
  passwordHash?: string
): Promise<boolean> {

  const qb = accountRepository
    .createQueryBuilder('account')
    .where('account.login = :login', { login });

  if (passwordHash) {
    qb.andWhere('account.passwordHash = :passwordHash', { passwordHash });
  }

  return Boolean(await qb.getOne());

}

export async function getSalt(login: string): Promise<string> {
  const account = await accountRepository.findOne({ 
    where: { login },
    select: ['passwordSalt']
  });

  return account?.passwordSalt ?? crypto.randomBytes(32).toString('hex');
}

export async function attemptSignUp(
  login: string,
  email: string, 
  passwordHash: string,
  passwordSalt: string
): Promise<boolean> {
  
  const isLoginAvailable = await validateLogin(login);

  if (isLoginAvailable) {
    const account = new Account();
    account.login = login;
    account.email = email;  
    account.passwordHash = passwordHash;
    account.passwordSalt = passwordSalt;
    
    await accountRepository.save(account);
    return true; 
  }

  return false;
}