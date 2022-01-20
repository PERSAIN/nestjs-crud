import { Injectable } from '@nestjs/common';
import { ITask, TaskStatusEnum } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTaskFilterDto): ITask[] {
    const { status, search } = filterDto;
    let Tasks = this.getAllTasks();
    if (status) {
      Tasks.filter((item) => item.status === status);
    }
    if (search) {
      Tasks = Tasks.filter((item) => {
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
          ? true
          : false;
      });
    }
    return Tasks;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((item) => item.id === id);
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatusEnum) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createtask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;
    const task: ITask = {
      id: uuid(),
      title,
      description,
      status: TaskStatusEnum.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
