$(document).ready(function() {
    var multiplier = 3;

    var dims = {
        containerX: 400,
        containerY: 170,
        w: 85,
        l: 200,
        cornerR: 28,
        goalLineW: 1/6,
        goalLineX: 11,
        trapBase: 28,
        pad: 20,
        boardsW: .333,
        redLineW: 1,
        blueLineX: 75,
        blueLineW: 1,
        endZoneFaceOffX: 31,        
        endZoneFaceOffY: 20.5,
        faceOffR: 15,
        faceOffW: 1/6,
        dotIR: 0,
        dotOR: 2,
        refCircleR: 10,
        refCircleW: 1/6
    };
    dims.goalLineDiff = dims.cornerR - Math.sqrt( Math.pow(dims.cornerR, 2) - Math.pow(dims.cornerR - dims.goalLineX, 2) );
    dims.dotX = dims.blueLineX + 5 + dims.blueLineW/2;
    dims.dotY = (dims.w/2) - 22;
    
    Object.keys(dims).forEach(function(k, v) {
        dims[k] = dims[k]*multiplier;
    });
    
    var svg = d3.select("#rink").append('svg')
                                .attr('width', dims.containerX)
                                .attr('height', dims.containerY);

    var lineFunction = d3.svg.line()
                             .x(function(d) { return d.x + dims.pad; })
                             .y(function(d) { return d.y + dims.pad; })
                             .interpolate('linear');
    
    var lines = [ 
      { start: { x: dims.cornerR, y: -dims.boardsW/2 }, end: {x: dims.l - dims.cornerR, y: -dims.boardsW/2}, w: dims.boardsW, color: 'black' },
      { start: { x: dims.cornerR, y: dims.w + dims.boardsW/2 }, end: {x: dims.l - dims.cornerR, y: dims.w + dims.boardsW/2}, w: dims.boardsW, color: 'black' },
      { start: { x: -dims.boardsW/2, y: dims.cornerR }, end: { x: -dims.boardsW/2, y: dims.w - dims.cornerR }, w: dims.boardsW, color: 'black' },
      { start: { x: dims.l + dims.boardsW/2, y: dims.cornerR }, end: { x: dims.l + dims.boardsW/2, y: dims.w - dims.cornerR }, w: dims.boardsW, color: 'black' },
      { start: { x: dims.goalLineX, y: dims.goalLineDiff }, end: { x: dims.goalLineX, y: dims.w - dims.goalLineDiff }, w: dims.goalLineW, color: 'red' },
      { start: { x: dims.l - dims.goalLineX, y: dims.goalLineDiff}, end: { x: dims.l - dims.goalLineX, y: dims.w - dims.goalLineDiff}, w: dims.goalLineW, color: 'red' },
      { start: { x: dims.l/2, y: -dims.boardsW/2 }, end: { x: dims.l/2, y: dims.w + dims.boardsW/2 }, w: dims.redLineW, color: 'red' },
      { start: { x: dims.blueLineX, y: -dims.boardsW/2 }, end: { x: dims.blueLineX, y: dims.w + dims.boardsW/2 }, w: dims.blueLineW, color: 'blue' },
      { start: { x: dims.l - dims.blueLineX, y: -dims.boardsW/2 }, end: { x: dims.l - dims.blueLineX, y: dims.w + dims.boardsW/2 }, w: dims.blueLineW, color: 'blue' }
    ];
        
    var drawLine = function(obj) {
        var points = [ obj.start, obj.end ];
        
        svg.append('path')
            .attr('d', lineFunction(points))
            .attr('stroke', obj.color || 'black')
            .attr('stroke-width', obj.w)
            .attr('fill', 'none');
    };
    
    lines.forEach(function(v) {
        drawLine(v);    
    });
    console.log(dims.dotY);
    var arcs = [ 
      {ir: dims.cornerR, or: dims.cornerR + dims.boardsW, start: 270, end: 360, x: dims.cornerR, y: dims.cornerR},
      {ir: dims.cornerR, or: dims.cornerR + dims.boardsW, start: 180, end: 270, x: dims.cornerR, y: dims.w - dims.cornerR},
      {ir: dims.cornerR, or: dims.cornerR + dims.boardsW, start: 0, end: 90, x: dims.l - dims.cornerR, y: dims.cornerR},
      {ir: dims.cornerR, or: dims.cornerR + dims.boardsW, start: 90, end: 180, x: dims.l - dims.cornerR, y: dims.w - dims.cornerR},
      
      {ir: dims.faceOffR, or: dims.faceOffR + dims.faceOffW, start: 0, end: 360, x: dims.endZoneFaceOffX, y: dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.faceOffR, or: dims.faceOffR + dims.faceOffW, start: 0, end: 360, x: dims.endZoneFaceOffX, y: dims.w - dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.faceOffR, or: dims.faceOffR + dims.faceOffW, start: 0, end: 360, x: dims.l - dims.endZoneFaceOffX, y: dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.faceOffR, or: dims.faceOffR + dims.faceOffW, start: 0, end: 360, x: dims.l - dims.endZoneFaceOffX, y: dims.w - dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.faceOffR, or: dims.faceOffR + dims.faceOffW, start: 0, end: 360, x: dims.l/2, y: dims.w/2, color: 'blue'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.endZoneFaceOffX, y: dims.endZoneFaceOffY, color: 'red'},      
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.endZoneFaceOffX, y: dims.w - dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.l - dims.endZoneFaceOffX, y: dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.l - dims.endZoneFaceOffX, y: dims.w - dims.endZoneFaceOffY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.l/2, y: dims.w/2, color: 'blue'},

      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.dotX, y: dims.dotY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.l - dims.dotX, y: dims.dotY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.dotX, y: dims.w - dims.dotY, color: 'red'},
      {ir: dims.dotIR, or: dims.dotOR, start: 0, end: 360, x: dims.l - dims.dotX, y: dims.w - dims.dotY, color: 'red'},
      {ir: dims.refCircleR, or: dims.refCircleR + dims.refCircleW, start: -90, end: 90, x: dims.l/2, y: dims.w, color: '#000000'}
    ];

    var drawArc = function(obj) {
        var arc = d3.svg.arc()
                    .innerRadius(obj.ir)
                    .outerRadius(obj.or)
                    .startAngle(obj.start * (Math.PI/180))
                    .endAngle(obj.end * (Math.PI/180));
                    
        svg.append('path')
            .attr('d', arc)
            .attr('fill', obj.color || 'black')
            .attr('transform', 'translate(' + (dims.pad + obj.x) + ', ' + (dims.pad + obj.y) + ')');
    };

    arcs.forEach(function(k, v) {
        drawArc(k);
    
    });
    
});

function update(data) {
    var circles = svg.selectAll('circle')
                           .data(jsonCircles);
                           
    circles.enter().append('circle');
                           
    var circleAttributes = circles
                            .attr('cx', function(d) { return d.x; })
                            .attr('cy', function(d) { return d.y; })
                            .attr('r', function(d) { return d.r; })
                            .style('fill', function(d) { return d.color; });
                            
    circles.exit().remove();
};
