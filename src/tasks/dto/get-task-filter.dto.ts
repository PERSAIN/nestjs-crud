import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatusEnum } from '../task.model';

export class GetTaskFilterDto {
  @IsOptional()
  @IsEnum(TaskStatusEnum)
  status?: TaskStatusEnum;

  @IsOptional()
  @IsString()
  search?: string;
}
