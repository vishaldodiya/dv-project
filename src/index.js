import Map from "./map";
import Restaurant from "./restaurant";
import HeatMap from "./heatmap";
import User from "./user";
import bubbleChart from "./bubble-chart";

Map.load();
Map.plotMarker();

Restaurant.load();

HeatMap.load();
User.load();
bubbleChart.load();