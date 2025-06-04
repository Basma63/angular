import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from '../interfaces/todo.interface';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class TodoService {
    private todos: Todo[] = [];

    create(createTodoDto: CreateTodoDto): Todo {
        const newTodo: Todo = {
            id: randomUUID(),
            title: createTodoDto.title,
            description: createTodoDto.description,
            isCompleted: false,
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    findAll(): Todo[] {
        return this.todos;
    }


    findOne(id: string): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) {
            throw new NotFoundException('Todo not found');
        }
        return todo;
    }

    update(id: string, updateTodoDto: UpdateTodoDto): Todo {
        const todo = this.findOne(id);
        if (!todo) {
            throw new NotFoundException('Todo with ID ${id} not found');
        }
        Object.assign(todo, updateTodoDto);
        return todo;
    }

    remove(id: string): { message: string } {
        this.findOne(id); 
        this.todos = this.todos.filter(todo => todo.id !== id);
        return { message: 'Todo deleted' };
    }
}
