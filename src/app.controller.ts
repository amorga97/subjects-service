import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  logger = new Logger('Users');
  constructor(
    private readonly appService: AppService,
    @Inject('COURSES') private readonly coursesClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    this.coursesClient.emit('testing', {
      testData: 'testing',
      moreData: ['test', 'test'],
    });
    return this.appService.getHello();
  }
}
