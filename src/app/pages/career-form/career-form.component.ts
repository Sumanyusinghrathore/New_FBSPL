import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  Inject,
  SecurityContext,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { SeoService } from '../../services/seo/seo.service';
import { SeoData } from '../../services/seo/seo-data.model';
import { NoNumbersDirective } from '../../directives/noNumbers.directive';
import { OnlyNumbersDirective } from '../../directives/onlyNumbers.directive';
import { careerFormService } from '../../services/careerForm/careerForm.service';
import { JdGlobalDataService } from '../../services/JdGlobalData/JdGlobalDataService.service';
import { JdData } from '../../services/JdGlobalData/JdGlobalDataService.model';
import { MediaUploadService } from '../../services/mediaUpload/mediaUpload.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { OnlyDecimalNumbersDirective } from '../../directives/onlyDecimalNumbers.directive';
import {
  customEmailValidator,
  exactLengthValidator,
  fileExtensionValidator,
  requiredButNotAllowBlank,
} from '../../utils/Validator';
import { CdnUrlDirective } from '../../directives/cdn-url.directive';

@Component({
  selector: 'app-career-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    NoNumbersDirective,
    OnlyNumbersDirective,
    OnlyDecimalNumbersDirective,
    CdnUrlDirective,
  ],
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css'],
})
export class CareerFormComponent implements OnInit, OnDestroy {
  @ViewChild('top') top!: ElementRef;
  PositionDetails!: FormGroup;
  PersonalDetails!: FormGroup;
  EducationDetails!: FormGroup;
  WorkExperience!: FormGroup;
  submitted = false;
  ResumefilePath: string = '';
  ImagefilePath: string = '';
  currentFormIndex = 0;
  stateList = [
    'Andaman & Nicobar',
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chandigarh',
    'Chhattisgarh',
    'Dadra & Nagar Haveli',
    'Daman & Diu',
    'Delhi',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jammu & Kashmir',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Lakshadweep',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Pondicherry',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Tripura',
    'Uttar Pradesh',
    'Uttaranchal',
    'West Bengal',
    'Telangana',
    'Ladakh',
  ];
  yearsList: number[] = [];
  isFocused: boolean = false;
  dobValue: string = '';
  maxDate: string = '';
  minDate: string = '';
  aadhaarValue: string = '';
  PhotofileName: string | null = null;
  ResumefileName: string | null = null;
  safeResumeUrl!: SafeUrl;
  safeImageUrl!: SafeUrl;
  erpData: JdData | undefined;
  nextSatDate: String = '';
  allowedResumeExtensions = ['pdf', 'doc', 'docx'];
  allowedPictureExtensions = ['jpg', 'png'];
  constructor(
    private formBuilder: FormBuilder,
    private seoService: SeoService,
    @Inject(DOCUMENT) private document: Document,
    private formSubmissionService: careerFormService,
    private dataService: JdGlobalDataService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private uploadService: MediaUploadService
  ) {}

  ngOnInit(): void {
    const seoData: SeoData = {
      title: 'Career Application Form - Apply Now | FBSPL',
      description:
        'Join FBSPL’s innovative and dynamic team! Fill out our application form and start on a rewarding career journey with us. Apply now!',
      keywords:
        'career apply form, job application form, apply for a career, career opportunities, job openings',
      ogImage: '/Career/CareerApplyFormBanner.jpg',
    };
    this.seoService.setMetaTags(seoData);

    this.loadErpData();
    this.nextSatDate = this.getNextSaturday().toDateString();
    this.setMaxDate();
    this.setMinDate();
    this.createForms();
    // Add beforeunload event listener only if window is defined
    if (this.document.defaultView) {
      this.document.defaultView.addEventListener(
        'beforeunload',
        this.beforeUnloadListener.bind(this)
      );
    }
  }

  loadErpData(): void {
    this.erpData = this.dataService.getData();
    if (
      !this.erpData.positionName ||
      !this.erpData.departmentName ||
      !this.erpData.jdLink
    ) {
      this.router.navigate(['/careers/current-openings']);
    }
  }

