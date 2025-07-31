import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewsService } from '../../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  constructor(private newsService: NewsService,private router: Router,) {}

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

    this.newsService.create(formData).subscribe(() => {
      this.router.navigate(['/news' ]); // Redirect to the news list after successful creation
      });
  }
}
