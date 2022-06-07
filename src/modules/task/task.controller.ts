import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @Post()
  create(@Body() createTaskDto: any) {
    return this.taskService.create(createTaskDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
