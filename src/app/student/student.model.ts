import { Department } from "./department.enum";
import { Subject } from "../subject/subject.model";

export class Student {

    private neptun: string;
    private name: string;
    private email: string;
    private department: Department;
    private subjects: Array<Subject>;

    public constructor(neptun: string, name: string, email: string, department: Department, subjects: Array<Subject>){
        this.neptun = neptun;
        this.name = name;
        this.email = email;
        this.department = department;
        this.subjects = subjects;
    }

    public getNeptun(){
        return this.neptun;
    }

    public setNeptun(neptun: string){
        this.neptun = neptun;
    }

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getEmail(){
        return this.email;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public getDepartment(){
        return this.department;
    }

    public setDepartment(department: Department){
        this.department = department;
    }

    public getSubjects(){
        return this.subjects;
    }

    public setSubjects(subjects: Array<Subject>){
        this.subjects = subjects;
    }

}
