import { IsEnum } from 'class-validator';
import { TaskStatusEnum } from '../task-status.enum';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatusEnum)
  status: TaskStatusEnum;
}
