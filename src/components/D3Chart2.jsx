import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";



export default function D3Chart2({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && chartRef.current) {
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const width = 400 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const chartData = data.map(item => ({
        title: item.title,
        dueDate: new Date(item.dueDate),
        status: item.status
      }));

      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

         // Clear existing content
  
      const colorScale = d3
        .scaleOrdinal()
        .domain(['', 'completed', 'other'])
        .range(['red', 'green', 'orange']);

      const xScale = d3
        .scaleBand()
        .range([0, width])
        .domain(chartData.map(d => d.title))
        .padding(0.1);

      const yScale = d3
        .scaleTime()
        .range([height - 20, 0])
        .domain(d3.extent(chartData, d => d.dueDate));

      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      svg.append('g').call(d3.axisLeft(yScale));

      svg
        .selectAll('.bar')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.title))
        .attr('width', xScale.bandwidth())
        .attr('y', d => yScale(d.dueDate))
        .attr('height', d => height - yScale(d.dueDate))
        .style('fill', d => colorScale(d.status));
    }
  }, [data]);

  return <div ref={chartRef}></div>;

}
