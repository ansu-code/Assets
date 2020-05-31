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
isChecked:boolean=false;
  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
// Themes begin
//am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv", am4charts.XYChart);
chart.paddingRight = 40;

var data = [];
var value = 50;
var value2 = 50;
for (let i = -730; i < 0; i++) {
  for(let j = 0; j < 24; j++)
  {
    let date = new Date();
  
  date.setDate(i);
  date.setHours(j, 0, 0, 0);
  value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  if (value < 0) {
    value = Math.round(Math.random() * 10);
  }
  value2 -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  if (value2 < 0) {
    value2 = Math.round(Math.random() * 10);
  }
  data.push({ date: date, value: value,unit:'kwh', value2: value2,unit2:'mwh'  });
  
} 
}

// for (let i = -730; i < 0; i++) {
//   for(let j = 0; j < 24; j++)
//   {
//     let date = new Date();
  
//   date.setDate(i);
//   date.setHours(j, 0, 0, 0);
//   value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
//   if (value < 0) {
//     value = Math.round(Math.random() * 10);
//   }
//   data.push({ date2: date, value2: value,unit2:'mwh' });
// } 
// }
console.log(JSON.stringify(data));

chart.data = data;

var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.grid.template.location = 0;
dateAxis.renderer.labels.template.fill = am4core.color("#e59165");
dateAxis.groupData=true;
dateAxis.groupCount=12;

var dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
dateAxis2.renderer.grid.template.location = 0;
dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
dateAxis2.groupData=true;
dateAxis2.groupCount=12;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.labels.template.fill = am4core.color("#e59165");

valueAxis.renderer.minWidth = 60;

var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis2.tooltip.disabled = true;
valueAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
valueAxis2.renderer.minWidth = 60;
valueAxis2.syncWithAxis = valueAxis;

var series = chart.series.push(new am4charts.LineSeries());
series.name = "Measure1";
series.dataFields.dateX = "date";
series.dataFields.valueY = "value";
series.tooltipText = "{valueY.value} {unit}";
series.fill = am4core.color("#e59165");
series.stroke = am4core.color("#e59165");
series.tensionX = 0.8;
//series.strokeWidth = 3;

var series2 = chart.series.push(new am4charts.LineSeries());
series2.name = "Measure2";
series2.dataFields.dateX = "date";
series2.dataFields.valueY = "value2";
series2.yAxis = valueAxis2;
series2.xAxis = dateAxis2;
series2.tooltipText = "{valueY.value} {unit2}";
series2.fill = am4core.color("#dfcc64");
series2.stroke = am4core.color("#dfcc64");
series2.tensionX = 0.8;
//series2.strokeWidth = 3;

chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis2;

var scrollbarX = new am4charts.XYChartScrollbar();
//scrollbarX.series.push(series);
//scrollbarX.series.push(series2);
chart.scrollbarX = scrollbarX;
//chart.scrollbarX.thumb.minWidth = 50;

chart.legend = new am4charts.Legend();
chart.legend.parent = chart.plotContainer;
chart.legend.zIndex = 100;

valueAxis2.renderer.grid.template.strokeOpacity = 0.07;
dateAxis2.renderer.grid.template.strokeOpacity = 0.07;
dateAxis.renderer.grid.template.strokeOpacity = 0.07;
valueAxis.renderer.grid.template.strokeOpacity = 0.07;
//dateAxis.renderer.labels.template.disabled = true;
dateAxis2.renderer.labels.template.disabled = true;


//dateAxis.events.on("startchanged", categoryAxisZoomed);
//dateAxis.events.on("endchanged", categoryAxisZoomed);
dateAxis.events.on("rangechangeended",categoryAxisZoomed)

//valueAxis.align = "right";
function categoryAxisZoomed(ev) {
  var axis = ev.target;
  var start = axis.getPositionLabel(axis.start);
  var end = axis.getPositionLabel(axis.end);
  console.log("New range: " + start + " -- " + end);
}
var self = this;
//chart.leftAxesContainer.layout = "horizontal";
//alert(chart.leftAxesContainer.layout);
document.getElementById("chkStack").addEventListener("change", function() {
  
  if(self.isChecked)
  {
    chart.leftAxesContainer.layout = "vertical";
    //valueAxis.marginTop = 10;
    valueAxis.marginBottom = 20;
    

  }
  else
  {
    chart.leftAxesContainer.layout = "horizontal";
    
    
    //chart.data = data;
    
//valueAxis.marginTop = 10;
//valueAxis.marginBottom = 0;

  }
});

document.getElementById("chkStack").addEventListener("click", function() {
 
}

  }
  }
