import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  countries = [
    {
      name: "Indonesia",
      cities: ["Jakarta", "Bandung", "Tangerang"]
    },
    {
      name: "United States",
      cities: ["New York", "Chicago", "Washington"]
    },
    {
      name: "Germany",
      cities: ["Berlin", "Hamburg", "Melbourne"]
    },
    {
      name: "Pakistan",
      cities: ["Lahore", "Karachi", "Islamabad"]
    }
  ];

  countryControl: FormControl;
  cityControl: FormControl;
  cities$: Observable<String>;

  constructor(private router: Router) {
    this.cityControl = new FormControl('');
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(value => {
        this.router.navigate([value]);
      });

    this.countryControl = new FormControl('');

    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
  }

  

}

