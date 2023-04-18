import { Department } from "./department.enum";

export class Subject{

    private name: string;
    private code: string;
    private credit: number;
    private department: Department;

    public constructor(name: string, code: string, credit: number, department: Department){
        this.name = name;
        this.code = code;
        this.credit = credit;
        this.department = department;
    }

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getCode(){
        return this.code;
    }

    public setCode(code: string){
        this.code = code;
    }

    public getCredit(){
        return this.credit;
    }

    public setCredit(credit: number){
        this.credit = credit;
    }

    public getDepartment(){
        return this.department;
    }

    public setDepartment(department: Department){
        this.department = department;
    }

}
