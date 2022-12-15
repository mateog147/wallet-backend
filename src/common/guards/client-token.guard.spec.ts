import { ClientTokenGuard } from './client-token.guard';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { ConfigService } from '@nestjs/config';

describe('TokenGuard', () => {
  let tokenGuard: ClientTokenGuard;

  beforeEach(() => {
    const configService: ConfigService = new ConfigService();
    tokenGuard = new ClientTokenGuard(configService);
  });

  it('should be defined', () => {
    expect(tokenGuard).toBeDefined();
  });

  /*it('should return true if token is valid', () => {
    const mockContext = createMock<ExecutionContext>();
    const context: ExecutionContext = createMock(mockContext);
    const isValid = tokenGuard.canActivate(context);
    expect(isValid).toBe(true);
  });*/
});
