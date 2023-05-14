import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { InstructorTable } from 'src/assets/db/instructors';
import { SemesterTable } from 'src/assets/db/semesters';
import { StudentTable } from 'src/assets/db/students';
import { SubjectTable } from 'src/assets/db/subjects';
import { UsersTable } from 'src/assets/db/users';

@Injectable({
  providedIn: 'root'
})
export class DbService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const db = {
      users: UsersTable.users,
      // instructors: InstructorTable.instructors,
      semesters: SemesterTable.semesters,
      // students: StudentTable.students,
      subjects: SubjectTable.subjects
    }
    return db;
  }

}
