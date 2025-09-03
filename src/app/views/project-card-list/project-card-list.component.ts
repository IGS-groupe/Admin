// src/app/views/project-card-list/project-card-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectCard, ProjectCardService } from '../../services/project-card.service';

@Component({
  standalone: true,
  selector: 'app-project-card-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-card-list.component.html',
  styleUrls: ['./project-card-list.component.scss']
})
export class ProjectCardListComponent implements OnInit {
  projects: ProjectCard[] = [];
  loading = false;
  errorMsg = '';

  titleFilter = '';
  categoryFilter = '';

  constructor(private svc: ProjectCardService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.errorMsg = '';
    this.svc.list().subscribe({
      next: (rows) => { this.projects = rows || []; this.loading = false; },
      error: (err) => { this.errorMsg = 'Failed to load projects'; this.loading = false; console.error(err); }
    });
  }

  filteredProjects(): ProjectCard[] {
    const t = this.titleFilter.trim().toLowerCase();
    const c = this.categoryFilter.trim().toLowerCase();
    return this.projects.filter(p =>
      (t ? p.title.toLowerCase().includes(t) : true) &&
      (c ? (p.category || '').toLowerCase().includes(c) : true)
    );
  }

  deleteProject(id: number): void {
    if (!confirm('Delete this project?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.fetch(),
      error: (err) => { this.errorMsg = 'Failed to delete project'; console.error(err); }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/project-cards/create']);
  }
}
