import { TaskStatusEnum } from '../task.model';

export class GetTaskFilterDto {
  status?: TaskStatusEnum;
  search?: string;
}
