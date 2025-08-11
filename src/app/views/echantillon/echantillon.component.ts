import { Component, OnInit ,AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {EchantillonService} from '../../services/echantillon.service';
import { Echantillon } from '../../models/echantillon.model';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-echantillon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ add these
  templateUrl: './echantillon.component.html',
  styleUrl: './echantillon.component.scss'
})
export class EchantillonComponent {
echantillonForm!: FormGroup;
  echantillons: Echantillon[] = [];
  demandeId!: number;
  submitted = false;
  loading: boolean = true;
  error = '';
  successmsg = false;
  messageError = '';
  typesEchantillons = [
    { display: 'B - Brine', value: 'B_BRINE' },
    { display: 'MW - Marine Water', value: 'MW_MARINE_WATER' },
    { display: 'W - Water', value: 'W_WATER' },
    { display: 'C - Ore Conc.', value: 'C_ORE_CONC' },
    { display: 'O - Other (specify)', value: 'O_OTHER_SPECIFY' },
    { display: 'P - Pulp', value: 'P_PULP' },
    { display: 'LS - Lake Sediment', value: 'LS_LAKE_SEDIMENT' },
    { display: 'HMC - Heavy Minerals Concentrate', value: 'HMC_HEAVY_MINERALS_CONCENTRATE' },
    { display: 'R - Rock', value: 'R_ROCK' },
    { display: 'CR - Crushed Rock', value: 'CR_CRUSHED_ROCK' },
    { display: 'DC - Drill Core', value: 'DC_DRILL_CORE' },
    { display: 'H - Humus', value: 'H_HUMUS' },
    { display: 'S - Soil', value: 'S_SOIL' },
    { display: 'V - Vegetation', value: 'V_VEGETATION' },
    { display: 'SS - Stream Sediment', value: 'SS_STREAM_SEDIMENT' }
  ];
  retours = [
    { display: 'After 60 days ($0.30/sample/month)', value: 'RETURN_60_DAYS' },
    { display: 'After 90 days ($0.15/sample/month)', value: 'RETURN_90_DAYS' },
    { display: 'After 3 months ($0.20/sample/month)', value: 'RETURN_3_MONTHS' },
    { display: 'After 30 days ($0.20/sample/month)', value: 'RETURN_30_DAYS' }
  ];
  
  disposers = [
    { display: 'Dispose after 60 days ($0.30/sample/month)', value: 'DISPOSE_60_DAYS' },
    { display: 'Analysis after 90 days ($0.15/sample/month)', value: 'ANALYSIS_90_DAYS' },
    { display: 'Dispose after 3 months ($0.20/sample/month)', value: 'DISPOSE_3_MONTHS' },
    { display: 'Dispose after 30 days ($0.20/sample/month)', value: 'DISPOSE_30_DAYS' }
  ];  
  priorites = [
    { display: 'Standard', value: 'STANDARD' },
    { display: 'Se précipiter', value: 'RUSH' },
  ];

  constructor(private fb: FormBuilder, private echantillonService: EchantillonService, private route: ActivatedRoute, private router: Router,private toastr: ToastrService ) {}

  ngOnInit(): void {
    this.echantillonForm = this.fb.group({
      echantillonId: [''], // Required field
      typeEchantillon: ['', Validators.required], // Required field
      nomEchantillon: ['', Validators.required], // Required field with minimum length
      lieuPrelevement: ['', Validators.required], // Required field
      addressRetourner: ['', Validators.required], // Example for a pattern, adjust as necessary
      dateFinPrelevement: ['', Validators.required], // Required field
      heureFinPrelevement: ['', Validators.required], // Required field
      priorite: [''],
      disposes: ['', Validators.required], // Required field
      returns: ['', Validators.required], // Required field
      commentairesInternes: [''],
      // demandeId: [this.demandeId] // Required and use the initialized demandeId
    });
    this.loadExistingData();
  }
  ngAfterViewInit(): void {
    // Initialize the tooltip for the radio buttons
    $(function () {
      ($('[data-toggle="tooltip"]') as any).tooltip();
    });
  }
  
  loadExistingData() {
    const existingData = localStorage.getItem('echantillonFormData');
    this.echantillons = existingData ? JSON.parse(existingData) : [];
  }
  navigateToPrevious(){
    this.router.navigate(['/EchantillonForm']);
  }

  onSubmit() {
    // Make sure to load the existing data before checking form validity.
    this.loadExistingData();
    if (this.echantillonForm.valid) {
      const formValue = this.echantillonForm.value;
      // Assuming 'this.echantillons' is already loaded with existing data
      formValue.echantillonId = this.echantillons.length + 1;
      this.echantillons.push(formValue);
      localStorage.setItem('echantillonFormData', JSON.stringify(this.echantillons));
      console.log(formValue);
      // Navigate after submission
      this.router.navigate(['/EchantillonForm'], { queryParams: { echantillonId: formValue.echantillonId }});
      // Hide modal if using Bootstrap jQuery plugins
      ($('#exampleModalCenter') as any).modal('hide');
    } else {
      // Use Angular's toast service for error handling
      this.toastr.error('Please validate your sample form.', '', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        closeButton: true
      });
    }
  }
  
}
