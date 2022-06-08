import { Controller, Get, Headers, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';
import { TaskService } from './task.service';

@ApiTags('Tasks')
@Controller('task')
export class TaskController {
  
  constructor(private readonly taskService: TaskService) {}

  @ApiBearerAuth()
  @Post()
  create(
    @Headers() headers,
    @Body() createTaskDto: CreateTaskDto
  ) {
    return this.taskService.create(headers, createTaskDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll(@Query() params: FilterTaskDto) {
    return this.taskService.findAll(params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'getting my created tasks' })
  @Get('/my-created')
  findMyCreated(@Headers() headers) {
    return this.taskService.findMyCreated(headers);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'getting tasks assigned to me' })
  @Get('/assigned-to-me')
  findAssignedToMe(@Headers() headers) {
    return this.taskService.findToMe(headers);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'change task status to "To Do"' })
  @Put('make-todo/:id')
  makeToDo(
    @Headers() headers,
    @Param('id') id: number,
  ) {
    return this.taskService.makeToDo(headers, id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'change task status to "In Progress"' })
  @Put('make-in-progress/:id')
  makeInProgress(
    @Headers() headers,
    @Param('id') id: number,
  ) {
    return this.taskService.makeInProgress(headers, id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'change task status to "Done"' })
  @Put('make-done/:id')
  makeDone(
    @Headers() headers,
    @Param('id') id: number,
  ) {
    return this.taskService.makeDone(headers, id);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(
    @Headers() headers,
    @Param('id') id: number,
  ) {
    return this.taskService.remove(headers, id);
  }
}
