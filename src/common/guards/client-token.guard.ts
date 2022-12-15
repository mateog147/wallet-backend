import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  JwtHeader,
  SigningKeyCallback,
  verify,
  VerifyErrors,
  VerifyOptions,
} from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClientTokenGuard implements CanActivate {
  constructor(private config: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      const flag = await this.getData(token);
      return flag;
    } catch (error) {
      console.log('error:', error.message);
      throw new HttpException('not allowed', HttpStatus.FORBIDDEN);
    }
  }

  private async getData(token: string): Promise<boolean> {
    const client = jwksClient({
      jwksUri: this.config.get<string>('JWKS_URI'),
    });

    const options: VerifyOptions = { algorithms: ['RS256'] };
    const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
      client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key?.getPublicKey();
        callback(err, signingKey);
      });
    };

    return new Promise((resolve) => {
      verify(token, getKey, options, (err: VerifyErrors, decoded: any) => {
        if (err) resolve(false);
        resolve(true);
      });
    });
  }
}
