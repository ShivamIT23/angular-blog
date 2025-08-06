import { Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-photo',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './change-photo.component.html',
  styleUrl: './change-photo.component.css',
})
export class ChangePhotoComponent implements OnDestroy {
  previousPhoto: string | null = null;
  photo: File | null = null;
  photoPreview: string | ArrayBuffer | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  loading = false;

  private subscriptions = new Subscription();

  constructor(private usersService: UsersService) {
    this.subscriptions.add(
      this.usersService.userImage$.subscribe((img) => {
        this.previousPhoto = img ?? '/profile.jpg';
      })
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.photo = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result;
      };
      reader.readAsDataURL(this.photo);
    }
  }

  onChangePhoto() {
    if (!this.photo) {
      this.errorMessage = 'Please select a photo';
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('photo', this.photo);
    this.usersService
      .changePhoto(formData)
      .then((res: any) => {
        this.photoPreview = null;
        if (res.success) {
          this.successMessage = 'Photo uploaded successfully.';
        } else {
          this.errorMessage = 'Something went wrong while uploading.';
        }
      })
      .catch((err: any) => {
        this.errorMessage =
          err.error.detail || 'Something went wrong while uploading.';
      })
      .finally(() => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = '';
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