  createForms(): void {
    this.PositionDetails = this.formBuilder.group({
      deptType: [this.erpData!.departmentName, Validators.required],
      PositionApplied: [this.erpData!.positionName, Validators.required],
      jdLink: [this.erpData!.jdLink],
      WillingnessforNightShift: ['', [Validators.required, onlyYes]],
      SourceOfInformationType: ['', requiredButNotAllowBlank()],
      jobportalname: [''],
      socialmedianame: [''],
      R1Person: [''],
      R1Designation: [''],
      R1Contact: [''],
      campusname: [''],
      campuslocation: [''],
      DateOfInterview: [this.nextSatDate],
    });

    this.PositionDetails.get('SourceOfInformationType')?.valueChanges.subscribe(
      (value) => {
        this.updatePositionDetailField(value);
      }
    );

    this.PersonalDetails = this.formBuilder.group({
      firstName: ['', requiredButNotAllowBlank()],
      lastName: ['', requiredButNotAllowBlank()],
      fatherName: ['', requiredButNotAllowBlank()],
      gender: ['', requiredButNotAllowBlank()],
      dob: ['', requiredButNotAllowBlank()],
      maritalStatus: ['', requiredButNotAllowBlank()],
      spouseName: [''],
      aadhaar: ['', requiredButNotAllowBlank()],
      email: ['', [requiredButNotAllowBlank(), customEmailValidator]],
      mobile: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      home_phone: ['', [requiredButNotAllowBlank(), exactLengthValidator(10)]],
      currentAddress: ['', requiredButNotAllowBlank()],
      permanentAddress: ['', requiredButNotAllowBlank()],
      State: ['', requiredButNotAllowBlank()],
      permanentState: ['', requiredButNotAllowBlank()],
      City: ['', requiredButNotAllowBlank()],
      permanentCity: ['', requiredButNotAllowBlank()],
      pin: ['', [requiredButNotAllowBlank(), exactLengthValidator(6)]],
      permanentPin: ['', [requiredButNotAllowBlank(), exactLengthValidator(6)]],
      permanentAddressSame: false,
      image_url: ['', [fileExtensionValidator(this.allowedPictureExtensions)]],
      resume_url: ['', [fileExtensionValidator(this.allowedResumeExtensions)]],
    });

    this.PersonalDetails.get('maritalStatus')!.valueChanges.subscribe(
      (value) => {
        this.updateSpouseNameValidator(value);
      }
    );

    this.PersonalDetails.get('permanentAddressSame')!.valueChanges.subscribe(
      (value) => {
        this.onCheckboxChange(value);
      }
    );

    this.EducationDetails = this.formBuilder.group({
      SchoolName10th: ['', requiredButNotAllowBlank()],
      Board10th: ['', requiredButNotAllowBlank()],
      Percentage10th: [
        '',
        [Validators.required, numberGreaterThan45, maxPercentageValidator(100)],
      ],
      YearofPassing10th: ['', requiredButNotAllowBlank()],
      SchoolName12th: ['', requiredButNotAllowBlank()],
      Board12th: ['', requiredButNotAllowBlank()],
      Percentage12th: [
        '',
        [Validators.required, numberGreaterThan45, maxPercentageValidator(100)],
      ],
      YearofPassing12th: ['', requiredButNotAllowBlank()],
      GraduationDegree: ['', Validators.required],
      Graduation_Status_of_Completion: ['', requiredButNotAllowBlank()],
      GPercentage: [''],
      GBoard: [''],
      GYearofPassing: [''],
      GCurrentSemester: ['Final Semester'],
      GCurrentPassingYear: [''],
      PostGraduation: ['', Validators.required],
      PostGraduation_Status_of_Completion: [''],
      PostGraduationDegree: [''],
      PBoard: [''],
      PPercentage: [''],
      PYearofPassing: [''],
      PCurrentSemester: ['Final Semester'],
      PCurrentPassingYear: [''],
      otherCouseEnrolled: ['', Validators.required],
      otherCourses: [''],
      OStatus: [''],
    });
    this.EducationDetails.get(
      'Graduation_Status_of_Completion'
    )!.valueChanges.subscribe((value) => {
      this.setGraduationValidators(value);
    });
    this.EducationDetails.get('PostGraduation')!.valueChanges.subscribe(
      (value) => {
        this.setPostGraduationValidators(value);
      }
    );
    this.EducationDetails.get(
      'PostGraduation_Status_of_Completion'
    )!.valueChanges.subscribe((value) => {
      this.setPostGraduationStatusValidators(value);
    });

    this.EducationDetails.get('otherCouseEnrolled')!.valueChanges.subscribe(
      (value) => {
        this.toggleValidators(
          this.EducationDetails,
          value,
          'otherCourses',
          'OStatus'
        );
      }
    );

    this.WorkExperience = this.formBuilder.group({
      isExperienced: ['', Validators.required],
      WE1CompanyName: [''],
      WE1Departement: [''],
      WE1RoleandResposibilities: [''],
      WE1LastDrawnSalary: [''],
      WE1ExperienceInYears: [''],
      previouslyWorked: ['', Validators.required],
    });

    this.WorkExperience.get('isExperienced')!.valueChanges.subscribe(
      (value) => {
        if (value === 'Yes') {
          this.WorkExperience.get('WE1ExperienceInYears')!.setValidators(
            Validators.required
          );
        } else {
          this.WorkExperience.get('WE1ExperienceInYears')!.clearValidators();
        }
        this.WorkExperience.get(
          'WE1ExperienceInYears'
        )!.updateValueAndValidity();
        this.toggleValidators(
          this.WorkExperience,
          value,
          'WE1CompanyName',
          'WE1Departement',
          'WE1RoleandResposibilities',
          'WE1LastDrawnSalary'
        );
      }
    );
  }

