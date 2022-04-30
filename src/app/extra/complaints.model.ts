export class Complaint {
    complaintId?: number;
    complaintDate: string;
    complaintStudentId: number | string;
    complaintStudentName?: string;
    complaintStudentImage?: string;
    complaintClass?: string;
    complaintbatch?: string;
    complaintMessages: string;
}