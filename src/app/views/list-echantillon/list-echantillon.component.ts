import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EchantillonService } from 'src/app/services/echantillon.service';
import { Echantillon } from 'src/app/models/echantillon.model';

@Component({
  selector: 'app-list-echantillon',
  standalone: true,
  imports: [CommonModule], // Include CommonModule here
  templateUrl: './list-echantillon.component.html',
  styleUrls: ['./list-echantillon.component.scss']
})
export class ListEchantillonComponent implements OnInit {
  echantillons: Echantillon[] = [];
  demandeId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private echantillonService: EchantillonService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.demandeId= params['demandeId'];
    });
    console.log(this.demandeId);
    this.echantillonService.getEchantillonsByDemandeId(this.demandeId).then(echantillon => {
      this.echantillons = echantillon;;
    }).catch(error => {
      console.error('Failed to load demandes:', error);
    });
    }
  }

  // fetchEchantillons() {
  //   this.echantillonService.getEchantillonsByDemandeId(this.demandeId)
  //     .then(data => {
  //       this.echantillons = data;
  //       console.log(this.echantillons);
  //     })
  //     .catch(error => {
  //       console.error('Failed to load echantillons:', error);
  //     });
  // }
// }