  get PositionDetailsf() {
    return this.PositionDetails.controls;
  }
  get PersonalDetailsf() {
    return this.PersonalDetails.controls;
  }
  get EducationDetailsf() {
    return this.EducationDetails.controls;
  }
  get WorkExperiencef() {
    return this.WorkExperience.controls;
  }

  ngOnDestroy(): void {
    // Remove beforeunload event listener only if window is defined
    if (this.document.defaultView) {
      this.document.defaultView.removeEventListener(
        'beforeunload',
        this.beforeUnloadListener.bind(this)
      );
    }
  }

  // Method to handle beforeunload event
  beforeUnloadListener(event: BeforeUnloadEvent): string {
    // Custom message to warn the user
    const message =
      'Are you sure you want to leave? Changes you made may not be saved.';
    event.returnValue = message;
    return message;
  }

  toggleValidators(form: FormGroup, condition: string, ...fields: string[]) {
    fields.forEach((field) => {
      const control = form.get(field);
      if (condition === 'Yes') {
        control!.setValidators([requiredButNotAllowBlank()]);
      } else {
        control!.clearValidators();
      }
      control!.updateValueAndValidity();
    });
  }

  validateForm(form: FormGroup): void {
    console.log(this.PersonalDetailsf['image_url']);
    console.log(this.PersonalDetailsf['image_url'].errors);
    this.submitted = true;
    if (this.currentFormIndex === 0) {
      if (this.PositionDetails.invalid) {
        return;
      }
    }
    if (this.currentFormIndex === 1) {
      if (this.PersonalDetails.invalid) {
        return;
      }
    }
    if (this.currentFormIndex === 2) {
      if (this.EducationDetails.invalid) {
        return;
      }
    }
    if (this.currentFormIndex === 3) {
      if (this.WorkExperience.invalid) {
        return;
      }
    }
    // Move to the next form
    this.currentFormIndex++;

    // If all forms are filled, do something (e.g., submit the data)
    if (this.currentFormIndex == 4) {
      this.submitData();
    }
    this.top.nativeElement.scrollIntoView({ top: -20, behavior: 'smooth' });
    this.submitted = false;
  }

  createYearList(): void {
    const DOB = this.PersonalDetails.get('dob')!.value;
    if (DOB) {
      const DOBYEAR = new Date(DOB).getFullYear();
      const currentYear = new Date().getFullYear();
      for (let year = currentYear; year >= DOBYEAR; year--) {
        this.yearsList.push(year);
      }
    }
  }

