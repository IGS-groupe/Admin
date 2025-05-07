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
  newsSlug!: string;
  newsItem!: NewsItem;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newsSlug = this.route.snapshot.paramMap.get('slug')!;
    this.newsService.getNewsBySlug(this.newsSlug).subscribe(data => {
      this.newsItem = data;
    });
  }

  handleUpdate(): void {
    this.newsService.updateNews(this.newsSlug, this.newsItem).subscribe(() => {
      alert('News updated successfully!');
      this.router.navigate(['/news-list']);
    });
  }
}
