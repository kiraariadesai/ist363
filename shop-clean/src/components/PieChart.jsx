import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

/*
  D3 PIE CHART — new vs. second-hand
  
  How D3 works here in plain English:
  1. useRef() gives us a reference to the <svg> element in the DOM
  2. useEffect() runs the D3 code after React renders the component
  3. d3.pie() converts our raw counts into arc angles (slices of 360°)
  4. d3.arc() turns those angles into SVG path shapes
  5. We append those paths to the SVG and add labels
*/

export default function PieChart({ items }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!items || items.length === 0) return

    // Count new vs. second-hand
    const newCount  = items.filter(i => i.purchaseType === 'new').length
    const usedCount = items.filter(i => i.purchaseType === 'used').length

    const data = [
      { label: 'New / Retail',  value: newCount,  color: '#3a5c3a' },
      { label: 'Second-hand',   value: usedCount, color: '#d4c5a9' },
    ].filter(d => d.value > 0)  // don't include slices with 0

    // Dimensions
    const width  = 320
    const height = 320
    const radius = Math.min(width, height) / 2 - 10
    const innerR = radius * 0.55   // inner hole — makes it a donut

    // Clear any previous chart before redrawing
    d3.select(svgRef.current).selectAll('*').remove()

    // Create the SVG canvas, centered
    const svg = d3.select(svgRef.current)
      .attr('width',  width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    // d3.pie() calculates start and end angles for each slice
    const pie = d3.pie()
      .value(d => d.value)
      .sort(null)   // keep our original order

    // d3.arc() builds the SVG path for each slice
    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(radius)

    // A slightly larger arc for hover effect
    const arcHover = d3.arc()
      .innerRadius(innerR)
      .outerRadius(radius + 8)

    // Draw each slice
    const arcs = svg.selectAll('path')
      .data(pie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', '#f5f0e8')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this).transition().duration(150).attr('d', arcHover)
      })
      .on('mouseout', function() {
        d3.select(this).transition().duration(150).attr('d', arc)
      })

    // Center label — total count
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .style('font-size', '1.8rem')
      .style('font-weight', 'bold')
      .style('fill', '#3a5c3a')
      .text(items.length)

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('font-size', '0.7rem')
      .style('fill', '#888')
      .style('text-transform', 'uppercase')
      .style('letter-spacing', '0.05em')
      .text('items')

    // Legend below the chart
    const legend = d3.select(svgRef.current.parentNode)
      .select('.pie-legend')

    // Clear old legend
    legend.selectAll('*').remove()

    data.forEach(function(d) {
      const row = legend.append('div').style('display', 'flex').style('align-items', 'center').style('gap', '0.5rem').style('margin-bottom', '0.4rem')
      row.append('div')
        .style('width', '14px')
        .style('height', '14px')
        .style('border-radius', '3px')
        .style('background', d.color)
        .style('flex-shrink', '0')
      row.append('span')
        .style('font-size', '0.85rem')
        .style('color', '#1e1e1e')
        .text(`${d.label} — ${d.value} item${d.value !== 1 ? 's' : ''}`)
    })

  }, [items])  // re-run whenever items changes

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg ref={svgRef}></svg>
      <div className="pie-legend" style={{ marginTop: '0.5rem' }}></div>
    </div>
  )
}
