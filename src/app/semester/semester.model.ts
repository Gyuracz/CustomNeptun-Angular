import { Subject } from "../subject/subject.model";

export class Semester{

    private name: string;
    private start: string;
    private end: string;
    private subjects: Array<Subject>;

    public constructor(name: string, start: string, end: string, subjects: Array<Subject>){
        this.name = name;
        this.start = start;
        this.end = end;
        this.subjects = subjects;
    }

    public getName(){
        return this.name;
    }

    public setName(name: string){
        this.name = name;
    }

    public getStart(){
        return this.start;
    }

    public setStart(start: string){
        this.start = start;
    }

    public getEnd(){
        return this.end;
    }

    public setEnd(end: string){
        this.end = end;
    }

    public getSubjects(){
        return this.subjects;
    }

    public setSubjects(subjects: Array<Subject>){
        this.subjects = subjects;
    }

}
