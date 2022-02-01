import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  search?: string;
}
