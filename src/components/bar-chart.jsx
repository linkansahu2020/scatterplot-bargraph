import React from "react";
import graphdata from "../data/index.json";
import { useBarChart } from "../hooks";
import { useDeviceDetect } from "../hooks/device-detect";

export default function BarChart() {
  const [w] = useDeviceDetect();
  const { barData } = useBarChart(graphdata);
  const SVG_WIDTH = w > 500 ? 500 : w;
  const SVG_HEIGHT = w > 500 ? 500 : w;
  const x0 = 50;
  const xAxisLength = SVG_WIDTH - x0 * 2;

  const y0 = 50;
  const yAxisLength = SVG_HEIGHT - y0 * 2;

  const xAxisY = y0 + yAxisLength;

  const dataYMax = barData.reduce(
    (currMax, [_, dataY]) => Math.max(currMax, dataY),
    -Infinity
  );
  //   const dataYMin = barData.reduce(
  //     (currMin, [_, dataY]) => Math.min(currMin, dataY),
  //     Infinity
  //   );
  const dataYRange = dataYMax + 5 - (dataYMax % 5);

  const numYTicks = dataYRange / 5;

  const barPlotWidth = xAxisLength / barData.length;

  return (
    <div className="svg-container">
      <svg width={SVG_WIDTH + 10} height={SVG_HEIGHT}>
        {/* X axis */}
        <line
          x1={x0}
          y1={xAxisY}
          x2={x0 + xAxisLength}
          y2={xAxisY}
          stroke="grey"
        />
        <text
          x={x0 + xAxisLength + 5}
          y={xAxisY + 4}
          style={{ border: "1px solid red" }}
        >
          Alcohol
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          const yValue = Math.round(dataYRange - index * 5);

          return (
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue.toString()}
              </text>
            </g>
          );
        })}
        <text x={x0} y={y0 - 8} textAnchor="middle">
          Malic Acid
        </text>

        {/* Bar plots */}
        {barData.map(([day, dataY], index) => {
          const x = x0 + index * barPlotWidth;

          const yRatio = (dataY - 0) / dataYRange;

          const y = y0 + (1 - yRatio) * yAxisLength;
          const height = yRatio * yAxisLength;

          const sidePadding = 10;

          return (
            <g key={index}>
              <rect
                x={x + sidePadding / 2}
                y={y}
                width={barPlotWidth - sidePadding}
                height={height}
              />
              <text
                x={x + barPlotWidth / 2}
                y={xAxisY + 16}
                textAnchor="middle"
              >
                {day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
