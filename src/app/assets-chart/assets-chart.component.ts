import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4themes_animated from "@amcharts/amcharts4/themes/animated.js"

@Component({
  selector: 'app-assetschart',
  templateUrl: './assets-chart.component.html',
  styleUrls: ['./assets-chart.component.scss']
})
export class AssetschartComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // Create chart
    var chart = am4core.create("chartdiv", am4charts.XYChart);

    var data = [];
    var price1 = 1000, price2 = 1200, price3 = 1400;
    var quantity = 30000;
    for (var i = 0; i < 360; i++) {
      price1 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({ site_ref_key:"TEPSOL_SITE_001",asset_ref_key:"TEPSOL_SITE_001_110101",meas_name:"Measure1",meas_date:new Date(2017, 0, i), meas_time:"some time", num_v:price1 });
    }
    for (var i = 0; i < 360; i++) {
      price2 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({ site_ref_key:"TEPSOL_SITE_001",asset_ref_key:"TEPSOL_SITE_001_110101",meas_name:"Measure2",meas_date2:new Date(2017, 0, i), meas_time:"some time", num_v2:price2 });
    }
    for (var i = 0; i < 360; i++) {
      price3 += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
      data.push({ site_ref_key:"TEPSOL_SITE_001",asset_ref_key:"TEPSOL_SITE_001_110101",meas_name:"Measure3",meas_date3:new Date(2017, 0, i), meas_time:"some time", num_v3:price3 });
    }

    chart.data = data;

    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.labels.template.fill = am4core.color("#e59165");

    var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis2.renderer.grid.template.location = 0;
    dateAxis2.renderer.labels.template.fill = am4core.color("#");

    var dateAxis3 = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis3.renderer.grid.template.location = 0;
    dateAxis3.renderer.labels.template.fill = am4core.color("#dfee36");

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

    valueAxis.renderer.minWidth = 60;

    var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
    valueAxis2.renderer.minWidth = 60;
    valueAxis2.syncWithAxis = valueAxis;

    var valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis3.tooltip.disabled = true;
    valueAxis3.renderer.labels.template.fill = am4core.color("#dfee36");
    valueAxis3.renderer.minWidth = 60;
    valueAxis3.syncWithAxis = valueAxis;

    var series = chart.series.push(new am4charts.LineSeries());
    series.name = "Measure1";
    series.dataFields.dateX = "meas_date";
    series.dataFields.valueY = "num_v";
    series.tooltipText = "{valueY.value}";
    series.fill = am4core.color("#e59165");
    series.stroke = am4core.color("#e59165");
    //series.strokeWidth = 3;

    var series2 = chart.series.push(new am4charts.LineSeries());
    series2.name = "Measure2";
    series2.dataFields.dateX = "meas_date2";
    series2.dataFields.valueY = "num_v2";
    series2.yAxis = valueAxis2;
    series2.xAxis = dateAxis2;
    series2.tooltipText = "{valueY.value}";
    series2.fill = am4core.color("#dfcc64");
    series2.stroke = am4core.color("#dfcc64");
    //series2.strokeWidth = 3;

    var series3 = chart.series.push(new am4charts.LineSeries());
    series3.name = "Measure3";
    series3.dataFields.dateX = "meas_date3";
    series3.dataFields.valueY = "num_v3";
    series3.yAxis = valueAxis3;
    series3.xAxis = dateAxis3;
    series3.tooltipText = "{valueY.value}";
    series3.fill = am4core.color("#dfee36");
    series3.stroke = am4core.color("#dfee36");

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis2;

    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.zIndex = 100;

    valueAxis3.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis3.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
    dateAxis.renderer.grid.template.strokeOpacity = 0.07;
    valueAxis.renderer.grid.template.strokeOpacity = 0.07;
  }

}
