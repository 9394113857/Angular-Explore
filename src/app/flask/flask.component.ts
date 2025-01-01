import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlaskService } from '../flask.service'; // Import FlaskService
import { interval, Subscription, throwError } from 'rxjs';
import { switchMap, catchError, delayWhen } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http'; // For better error handling

interface Mobile {
  id?: number | null;
  name: string;
  price: number;
  ram: number;
  storage: number;
}

@Component({
  selector: 'app-flask',
  templateUrl: './flask.component.html',
  styleUrls: ['./flask.component.css']
})
export class FlaskComponent implements OnInit, OnDestroy {
  formHeader: string = "Add Mobile";
  mobiles: Mobile[] = [];
  mobileName: string = "";
  price: number = 0;
  ram: number = 0;
  storage: number = 0;
  showForm: boolean = false;
  id: number | null = null;
  private refreshSubscription: Subscription | undefined;

  constructor(private flaskService: FlaskService) {} // Inject FlaskService here

  ngOnInit(): void {
    this.getMobiles();
    this.setupDataRefresh();
  }

  // Refresh mobile data every minute
  private setupDataRefresh() {
    const refreshIntervalMs = 60000; // 1 minute
    let disconnected = false;

    this.refreshSubscription = interval(refreshIntervalMs)
      .pipe(
        switchMap(() => {
          if (disconnected) {
            return throwError('Disconnected from server');
          }
          return this.flaskService.fetchMobiles().pipe(
            catchError(() => {
              disconnected = true;
              return throwError('Disconnected from server');
            })
          );
        }),
        delayWhen(() => {
          if (disconnected) {
            return interval(refreshIntervalMs);
          }
          return interval(0);
        })
      )
      .subscribe(
        (data: Mobile[]) => {
          this.mobiles = data;
          disconnected = false;
        },
        (error: any) => {
          console.log('Error fetching mobiles:', error);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  // Fetch mobile data initially
  getMobiles() {
    this.flaskService.fetchMobiles().subscribe(
      (data: Mobile[]) => {
        this.mobiles = data;
      },
      (error: any) => {
        console.log("Error fetching mobiles:", error);
      }
    );
  }

  // Delete a mobile by ID
  deleteMobile(id: number | null) {
    if (id !== null && id !== undefined) {
      const confirmDelete = confirm("Are you sure you want to delete this mobile?");
      if (confirmDelete) {
        this.flaskService.deleteMobile(id).subscribe(
          () => {
            this.getMobiles();
            alert('Mobile deleted successfully');
          },
          (error: HttpErrorResponse) => {
            console.log("Error deleting mobile:", error);
          }
        );
      }
    }
  }

  // Open the form for adding or editing a mobile
  openForm(data: Mobile | null = null) {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.mobileName = data.name;
      this.price = data.price;
      this.ram = data.ram;
      this.storage = data.storage;
      this.id = data.id !== undefined ? data.id : null;
      this.formHeader = "Edit Mobile";
    } else {
      this.id = null;
      this.formHeader = "Add Mobile";
    }
  }

  // Close the form
  closeForm() {
    this.showForm = false;
    this.clearForm();
  }

  // Clear form fields
  clearForm() {
    this.mobileName = "";
    this.price = 0;
    this.ram = 0;
    this.storage = 0;
    this.id = null;
  }

  // Save or update a mobile
  saveMobile() {
    let body: Mobile = {
      name: this.mobileName,
      price: this.price,
      ram: this.ram,
      storage: this.storage
    };

    if (this.id !== null) {
      const confirmUpdate = confirm("Are you sure you want to update this mobile?");
      if (confirmUpdate) {
        body.id = this.id;
        this.flaskService.putMobile(this.id, body).subscribe(
          () => {
            this.getMobiles();
            alert("Mobile updated successfully!");
          },
          (error: any) => {
            console.log("Error updating mobile:", error);
          }
        );
      } else {
        this.clearForm();
      }
    } else {
      this.flaskService.postMobile(body).subscribe(
        () => {
          this.getMobiles();
          alert("Mobile added successfully!");
        },
        (error: any) => {
          console.log("Error adding mobile:", error);
        }
      );
    }

    this.showForm = false;
  }

  // Check if there is data
  hasData(): boolean {
    return this.mobiles && this.mobiles.length > 0;
  }

  // Check if there is an error (empty dataset)
  hasError(): boolean {
    return !this.mobiles || this.mobiles.length === 0;
  }
}
