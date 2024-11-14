import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaddataService {

  tiers = [
    { title: '1 - Conceptos de la nube', file: 'data/tier1.json' },
    { title: '2.1 - Modelo de responsabilidad compartida', file: 'data/tier2.1.json' },
    { title: '2.2 - Seguridad, gobernanza y conformidad', file: 'data/tier2.2.json' },
    { title: '2.3 - Administración de acceso en AWS', file: 'data/tier2.3.json' },
    { title: '2.4 - Componentes y recursos de seguridad', file: 'data/tier2.4.json' },
    { title: '3.1 - Métodos de despliegue y funcionamiento en AWS', file: 'data/tier3.1.json'},
    { title: '3.2 - Infraestructura global de AWS', file: 'data/tier3.2.json'},
    { title: '3.3 - Servicios de computación de AWS', file: 'data/tier3.3.json'},
    { title: '3.4 - Bases de datos en AWS', file: 'data/tier3.4.json'},
    { title: '3.5 - Servicios de red de AWS', file: 'data/tier3.5.json'},
    { title: '3.6 - Servicios de almacenamiento de AWS', file: 'data/tier3.6.json'},
    { title: '3.7 - Inteligencia artificial y machine learning (IA/ML) y servicios de análisis ', file: 'data/tier3.7.json'},
    { title: '3.8 - Servicios de otras categorías de servicios de AWS', file: 'data/tier3.8.json'},

  ];
  

  data$ = new BehaviorSubject<any[]>([])

  constructor(private http:HttpClient) { }

  get data() {
    return this.data$.asObservable();
  }

  load(file: string) {
      this.http.get<any[]>(file)
        .pipe(
          map((data: any) => {
            this.data$.next(data.questions);
          })
        ).subscribe();
  }
  
  loadAll() {
    const requests = this.tiers.map(tier => 
      this.http.get<any>(tier.file).pipe(map(data => data.questions))
    );
    forkJoin(requests).subscribe((results: any[][]) => {
      const allQuestions = results.flat();
      this.data$.next(allQuestions);
    });
  }
}
