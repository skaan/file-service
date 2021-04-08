import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';

export class AuthGuard implements CanActivate {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8877
      }
    })
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const jwt = req.headers['authorization']?.split(' ')[1];
    
    try{
      const res = await this.client.send('check', { jwt }).toPromise<boolean>();
      return res;
    } catch(err) {
      console.error(err)
      return false;
    }
  }
}