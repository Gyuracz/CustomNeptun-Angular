import { Department } from "./department.enum";

export interface Student {

    id: number;
    neptun: string;
    name: string;
    email: string;
    department: Department;
    subjectIds: Array<number>;
    subjectNames: Array<string>;

}
