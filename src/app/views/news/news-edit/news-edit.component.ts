import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsItem } from '../../../models/news';
import { NewsService } from '../../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.scss']
})
export class NewsEditComponent implements OnInit {
  newsId!: string;
  newsItem!: NewsItem;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id')!;
    console.log('News ID:', this.newsId);
    this.newsService.getById(this.newsId).subscribe(data => {
      this.newsItem = data;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  handleUpdate(): void {
    this.newsService.updateNews(this.newsItem.id, this.newsItem, this.selectedFile!).subscribe(() => {
      this.router.navigate(['/news' ]);
    });
  }
}
