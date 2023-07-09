import React, { useEffect, useRef, useState } from 'react'
import * as d3 from "d3";



export default function D3Chart({data}){
    const chartRef = useRef();

    function formateDate(date){
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const formattedDate = new Date(date).toLocaleString(undefined, options);
    console.log(formattedDate);
    
    
    }

    useEffect(() => {
        const width = 200;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const data = [
      {
        id: 1,
        name: 'John Doe',
        age: 25,
        email: 'johndoe@example.com',
      },
      {
        id: 2,
        name: 'Jane Smith',
        age: 30,
        email: 'janesmith@example.com',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        age: 40,
        email: 'bobjohnson@example.com',
      },
    ];

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.id))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d =>d.age)])
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    g.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis);

    g.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.name))
      .attr('y', d => yScale(d.age))
      .attr('width', xScale.bandwidth())
      .attr('height', d => innerHeight - yScale(d.age))
      .attr('fill', 'blue');
  }, []);
  return (
    <div ref={chartRef}></div>
  )
}
