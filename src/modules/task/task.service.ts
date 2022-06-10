import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomingHttpHeaders } from 'http';
import { Status, Task } from 'src/entities/task.entity';
import { User } from 'src/entities/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/task-filter.dto';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    private authService: AuthService
  ) { }

  updateQuery = this.tasksRepository.createQueryBuilder().update(Task);

  async create(headers: IncomingHttpHeaders, createTaskDto: CreateTaskDto) {
    const {userIds, ...taskData} = createTaskDto;
    let users = [];

    for( let i = 0; i < userIds?.length; i++ ) {
      let user = await this.findUser(userIds[i]);
      if(user) {
        await users.push({...user});
      }
    }

    const myId = await this.authService.getUsersCredentials(headers).userId;
    if(myId) {
      return await this.tasksRepository.save(
        {
          ...taskData,
          assignee: users,
          createdBy: myId
        });
    } else {
      throw new BadRequestException();
    }
  }

  async findAll(params: FilterTaskDto) {
    const qb = await this.tasksRepository.createQueryBuilder('t');
    if(params.dueDate) {
      qb.andWhere({dueDate: LessThanOrEqual(params.dueDate)});
    }
    if(params.status) {
      qb.andWhere({status: params.status});
    }
	
    let result = await qb.leftJoinAndSelect("t.assignee", "user").getMany();
    if(params.userId) {
      result = await result.filter(r => r.assignee.some(user => user.id == params.userId));
    }
    return await result;
  }

  async findTopTodo() {
    return await this.tasksRepository.createQueryBuilder('t')
                                      .where({status: Status.TODO})
                                      .orWhere({status: Status.PROGRESS})
                                      .andWhere({dueDate: MoreThanOrEqual(new Date())})
                                      .orderBy("t.dueDate", "ASC")
                                      .skip(1)
                                      .limit(10)
                                      .getMany();
  }

  async findMyCreated(headers: IncomingHttpHeaders) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    return await this.tasksRepository
                    .createQueryBuilder('t')
                    .andWhere({createdBy: myId})
                    .leftJoinAndSelect("t.assignee", "user")
                    .getMany();
  }

  async findToMe(headers: IncomingHttpHeaders) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    let result = await this.tasksRepository
                    .createQueryBuilder('t')
                    .leftJoinAndSelect("t.assignee", "user")
                    .getMany();
    if(myId) {
      return await result.filter(r => r.assignee.some(user => user.id == myId));
    }
  }

  async makeToDo(headers: IncomingHttpHeaders, id: number) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    if(await this.checkIsMyCreated(myId, id)) {
      return await this.updateQuery
                      .set({ status: Status.TODO })
                      .where("id = :id", { id: id })
                      .execute();
    } else {
      throw new BadRequestException();
    }
  }

  async makeInProgress(headers: IncomingHttpHeaders, id: number) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    if(await this.checkIsMyCreated(myId, id)) {
      return await this.updateQuery
                      .set({ status: Status.PROGRESS })
                      .where("id = :id", { id: id })
                      .execute();
    } else {
      throw new BadRequestException();
    }
  }

  async makeDone(headers: IncomingHttpHeaders, id: number) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    if(await this.checkIsMyCreated(myId, id)) {
      return await this.updateQuery
                      .set({ status: Status.DONE })
                      .where("id = :id", { id: id })
                      .execute();
    } else {
      throw new BadRequestException();
    }
  }

  async remove(headers: IncomingHttpHeaders, id: number) {
    const myId = await this.authService.getUsersCredentials(headers).userId;
    const task = await this.tasksRepository.findOne({where: {id: id}});
    if(task) {
      if(task.createdBy == myId) {
        return await this.tasksRepository.delete({id});
      } else {
        throw new ForbiddenException('you are not allowed to delete content');
      }
    }
  }

  async findUser(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({where: {id: id}});
  }

  async checkIsMyCreated(myId: number, id: number): Promise<boolean> {
    const task = await this.tasksRepository.findOne({where: {id: id}});
    if(task) {
      return await task.createdBy == myId;
    } else {
      return await false;
    }
  }
}
