import crypto from 'crypto';
import { Repository } from 'typeorm';

import { AppDataSource } from '../data-source';
import { Account } from '../entities/User';
import { Session } from '../entities/Session';

const accountRepository: Repository<Account> = AppDataSource.getRepository(Account);
const sessionRepository: Repository<Session> = AppDataSource.getRepository(Session);

export async function validateAuthData(
  login: string,
  passwordHash?: string
): Promise<boolean> {

  console.log(login, passwordHash);

  const qb = accountRepository
    .createQueryBuilder('account')
    .where('account.login = :login', { login });

  if (passwordHash) {
    qb.andWhere('account.passwordHash = :passwordHash', { passwordHash });
  }

  return Boolean(await qb.getOne());

}


export async function getAccount(login: string): Promise<Account> {
  const account = await accountRepository.findOneBy({ login: login });
  return account;
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
  
  const isLoginAvailable = await validateAuthData(login);

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

export async function generateSession(login: string, ip: string, deleteAt?: number) {
  const account = await getAccount(login);
  const session = new Session();
  session.account = account;
  session.deleteAt = deleteAt;
  session.lastIPAccessed = ip;
  session.sessionId = crypto.randomBytes(32).toString('hex');
  await sessionRepository.save(session);
  return;
}