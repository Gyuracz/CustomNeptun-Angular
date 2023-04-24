export interface User{

    id: number;
    neptun: string;
    name: string;
    email: string;
    birth: string;
    departmentOfInstructor: string;
    postOfInstructor: string;
    departmentOfStudent: string;
    subjectIds: Array<number>;
    subjectNames: Array<string>;
    roles: Array<string>;
    password: string;

}