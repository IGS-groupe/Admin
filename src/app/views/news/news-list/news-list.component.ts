import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for pipes
import { Router } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { NewsItem } from '../../../models/news';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  newsItems: NewsItem[] = [];

  constructor(private router: Router, private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getAll().subscribe((data) => {
      this.newsItems = data;
    });
  }

  goToCreate(): void {
    this.router.navigate(['/news-create']);
  }

  editNews(id: number): void {
    this.router.navigate(['/news', 'edit', id]); // ✅ CORRECT

  }

  deleteNews(id: number): void {
    if (confirm('Are you sure you want to delete this news item?')) {
      this.newsService.delete(id).subscribe(() => {
        this.newsItems = this.newsItems.filter(item => item.id !== id);
      });
    }
  }
}
