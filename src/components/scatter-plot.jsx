import React from "react";
import graphdata from "../data/index.json";
import { useDeviceDetect } from "../hooks/device-detect";

export default function ScatterPlot() {
  const [w] = useDeviceDetect();

  const barData = graphdata.map((ele) => [ele["Hue"], ele["Color intensity"]]);

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
  const dataXMax = barData.reduce(
    (currMax, [dataX, _]) => Math.max(currMax, dataX),
    -Infinity
  );
  const dataYRange = dataYMax + 1 - (dataYMax % 1);
  const dataXRange = dataXMax + 2 - (dataXMax % 2);

  const numYTicks = dataYRange / 1;
  const numXTicks = dataXRange / 2;

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
        <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
          Hue
        </text>

        {/* Y axis */}
        <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
        {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);

          const yValue = Math.round(dataYRange - index * 1);

          return (
            <g key={index}>
              <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
              <text x={x0 - 5} y={y + 5} textAnchor="end">
                {yValue.toString()}
              </text>
            </g>
          );
        })}
        <text x={x0 + 5} y={y0 - 8} textAnchor="middle">
          Color Intensity
        </text>

        {/* Scatter plots */}
        {barData.map(([day, dataY], index) => {
          const xRatio = 1 - day / dataXRange;
          const x = x0 + (1 - xRatio) * xAxisLength;

          const yRatio = dataY / dataYRange;

          const y = y0 + (1 - yRatio) * yAxisLength;

          return (
            <g key={index}>
              <circle cx={x} cy={y} r={3} />
              {Array.from({ length: numXTicks }).map((_, index) => {
                const x = index * (xAxisLength / numXTicks);

                const xValue = Math.round(dataXRange - index * 2);
                return (
                  <text
                    key={index}
                    x={xAxisLength + x0 - x}
                    y={xAxisY + 16}
                    textAnchor="middle"
                  >
                    {xValue.toString()}
                  </text>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
