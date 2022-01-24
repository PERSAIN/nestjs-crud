import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../task.model';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;

}
