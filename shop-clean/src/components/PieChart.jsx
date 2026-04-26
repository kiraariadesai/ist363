import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export default function PieChart({ items }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (!items || items.length === 0) return

    const newCount = items.filter(i => i.purchaseType === 'new').length
    const usedCount = items.filter(i => i.purchaseType === 'used').length

    const data = [
      { label: 'New / Retail', value: newCount, color: '#3a5c3a' },
      { label: 'Second-hand', value: usedCount, color: '#d4c5a9' },
    ].filter(d => d.value > 0)

    const width = 320
    const height = 320
    const radius = Math.min(width, height) / 2 - 10
    const innerR = radius * 0.55

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const pie = d3.pie()
      .value(d => d.value)
      .sort(null)

    const arc = d3.arc()
      .innerRadius(innerR)
      .outerRadius(radius)

    const arcHover = d3.arc()
      .innerRadius(innerR)
      .outerRadius(radius + 8)

    svg.selectAll('path')
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

    const legend = d3.select(svgRef.current.parentNode)
      .select('.pie-legend')

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

  }, [items])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg ref={svgRef}></svg>
      <div className="pie-legend" style={{ marginTop: '0.5rem' }}></div>
    </div>
  )
}
