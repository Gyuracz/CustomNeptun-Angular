export interface Semester{

    id: number;
    name: string;
    start: string;
    end: string;
    subjectIds: Array<number>;
    subjectNames: Array<string>;

}
