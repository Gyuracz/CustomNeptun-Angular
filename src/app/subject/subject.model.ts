import { Department } from "./department.enum";

export interface Subject{

    id: number;
    name: string;
    code: string;
    credit: number;
    department: Department;

}
