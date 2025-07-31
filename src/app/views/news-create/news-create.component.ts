    import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http'; // ✅ ADD THIS
    import { NewsService } from '../../services/news.service';
import { Router } from '@angular/router';

    @Component({
      selector: 'app-news-create',
      standalone: true,
      imports: [CommonModule, FormsModule, HttpClientModule], // ✅ ADD HttpClientModule here
      templateUrl: './news-create.component.html',
      styleUrls: ['./news-create.component.scss']
    })
    export class NewsCreateComponent {
      newsForm = {
        title: '',
        slug: '',
        date: '',
        content: ''
      };

      selectedImage!: File;

      constructor(private newsService: NewsService,private router: Router) {}

      onImageSelected(event: any): void {
        this.selectedImage = event.target.files[0];
      }

      handleSubmit(): void {
        const formData = new FormData();
        formData.append('title', this.newsForm.title);
        formData.append('slug', this.newsForm.slug);
        formData.append('date', this.newsForm.date);
        formData.append('content', this.newsForm.content);
        if (this.selectedImage) {
          formData.append('image', this.selectedImage);
        }

        this.newsService.create(formData).subscribe({
          next: (response) => {
            this.router.navigate(['/news' ]);
          },
          error: (err) => {
            console.error('Error creating news:', err);
          }
        });
      }
    }