  submitData(): void {
    const formData = {
      ...this.PositionDetails.value,
      ...this.PersonalDetails.value,
      ...this.EducationDetails.value,
      ...this.WorkExperience.value,
    };
    if (formData.aadhaar) {
      formData.aadhaar = formData.aadhaar.replace(/-/g, '');
    }

    this.formSubmissionService.postData(formData).subscribe(
      (response) => {
        console.log('Form submitted successfully!', response);
        const string = JSON.stringify(response);
        console.log(string);
        // Decode the response using atob
        const decodedResponse = btoa(string);

        // // Navigate to the thank you page with the query string
        this.router.navigate(['/career-apply-thankyou'], {
          queryParams: { q: decodedResponse },
        });
      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    );
  }

  getNextSaturday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilNextSaturday = (6 - dayOfWeek + 7) % 7;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilNextSaturday);
    return nextSaturday;
  }

  onPhotoFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.PersonalDetails.patchValue({ image_url: file });
      this.PhotofileName = this.trimFileName(file.name);

      if (this.PersonalDetails.get('image_url')!.valid) {
        this.uploadService.uploadFile(file).subscribe(
          (response) => {
            this.ImagefilePath = response.media;
            this.safeImageUrl = this.sanitizer.bypassSecurityTrustUrl(
              this.ImagefilePath
            );
            const urlString =
              this.sanitizer.sanitize(SecurityContext.URL, this.safeImageUrl) ||
              '';
            this.PersonalDetails.patchValue({
              image_url: urlString,
            });
            console.log('Upload successful:', response);
          },
          (error) => {
            console.error('Upload failed:', error);
          }
        );
      }
    }
  }
  onResumeFileSelected(event: any): void {
    console.log(this.PersonalDetails.get('resume_url'));
    const file: File = event.target.files[0];
    if (file) {
      this.PersonalDetails.patchValue({ resume_url: file });
      this.ResumefileName = this.trimFileName(file.name);

      if (this.PersonalDetails.get('resume_url')!.valid) {
        this.uploadService.uploadFile(file).subscribe(
          (response) => {
            this.ResumefilePath = response.media;
            this.safeResumeUrl = this.sanitizer.bypassSecurityTrustUrl(
              this.ResumefilePath
            );
            const urlString =
              this.sanitizer.sanitize(
                SecurityContext.URL,
                this.safeResumeUrl
              ) || '';
            this.PersonalDetails.patchValue({
              resume_url: urlString,
            });
            console.log('Upload successful:', response);
          },
          (error) => {
            console.error('Upload failed:', error);
          }
        );
      }
    }
  }
  trimFileName(fileName: string): string {
    const parts = fileName.split('.');
    const extension = parts.pop();
    const namePart = parts.join('.');

    // Split the name part into words
    const words = namePart.split('');

    // Trim the words array to the first 10 words
    const trimmedWords = words.slice(0, 10);

    // Join the trimmed words and add the extension back
    const trimmedFileName = trimmedWords.join('') + '...' + extension;
    return trimmedFileName;
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  goToBackForm() {
    this.currentFormIndex--;
    this.top.nativeElement.scrollIntoView({ top: -20, behavior: 'smooth' });
  }

  onCheckboxChange(isChecked: boolean) {
    if (isChecked) {
      this.PersonalDetails.patchValue({
        permanentAddress: this.PersonalDetails.get('currentAddress')!.value,
        permanentState: this.PersonalDetails.get('State')!.value,
        permanentCity: this.PersonalDetails.get('City')!.value,
        permanentPin: this.PersonalDetails.get('pin')!.value,
      });
    } else {
      this.PersonalDetails.patchValue({
        permanentAddress: '',
        permanentState: '',
        permanentCity: '',
        permanentPin: '',
      });
    }
  }

  setMaxDate() {
    const dtToday = new Date();
    const month = dtToday.getMonth() + 1; // jan=0; feb=1 ...
    const day = dtToday.getDate();
    const year = dtToday.getFullYear() - 18;
    this.maxDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  }

  setMinDate() {
    const dtToday = new Date();
    const month = dtToday.getMonth() + 1; // January = 0; February = 1 ...
    const day = dtToday.getDate();
    const year = dtToday.getFullYear();
    this.minDate = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;
  }

  formatAadhaar(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    const formattedValue = value.match(/.{1,4}/g)?.join('-') || value; // Add hyphens every 4 digits
    this.aadhaarValue = formattedValue;
  }

  filteredYearsList(previousControlName: string): number[] {
    const previousValue = this.EducationDetails.get(previousControlName)!.value;
    if (previousValue) {
      return this.yearsList.filter((year) => year > previousValue);
    }
    return this.yearsList;
  }

  getProgressWidth(): string {
    const percentage = (this.currentFormIndex / 3) * 100;
    return `${percentage}%`;
  }

  updateSpouseNameValidator(value: string) {
    const spouseName = this.PersonalDetails.get('spouseName');

    if (value === 'Married') {
      spouseName?.setValidators(requiredButNotAllowBlank());
    } else {
      spouseName?.clearValidators();
    }
    spouseName?.updateValueAndValidity();
  }

  setPostGraduationValidators(status: string) {
    const PostGraduationDegree = this.EducationDetails.get(
      'PostGraduationDegree'
    );
    const PostGraduation_Status_of_Completion = this.EducationDetails.get(
      'PostGraduation_Status_of_Completion'
    );
    const PCurrentPassingYear = this.EducationDetails.get(
      'PCurrentPassingYear'
    );
    const PYearofPassing = this.EducationDetails.get('PYearofPassing');
    const PPercentage = this.EducationDetails.get('PPercentage');
    const PBoard = this.EducationDetails.get('PBoard');

    if (status === 'yes') {
      PostGraduationDegree?.setValidators([Validators.required]);
      PostGraduation_Status_of_Completion?.setValidators([
        requiredButNotAllowBlank(),
      ]);
    } else if (status === 'no') {
      PostGraduationDegree?.clearValidators();
      PostGraduation_Status_of_Completion?.clearValidators();
      PYearofPassing?.clearValidators();
      PCurrentPassingYear?.clearValidators();
      PPercentage?.clearValidators();
      PBoard?.clearValidators();
      PYearofPassing?.updateValueAndValidity();
      PPercentage?.updateValueAndValidity();
      PBoard?.updateValueAndValidity();
    } else {
      PostGraduationDegree?.clearValidators();
      PostGraduation_Status_of_Completion?.clearValidators();
      PYearofPassing?.clearValidators();
      PCurrentPassingYear?.clearValidators();
      PPercentage?.clearValidators();
      PBoard?.clearValidators();
      PYearofPassing?.updateValueAndValidity();
      PPercentage?.updateValueAndValidity();
      PBoard?.updateValueAndValidity();
    }

    PostGraduationDegree?.updateValueAndValidity();
    PostGraduation_Status_of_Completion?.updateValueAndValidity();
  }
  setPostGraduationStatusValidators(status: string) {
    const PBoard = this.EducationDetails.get('PBoard');
    const PPercentage = this.EducationDetails.get('PPercentage');
    const PYearofPassing = this.EducationDetails.get('PYearofPassing');
    const PCurrentSemester = this.EducationDetails.get('PCurrentSemester');
    const PCurrentPassingYear = this.EducationDetails.get(
      'PCurrentPassingYear'
    );

    if (status === 'Completed') {
      PBoard?.setValidators([requiredButNotAllowBlank()]);
      PPercentage?.setValidators([
        Validators.required,
        numberGreaterThan45,
        maxPercentageValidator(100),
      ]);
      PYearofPassing?.setValidators([requiredButNotAllowBlank()]);
      PCurrentSemester?.clearValidators();
      PCurrentPassingYear?.clearValidators();
    } else if (status === 'Result Awaited') {
      PCurrentSemester?.setValidators([requiredButNotAllowBlank()]);
      PCurrentPassingYear?.setValidators([requiredButNotAllowBlank()]);
      PBoard?.clearValidators();
      PPercentage?.clearValidators();
      PYearofPassing?.clearValidators();
    } else {
      PBoard?.clearValidators();
      PPercentage?.clearValidators();
      PYearofPassing?.clearValidators();
      PCurrentSemester?.clearValidators();
      PCurrentPassingYear?.clearValidators();
    }

    PBoard?.updateValueAndValidity();
    PPercentage?.updateValueAndValidity();
    PYearofPassing?.updateValueAndValidity();
    PCurrentSemester?.updateValueAndValidity();
    PCurrentPassingYear?.updateValueAndValidity();
  }
  setGraduationValidators(status: string) {
    const GPercentage = this.EducationDetails.get('GPercentage');
    const GBoard = this.EducationDetails.get('GBoard');
    const GYearofPassing = this.EducationDetails.get('GYearofPassing');
    const GCurrentSemester = this.EducationDetails.get('GCurrentSemester');
    const GCurrentPassingYear = this.EducationDetails.get(
      'GCurrentPassingYear'
    );

    if (status === 'Completed') {
      GPercentage?.setValidators([
        Validators.required,
        numberGreaterThan45,
        maxPercentageValidator(100),
      ]);
      GBoard?.setValidators([requiredButNotAllowBlank()]);
      GYearofPassing?.setValidators([requiredButNotAllowBlank()]);
      GCurrentSemester?.clearValidators();
      GCurrentPassingYear?.clearValidators();
    } else if (status === 'Result Awaited') {
      GPercentage?.clearValidators();
      GBoard?.clearValidators();
      GYearofPassing?.clearValidators();
      GCurrentSemester?.setValidators([requiredButNotAllowBlank()]);
      GCurrentPassingYear?.setValidators([requiredButNotAllowBlank()]);
    } else {
      GPercentage?.clearValidators();
      GBoard?.clearValidators();
      GYearofPassing?.clearValidators();
      GCurrentSemester?.clearValidators();
      GCurrentPassingYear?.clearValidators();
    }

    GPercentage?.updateValueAndValidity();
    GBoard?.updateValueAndValidity();
    GYearofPassing?.updateValueAndValidity();
    GCurrentSemester?.updateValueAndValidity();
    GCurrentPassingYear?.updateValueAndValidity();
  }

  updatePositionDetailField(value: string) {
    const jobportalname = this.PositionDetails.get('jobportalname');
    const socialmedianame = this.PositionDetails.get('socialmedianame');
    const R1Person = this.PositionDetails.get('R1Person');
    const R1Designation = this.PositionDetails.get('R1Designation');
    const R1Contact = this.PositionDetails.get('R1Contact');
    const campusname = this.PositionDetails.get('campusname');
    const campuslocation = this.PositionDetails.get('campuslocation');

    // Clear all validators
    jobportalname?.clearValidators();
    socialmedianame?.clearValidators();
    R1Person?.clearValidators();
    R1Designation?.clearValidators();
    R1Contact?.clearValidators();
    campusname?.clearValidators();
    campuslocation?.clearValidators();

    // Set validators based on the selected value
    switch (value) {
      case 'Job Portals':
        jobportalname?.setValidators(requiredButNotAllowBlank());
        break;
      case 'Social Media':
        socialmedianame?.setValidators(requiredButNotAllowBlank());
        break;
      case 'Referral':
        R1Person?.setValidators(requiredButNotAllowBlank());
        R1Designation?.setValidators(requiredButNotAllowBlank());
        R1Contact?.setValidators([
          requiredButNotAllowBlank(),
          exactLengthValidator(10),
        ]);
        break;
      case 'Campus':
        campusname?.setValidators(requiredButNotAllowBlank());
        campuslocation?.setValidators(requiredButNotAllowBlank());
        break;
    }

    // Update the form controls to apply the new validators
    jobportalname?.updateValueAndValidity();
    socialmedianame?.updateValueAndValidity();
    R1Person?.updateValueAndValidity();
    R1Designation?.updateValueAndValidity();
    R1Contact?.updateValueAndValidity();
    campusname?.updateValueAndValidity();
    campuslocation?.updateValueAndValidity();
  }

  limitInputLength(
    event: Event,
    formGroup: FormGroup,
    controlName: string,
    maxLength: number
  ): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Limit to a maximum length
    if (value.length > maxLength) {
      value = value.slice(0, maxLength);
      formGroup.get(controlName)?.setValue(value); // Update form control value
    }
  }
}
function maxPercentageValidator(max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value > max) {
      return { maxPercentage: true };
    }
    return null;
  };
}

function numberGreaterThan45(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  // Check if the value is a number and greater than 45
  if (isNaN(value) || value < 45) {
    return { numberGreaterThan45: true };
  }
  return null;
}
function onlyYes(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value !== 'Yes') {
    return { onlyYes: true };
  }
  return null;
}
