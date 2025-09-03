// demande-excel-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DemandeExcelFile, DemandeExcelService } from '../../services/demande-excel.service';
import { DemandeService } from '../../services/demande.service';
import { AnalysisStatus } from '../../models/AnalysisStatus.enum';

@Component({
  selector: 'app-demande-excel-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './demande-excel-list.component.html',
  styleUrls: ['./demande-excel-list.component.scss']
})
export class DemandeExcelListComponent implements OnInit {
  demandeId = 0;

  // excel files
  files: DemandeExcelFile[] = [];
  loading = false;
  errorMsg = '';

  // upload
  singleFile?: File;
  multiFiles: File[] = [];
  uploading = false;

  // status controls
  AnalysisStatus = AnalysisStatus;
  selectedStatut: AnalysisStatus | null = null;
  statusOptions = [
    { label: AnalysisStatus.REQUEST_SUBMITTED,    value: AnalysisStatus.REQUEST_SUBMITTED },
    { label: AnalysisStatus.PARTIAL_RESULTS,      value: AnalysisStatus.PARTIAL_RESULTS },
    { label: AnalysisStatus.SAMPLE_REJECTED,      value: AnalysisStatus.SAMPLE_REJECTED },
    { label: AnalysisStatus.EXCEEDS_NORM,         value: AnalysisStatus.EXCEEDS_NORM },
    { label: AnalysisStatus.RECEIVED_IN_PROGRESS, value: AnalysisStatus.RECEIVED_IN_PROGRESS },
    { label: AnalysisStatus.COMPLETE_RESULTS,     value: AnalysisStatus.COMPLETE_RESULTS },
    { label: AnalysisStatus.NOT_POTABLE,          value: AnalysisStatus.NOT_POTABLE }
  ];

  constructor(
    private route: ActivatedRoute,
    private excelSrv: DemandeExcelService,
    private demandeSrv: DemandeService
  ) {}

  ngOnInit(): void {
    const paramId = Number(this.route.snapshot.paramMap.get('demandeId'));
    const queryId = Number(this.route.snapshot.queryParamMap.get('demandeId'));
    this.demandeId = Number.isFinite(paramId) && paramId > 0 ? paramId : (Number.isFinite(queryId) ? queryId : 0);

    const etatParam = this.route.snapshot.queryParamMap.get('etat');
    if (etatParam && (AnalysisStatus as any)[etatParam]) {
      this.selectedStatut = (AnalysisStatus as any)[etatParam] as AnalysisStatus;
    }

    if (this.demandeId > 0) {
      this.loadFiles();
    } else {
      this.errorMsg = 'Invalid demandeId. Provide it as a route param or query param.';
    }
  }

  // ---------- Files ----------
  loadFiles(): void {
    this.loading = true;
    this.errorMsg = '';
    this.excelSrv.listFiles(this.demandeId).subscribe({
      next: (data) => { this.files = data; this.loading = false; },
      error: (err) => { this.loading = false; this.errorMsg = 'Failed to load files.'; console.error(err); }
    });
  }

  onSingleFileChange(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    this.singleFile = input.files && input.files.length ? input.files[0] : undefined;
  }

  onMultiFilesChange(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    this.multiFiles = input.files ? Array.from(input.files) : [];
  }

  // NEW: used by template
  clearSingle(): void {
    this.singleFile = undefined;
    const el = document.getElementById('singleFile') as HTMLInputElement | null;
    if (el) el.value = '';
  }

  // NEW: used by template
  clearMulti(): void {
    this.multiFiles = [];
    const el = document.getElementById('multiFiles') as HTMLInputElement | null;
    if (el) el.value = '';
  }
  get selectedStatusLabel(): string {
  const opt = this.statusOptions.find(o => o.value === this.selectedStatut);
  return opt?.label ?? 'Selected';
}
  // NEW: used by template
  getMultiFilesTitle(): string {
    if (!this.multiFiles?.length) return 'No files selected';
    const names = this.multiFiles.map(f => f.name);
    return names.length <= 5 ? names.join(', ') : `${names.slice(0, 5).join(', ')}, +${names.length - 5} more`;
  }

  uploadSingle(): void {
    if (!this.singleFile) return;
    this.uploading = true;
    this.excelSrv.uploadSingle(this.demandeId, this.singleFile).subscribe({
      next: () => {
        this.uploading = false;
        this.clearSingle();
        this.loadFiles();
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = this.extractErrMsg(err);
        console.error(err);
      }
    });
  }

  uploadMany(): void {
    if (!this.multiFiles.length) return;
    this.uploading = true;
    this.excelSrv.uploadMany(this.demandeId, this.multiFiles).subscribe({
      next: () => {
        this.uploading = false;
        this.clearMulti();
        this.loadFiles();
      },
      error: (err) => {
        this.uploading = false;
        this.errorMsg = this.extractErrMsg(err);
        console.error(err);
      }
    });
  }

  deleteFile(file: DemandeExcelFile): void {
    if (!confirm(`Delete ${file.originalName}?`)) return;
    this.excelSrv.deleteFile(file.id).subscribe({
      next: () => this.loadFiles(),
      error: (err) => { this.errorMsg = 'Failed to delete file.'; console.error(err); }
    });
  }

  // ---------- Status ----------
  updateAllDemandeStatuses(newStatut: AnalysisStatus): void {
    if (!newStatut) return;
    const key = Object.keys(AnalysisStatus).find(k => (AnalysisStatus as any)[k] === newStatut);
    if (!key) return;

    this.demandeSrv.updateState(this.demandeId, key)
      .then(() => {})
      .catch((err: any) => {
        this.errorMsg = this.extractErrMsg(err);
        console.error(err);
      });
  }

  // ---------- Helpers ----------
  extractErrMsg(err: any): string {
    if (err?.error?.message) return err.error.message;
    if (err?.error) return typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
    if (err?.message) return err.message;
    return 'Unexpected error';
  }

  asKb(size: number): string {
    if (!size && size !== 0) return '';
    return (size / 1024).toFixed(1) + ' KB';
  }
}
