import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
// Import your library
import { FormWizardModule } from 'angular2-wizard';
import { DropdownModule } from 'primeng/primeng';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyService } from './my.service';
import { TableModule } from 'primeng/table';
import { TimingPointMapService } from '../timing-point-map.service';

class HttpClientMock {
  get = () =>
    timer(2000).pipe(
      map(() => [
        {
          id: 'm1',
          name: 'menu1',
          val: 'D',
          items: [
            {
              id: 'd1',
              name: 'datanested1',
              val: 'D',
              items: [
                { id: '1', name: 'direct Data', val: 'E' },
                { id: '2', name: 'test', val: 'E' },
              ],
            },
          ],
        },
        {
          id: 'd2',
          name: 'menu2',
          val: 'D',
          items: [
            { id: '21', name: 'test21', val: 'E' },
            { id: '22', name: 'test23', val: 'E' },
          ],
        },
        {
          id: 'd3',
          name: 'menu3',
          val: 'D',
          items: [
            { id: '31', name: 'test data 3', val: 'E' },
            { id: '32', name: 'test data 4', val: 'E' },
          ],
        },
      ])
    );
}
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AutoCompleteModule,
    BreadcrumbModule,
    FormWizardModule,
    DropdownModule,
    TableModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    { provide: HttpClient, useClass: HttpClientMock },
    MyService,
    TimingPointMapService,
  ],
})
export class AppModule {}
