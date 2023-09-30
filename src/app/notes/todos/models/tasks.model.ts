

export class ITaskModel {
    name: string;
    date: any;
    status?: string;
    category?: string;
    taskId?: string;
    id?: string;
    
    constructor(record: any) {
        this.name = record.name.toLowerCase();
        this.date = record.date;
        this.status = record.status;
        this.taskId = record.taskId;
    }
}