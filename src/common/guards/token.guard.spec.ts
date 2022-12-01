import { TokenGuard } from './token.guard';
import { ExecutionContext } from '@nestjs/common';
describe('TokenGuard', () => {
  let tokenGuard: TokenGuard;

  beforeEach(() => {
    tokenGuard = new TokenGuard();
  });

  it('should be defined', () => {
    expect(tokenGuard).toBeDefined();
  });

  it('should return true if token is valid', () => {
    const context: ExecutionContext = createMock(ExecutionContext);
    const isValid = tokenGuard.canActivate(context);
    expect(isValid).toBe(true);
  });
});
