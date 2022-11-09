import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Patch,
} from '@nestjs/common';
import { TodoService } from './todo.service';

// Realiza interação entre o backend e o usuário, ou seja, responsável pelas rotas
@Controller('todo')
export class TodoController {
	constructor(private todoService: TodoService) {}

	@Get()
	async getAll() {
		const todos = await this.todoService.getAll();
		return todos;
	}

	@Post()
	async create(@Body() request: { name: string }) {
		await this.todoService.create(request.name);

		const updatedTodoList = await this.todoService.getAll();

		return updatedTodoList;
	}

	@Delete(':id')
	async delete(@Param() params) {
		const idToDelete = Number(params.id);

		await this.todoService.delete(idToDelete);

		const updatedTodoList = await this.todoService.getAll();

		return updatedTodoList;
	}

	@Patch(':id')
	async updateName(@Param() params, @Body() request) {
		const updatedName = request.name;
		const id = Number(params.id);

		await this.todoService.updateName(id, updatedName);

		const updatedTodoList = await this.todoService.getAll();

		return updatedTodoList;
	}

	@Patch('/check/:id')
	async toggleCheck(@Param() params) {
		const id = Number(params.id);

		await this.todoService.toggleCheck(id);

		const updatedTodoList = await this.todoService.getAll();

		return updatedTodoList;
	}
}
