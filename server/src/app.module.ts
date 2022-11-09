import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
	imports: [],
	controllers: [AppController, TodoController],
	providers: [AppService, TodoService, PrismaService],
})
export class AppModule {}
