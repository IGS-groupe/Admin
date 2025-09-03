import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectCard, ProjectCardService } from '../../services/project-card.service';

@Component({
  selector: 'app-project-card-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-card-create.component.html',
  styleUrls: ['./project-card-create.component.scss']
})
export class ProjectCardCreateComponent {

  saving = false;
  errorMsg = '';
  successMsg = '';

  // form model (template-driven)
  formData: {
    title: string;
    category: string | null;
    sortIndex: number | null;
    bulletsText: string;   // one bullet per line
    active: boolean;
  } = {
    title: '',
    category: '',
    sortIndex: null,
    bulletsText: '',
    active: true
  };

  constructor(
    private cards: ProjectCardService,
    private router: Router
  ) {}

  handleSubmit(): void {
    if (!this.formData.title?.trim()) {
      this.errorMsg = 'Title is required.';
      return;
    }

    const bullets = this.formData.bulletsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const payload: ProjectCard = {
      title: this.formData.title.trim(),
      category: this.formData.category?.trim() || null,
      sortIndex: this.formData.sortIndex ?? null,
      bullets,
      active: this.formData.active
    };

    this.saving = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.cards.create(payload).subscribe({
      next: (created) => {
        this.saving = false;
        this.successMsg = 'Project card created successfully.';
        // optional: redirect to list/detail
        // this.router.navigate(['/project-cards']);
        // or reset the form:
        this.formData = { title: '', category: '', sortIndex: null, bulletsText: '', active: true };
      },
      error: (err) => {
        this.saving = false;
        this.errorMsg = this.extractErrMsg(err);
      }
    });
  }

  private extractErrMsg(err: any): string {
    return err?.error?.message || err?.error || err?.message || 'Something went wrong';
  }
}
