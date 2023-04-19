import { Semester } from "src/app/semester/semester.model";

export class SemesterTable{
    public static semesters: Array<Semester> = [
        {
            id: 1,
            name: "2022/23/1",
            start: "2022-09-1",
            end: "2023-01-31",
            subjectIds: [1, 3]
        },
        {
            id: 2,
            name: "2022/23/2",
            start: "2023-02-01",
            end: "2023-06-30",
            subjectIds: [2, 4, 5]
        }
    ]
}
