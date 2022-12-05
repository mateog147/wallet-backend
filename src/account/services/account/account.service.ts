import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  getAccountInfo(id: string) {
    throw new Error('Method not implemented.');
  }
  newLoan(dto: { idIncome: string; amount: number }) {
    throw new Error('Method not implemented.');
  }
  newPayment(dto: {
    emailIncome: string;
    idOutcome: string;
    reason: string;
    amount: number;
  }) {
    throw new Error('Method not implemented.');
  }
}
