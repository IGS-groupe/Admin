import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent implements OnInit {
  clientForm: FormGroup;
  clientId: number;
  generalError: string = '';
  profileError: string = '';
  logoFile: File | null = null;
  logoPreview: string | ArrayBuffer | null = null;
  clientImageUrl: string | null = null;  // <-- store imageUrl from backend

  constructor(private fb: FormBuilder, private clientService: UserService, private route: ActivatedRoute, private router: Router) {
    this.clientId = 0;

    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    // this.checkAuthentication();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.clientId = Number(idParam);
        this.loadClientData();
      }
    });
  }
    // if (this.clientId) {
    //   this.clientService.getUserById(this.clientId).subscribe({
    //     next: (client: User) => {
    //       this.clientForm.patchValue(client);

    //       // store existing imageUrl (nullable)
    //       if (client.imageUrl) {
    //         this.clientImageUrl = client.imageUrl;
    //       }
    //     },
    //     error: () => (this.generalError = 'Failed to fetch client details.')
    //   });
    // }
  
  loadClientData() {
  this.clientService.getUserById(this.clientId).subscribe({
    next: (client: User) => {
      this.clientForm.patchValue(client);
      this.clientImageUrl = client.imageUrl || null;
    },
    error: () => this.generalError = 'Failed to fetch client details.'
  });
}
  // checkAuthentication() {
  //   if (!this.clientId) {
  //     this.generalError = 'Client not authenticated.';
  //   }
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.logoFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.logoPreview = reader.result);
      reader.readAsDataURL(this.logoFile);
    }
  }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.profileError = 'Please fill all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.clientForm.value.firstName);
    formData.append('lastName', this.clientForm.value.lastName);
    formData.append('phoneNumber', this.clientForm.value.phoneNumber);
    formData.append('email', this.clientForm.value.email);

    if (this.logoFile) {
      formData.append('logo', this.logoFile);
    }

    this.clientService.updateUserWithFile(this.clientId, formData).subscribe({
      next: () => {
        this.profileError = '';
        if (this.logoFile) {
          this.clientImageUrl = this.logoPreview as string;
          this.logoPreview = null;
        }
        this.router.navigate(['/client-table']);
      },
      error: () => (this.profileError = 'Failed to update client profile.')
    });
  }


  resetForm() {
    this.clientForm.reset();
    this.logoFile = null;
    this.logoPreview = null;
  }
}
