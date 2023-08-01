import {
  Component,
  ElementRef,
  QueryList,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import * as moment from 'moment';
// Chart.register(LinearScale, PointElement, Tooltip, Legend, TimeScale);
Chart.register(...registerables);

@Component({
  selector: 'app-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
})
export class DynamicChartComponent {
  @ViewChild('chartCanvas', { static: true }) chartCanvasList: ElementRef;
  @Input() data: any[] = [];
  @Input() label: string;
  @Input() title: string;
  @Input() labels: any[] = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log(this.data, this.title, this.label, this.labels);
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvasList.nativeElement.getContext('2d');

    var chart: any = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            data: this.data,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.6,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              title: function (context) {
                console.log(context[0].label);
                return moment(context[0].label).format('MMM DD, YYYY');
              },
            },
          },
          title: {
            display: true,
            text: this.title,
          },
        },
      },
    });
  }
}
