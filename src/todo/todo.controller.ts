import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

   @Get()
    getPosts(): Todo[] {
        return this.todoService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Todo {
        return this.todoService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateTodoDto): Todo {
        return this.todoService.create(data);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: UpdateTodoDto): Todo {
        return this.todoService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string): { message: string } {
        return this.todoService.remove(id);
    }
}


