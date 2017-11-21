export interface SprintPlanningModel {
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
