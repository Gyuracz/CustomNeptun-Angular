import { Post } from "./post.enum";
import { Subject } from "../subject/subject.model";

export class Instructor{

    private neptun: string;
    private name: string;
    private email: string;
    private post: Post;
    private subjects: Array<Subject>;

    public constructor(neptun: string, name: string, email: string, post: Post, subjects: Array<Subject>){
        this.neptun = neptun;
        this.name = name;
        this.email = email;
        this.post = post;
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

    public getPost(){
        return this.post;
    }

    public setPost(post: Post){
        this.post = post;
    }

    public getSubjects(){
        return this.subjects;
    }

    public setSubjects(subjects: Array<Subject>){
        this.subjects = subjects;
    }

}
