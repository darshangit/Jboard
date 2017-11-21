import { SprintPlanningModel } from './sprint-planning.model';

export class SprintModelClass implements SprintPlanningModel {
    planningUuid: number;
    itemName: string;
    itemDescription: string;
    issueType: string;
    startDate: Date;
    endDate: Date;
    assignee: string;
    currentStatus: string;
    sprintNo: number;
}
