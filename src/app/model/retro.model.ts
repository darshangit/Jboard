export interface RetroModel {
    sprintUUID?: number;
    sprintNo: number;
    startDate: Date;
    endDate: Date;
    startComment: string;
    stopComment: string;
    continueComment: string;
    moreComment: string;
    lessComment: string;
    actionItemsComment: string;
    createTimeStamp: Date;
    loginName?: string;
}
