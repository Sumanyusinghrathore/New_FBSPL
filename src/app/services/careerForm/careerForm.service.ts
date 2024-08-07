import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class careerFormService {
  private apiUrl = 'https://erp.fusionfirst.com/careers';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}

// const applicantData = {
//   Board10th: 'test',
//   Board12th: 'sdfghjk',
//   City: 'Udaipur',
//   DateOfInterview: 'Sat Jun 29 2024',
//   GBoard: '',
//   GCurrentPassingYear: '2024-06-27',
//   GCurrentSemester: 'Final Semester',
//   GPercentage: '',
//   GYearofPassing: '',
//   GraduationDegree: 'BE',
//   Graduation_Status_of_Completion: 'Result Awaited',
//   OStatus: '',
//   PBoard: '',
//   PCurrentPassingYear: '',
//   PCurrentSemester: 'Final Semester',
//   PPercentage: '',
//   PYearofPassing: '',
//   Percentage10th: '60',
//   Percentage12th: '60',
//   PositionApplied: 'software Developer',
//   PostGraduation: 'no',
//   PostGraduationDegree: '',
//   PostGraduation_Status_of_Completion: '',
//   R1Contact: '',
//   R1Designation: '',
//   R1Person: '',
//   SchoolName10th: 'test',
//   SchoolName12th: 'sdfghjl',
//   SourceOfInformationType: 'Campus',
//   State: 'Andaman & Nicobar',
//   WE1CompanyName: '',
//   WE1Departement: '',
//   WE1ExperienceInYears: '',
//   WE1LastDrawnSalary: '',
//   WE1RoleandResposibilities: '',
//   WillingnessforNightShift: 'Yes',
//   YearofPassing10th: '2007',
//   YearofPassing12th: '2022',
//   aadhaar: '123456789019',
//   campuslocation: 'Udaipur',
//   campusname: 'Udaipur',
//   currentAddress: 'Udaipur',
//   deptType: 'IT/Software',
//   dob: '2006-06-26',
//   email: 'testdemo@fusionfirt.com',
//   fatherName: 'Test',
//   firstName: 'Gyanaranjan',
//   gender: 'male',
//   home_phone: '0987654321',
//   image_url: '',
//   isExperienced: 'No',
//   jdLink:
//     'https://devadmin.fbspl.com/uploads/JdFile/1719383216_TraineeAssociate.pdf',
//   jobportalname: '',
//   lastName: 'jena',
//   maritalStatus: 'Single',
//   mobile: '2345678978',
//   otherCourses: '',
//   otherCouseEnrolled: 'No',
//   permanentAddress: 'Udaipur',
//   permanentAddressSame: false,
//   permanentCity: 'Udaipur',
//   permanentPin: '123456',
//   permanentState: 'Andaman & Nicobar',
//   pin: '123456',
//   previouslyWorked: 'No',
//   resume_url: '',
//   socialmedianame: '',
//   spouseName: '',
// };
