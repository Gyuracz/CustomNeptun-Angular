import { Department } from "src/app/student/department.enum";
import { Student } from "src/app/student/student.model";

export class StudentTable{
    public static students: Array<Student> = [
        {
            id: 1,
            neptun: "CBA123",
            name: "Student Bob",
            email: "bob.student@uni.com",
            department: Department.MERNOKINFORMATIKUSBSC,
            subjectIds: [1, 2]
        },
        {
            id: 2,
            neptun: "CBA456",
            name: "Student John",
            email: "john.student@uni.com",
            department: Department.PROGRAMTERVEZOINFORMATIKUSMSC,
            subjectIds: [5]
        },
        {
            id: 3,
            neptun: "CBA789",
            name: "Student Jenő",
            email: "jeno.student@uni.com",
            department: Department.MERNOKINFORMATIKUSMSC,
            subjectIds: [3, 4, 5]
        }
    ]
}
