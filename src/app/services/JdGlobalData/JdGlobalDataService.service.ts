import { Injectable } from '@angular/core';
import { JdData } from './JdGlobalDataService.model'; // Update the path based on your directory structure

@Injectable({
  providedIn: 'root',
})
export class JdGlobalDataService {
  private positionName: string = '';
  private departmentName: string = '';
  private jdLink: string = '';

  constructor() {}

  setData(positionName: string, departmentName: string, jdLink: string) {
    this.positionName = positionName;
    this.departmentName = departmentName;
    this.jdLink = jdLink;
  }

  getData(): JdData {
    return {
      positionName: this.positionName,
      departmentName: this.departmentName,
      jdLink: this.jdLink,
    };
  }
}
