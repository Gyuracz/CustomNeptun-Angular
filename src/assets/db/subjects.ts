import { Department } from "src/app/subject/department.enum";
import { Subject } from "src/app/subject/subject.model";

export class SubjectTable{
    public static subjects: Array<Subject> = [
        {
            id: 1,
            name: "Programozás 1",
            code: "VEMIPROG1",
            credit: 5,
            department: Department.RSZT
        },
        {
            id: 2,
            name: "Programozás 2",
            code: "VEMIPROG2",
            credit: 5,
            department: Department.RSZT
        },
        {
            id: 3,
            name: "Diszkrét és folytonos dinamikus rendszerek",
            code: "VEMIDISK1",
            credit: 5,
            department: Department.VIRT
        },
        {
            id: 4,
            name: "Professzionális nagyvállalati hálózati technológiák",
            code: "VEMICCNP1",
            credit: 6,
            department: Department.VIRT
        },
        {
            id: 5,
            name: "Haladó web alapú programfejlesztés",
            code: "VEMIANGULAR1",
            credit: 6,
            department: Department.RSZT
        }
    ]
}
