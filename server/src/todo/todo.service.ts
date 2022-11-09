import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Todo } from '@prisma/client';

//Realiza interações com os dados, ou seja, interage com o db
@Injectable()
export class TodoService {
	constructor(private prisma: PrismaService) {}

	async getAll(): Promise<Todo[] | null> {
		return this.prisma.todo.findMany();
	}

	async create(name: string) {
		return this.prisma.todo.create({
			data: { name },
		});
	}

	async delete(id: number) {
		return this.prisma.todo.delete({
			where: {
				id,
			},
		});
	}

	async updateName(id: number, name: string) {
		return this.prisma.todo.update({
			where: {
				id,
			},
			data: {
				name,
			},
		});
	}

	async toggleCheck(id: number) {
		const todo = await this.prisma.todo.findFirst({
			where: {
				id,
			},
		});

		return this.prisma.todo.update({
			where: {
				id,
			},
			data: {
				isChecked: !todo.isChecked,
			},
		});
	}
}
