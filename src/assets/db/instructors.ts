import { Post } from "src/app/instructor/post.enum";
import { Instructor } from "src/app/instructor/instructor.model";

export class InstructorTable{
    public static instructors: Array<Instructor> = [
        {
            id: 1,
            neptun: "ABC123",
            name: "Instructor Bob",
            email: "bob.instructor@uni.com",
            post: Post.ADJUNKTUS,
            subjectIds: [1, 2, 5],
            subjectNames: []
        },
        {
            id: 2,
            neptun: "ABC456",
            name: "Instructor John",
            email: "john.instructor@uni.com",
            post: Post.DOCENS,
            subjectIds: [3],
            subjectNames: []
        },
        {
            id: 3,
            neptun: "ABC789",
            name: "Instructor Kálmán",
            email: "kalman.instructor@uni.com",
            post: Post.TANARSEGED,
            subjectIds: [4],
            subjectNames: []
        }
    ];
}
