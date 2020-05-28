import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

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
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.paddingRight = 40;

var data = [];
var value = 50;
for (let i = -7300; i < 0; i++) {
  for(let j = 0; j < 24; j++)
  {
    let date = new Date();
  date.setHours(j, 0, 0, 0);
  date.setDate(i);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  if (value < 0) {
    value = Math.round(Math.random() * 10);
  }
  data.push({ date: date, value: value });

  }
  
}

chart.data = data;

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 60;
dateAxis.groupData = true;
console.log(dateAxis.groupCount);

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "value";
series.dataFields.dateX = "date";
series.tooltipText = "{value}"

series.tooltip.pointerOrientation = "vertical";

chart.cursor = new am4charts.XYCursor();
chart.cursor.snapToSeries = series;
chart.cursor.xAxis = dateAxis;

chart.scrollbarX = new am4core.Scrollbar();

  } 
  }
