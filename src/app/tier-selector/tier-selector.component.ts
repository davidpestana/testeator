import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { LoaddataService } from '../loaddata.service';

@Component({
  selector: 'app-tier-selector',
  standalone: true,
  imports: [MatSelectModule],
  templateUrl: './tier-selector.component.html',
  styleUrl: './tier-selector.component.sass'
})
export class TierSelectorComponent {

  constructor(private dataload:LoaddataService){
    this.tiers = this.dataload.tiers
  }

  tiers: any[] = [
  ];

  change({value}:any) {
    value ==='all'? 
      this.dataload.loadAll() :
      this.dataload.load(value.file);
  }
}
