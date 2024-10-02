import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
    private userClient: ClientProxy;
    private messageClient: ClientProxy;

    constructor() {
        this.userClient = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3002,
            },
        });

        this.messageClient = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: 'localhost',
                port: 3001,
            },
        });
    }

    getUserClient() {
        return this.userClient;
    }

    getMessageClient() {
        return this.messageClient;
    }
}
