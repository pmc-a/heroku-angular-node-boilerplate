import { Component, OnInit } from '@angular/core';
import { Technology } from '../technology';
import { DataService } from '../data.service';

@Component({
  selector: 'app-technology-list',
  templateUrl: './technology-list.component.html',
  styleUrls: ['./technology-list.component.css']
})
export class TechnologyListComponent implements OnInit {
  technologies: Technology[] = [];
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getTechnologies();
  }

  private getTechnologies() {
    this.dataService.getPharmacists()
    .subscribe(
      response => {
        this.technologies = response;
      },
      error => {
        this.errorMessage = error.error;
      }
    );
  }
}
