import { Post } from "src/app/instructor/post.enum";
import { Roles } from "src/app/login/roles.enum";
import { User } from "src/app/login/user.model";
import { Department as DepartmentOfInstructor } from "src/app/subject/department.enum";
import { Department as DepartmentOfStudent } from "src/app/student/department.enum";

export class UsersTable{

    public static users: Array<User> = [
        {
            id: 1,
            neptun: "ABC123",
            name: "Instructor Bob",
            email: "bob.instructor@customuni.hu",
            birth: "1960-10-10",
            departmentOfInstructor: DepartmentOfInstructor.VIRT,
            postOfInstructor: Post.DOCENS,
            departmentOfStudent: "",
            subjectIds: [1, 2, 5],
            subjectNames: [],
            roles: [Roles.INSTRUCTOR, Roles.ADMIN],
            password: "asd123"
        },{
            id: 2,
            neptun: "ABC456",
            name: "Instructor John",
            email: "john.instructor@customuni.hu",
            birth: "1961-10-10",
            departmentOfInstructor: DepartmentOfInstructor.RSZT,
            postOfInstructor: Post.ADJUNKTUS,
            departmentOfStudent: "",
            subjectIds: [3, 4, 5],
            subjectNames: [],
            roles: [Roles.INSTRUCTOR],
            password: "asd123"
        },
        {
            id: 3,
            neptun: "CBA123",
            name: "Student Bob",
            email: "bob.student@customuni.hu",
            birth: "2000-10-10",
            departmentOfInstructor: "",
            postOfInstructor: "",
            departmentOfStudent: DepartmentOfStudent.PROGRAMTERVEZOINFORMATIKUSBSC,
            subjectIds: [1, 2],
            subjectNames: [],
            roles: [Roles.STUDENT],
            password: "asd123"
        },
        {
            id: 4,
            neptun: "CBA456",
            name: "Student John",
            email: "john.student@customuni.hu",
            birth: "1998-10-10",
            departmentOfInstructor: "",
            postOfInstructor: "",
            departmentOfStudent: DepartmentOfStudent.MERNOKINFORMATIKUSMSC,
            subjectIds: [3, 4, 5],
            subjectNames: [],
            roles: [Roles.STUDENT],
            password: "asd123"
        },
        {
            id: 5,
            neptun: "UKH1A7",
            name: "Admin Olivér",
            email: "oliver.admin@customuni.hu",
            birth: "1999-09-17",
            departmentOfInstructor: "",
            postOfInstructor: "",
            departmentOfStudent: "",
            subjectIds: [],
            subjectNames: [],
            roles: [Roles.ADMIN],
            password: "asd123"
        }
    ];

}