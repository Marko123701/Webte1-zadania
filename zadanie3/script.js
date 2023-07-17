"use strict";

fetch('z03.xml')
  .then(function(resp) {
      return resp.text();
  })
  .then(function(data) {
    let parser = new DOMParser(),
      xmlDoc = parser.parseFromString(data, 'text/xml');
      let zaznam = xmlDoc.querySelectorAll('zaznam');
      var roky = [];
      var A = [];
      var B = [];
      var C = [];
      var D = [];
      var E = [];
      var FX = [];
      var FN = [];

      zaznam.forEach(element => {
        roky.push(element.children[0].innerHTML)
        A.push(element.children[1].children[0].innerHTML);
        B.push(element.children[1].children[1].innerHTML);
        C.push(element.children[1].children[2].innerHTML);
        D.push(element.children[1].children[3].innerHTML);
        E.push(element.children[1].children[4].innerHTML);
        FX.push(element.children[1].children[5].innerHTML);
        FN.push(element.children[1].children[6].innerHTML);
      });

      var traceA = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [A[0], A[1], A[2], A[3], A[4], A[5]],
        name: 'A',
        type: 'bar',
        marker: {color: '#1BAE44'}
      };
      
      var traceB = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [B[0], B[1], B[2], B[3], B[4], B[5]],
        name: 'B',
        type: 'bar',
        marker: {color: '#008FC7'}
      };
    
      var traceC = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [C[0], C[1], C[2], C[3], C[4], C[5]],
        name: 'C',
        type: 'bar',
        marker: {color: '#6E5199'}
      };
    
      var traceD = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [D[0], D[1], D[2], D[3], D[4], D[5]],
        name: 'D',
        type: 'bar',
        marker: {color: '#8C897A'}
      };
    
      var traceE = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [E[0], E[1], E[2], E[3], E[4], E[5]],
        name: 'E',
        type: 'bar',
        marker: {color: '#4F4729'}
      };
      
      var traceFX = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [FX[0], FX[1], FX[2], FX[3], FX[4], FX[5]],
        name: 'FX',
        type: 'bar',
        marker: {color: '#FF2700'}
      };
    
      var traceFN = {
        x: [roky[0], roky[1], roky[2], roky[3], roky[4], roky[5]],
        y: [FN[0], FN[1], FN[2], FN[3], FN[4], FN[5]],
        name: 'FN',
        type: 'bar',
        marker: {color: '#C709E6'}
      };
      var data = [traceA, traceB, traceC, traceD, traceE, traceFX, traceFN];
      
      var layout = { 
        title: 'Známky z predmetu WEBTE-1',
        xaxis: {tickfont: {
            size: 14,
            color: 'rgb(107, 107, 107)'
            }},
        yaxis: {
            title: 'Počet žiakov',
            titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
            },
        },
        xaxis: {
            title: 'Rok',
            titlefont: {
            size: 16,
            color: 'rgb(107, 107, 107)'
            },
        },
      };
      
      var config = {responsive: true}
      
      Plotly.newPlot('barDiv', data, layout, config);   
    
    const mqLarge  = window.matchMedia( '(min-width: 768px)' );
    mqLarge.addEventListener('change', mqHandler);
    
    function mqHandler(e) {
     
      if(!e.matches){
        var update1 = {
            orientation: 'h',
            yaxis: {
                title: 'Počet žiakov',
            },
            };
            Plotly.restyle('barDiv',update1);
        }
    
      else{
        var update2 = {
            orientation: 'r',
        };
        Plotly.restyle('barDiv',update2);
      }
    }
    
    var allLabels = ['A', 'B', 'C', 'D', 'E', 'FX','FN'];
    
        var allValues = [
        [A[0], B[0], C[0], D[0], E[0], FX[0], FN[0]],  
        [A[1], B[1], C[1], D[1], E[1], FX[1], FN[1]],
        [A[2], B[2], C[2], D[2], E[2], FX[2], FN[2]],
        [A[3], B[3], C[3], D[3], E[3], FX[3], FN[3]],
        [A[4], B[4], C[4], D[4], E[4], FX[4], FN[4]],
        [A[5], B[5], C[5], D[5], E[5], FX[5], FN[5]],
        ];
        var ultimateColors =['#1BAE44', '#008FC7', '#6E5199', '#8C897A', '#4F4729', '#FF2700','#C709E6'];
/*            
    var data = [{
        values: allValues[0],
        labels: allLabels,
        type: 'pie',
        title: '2021/2022',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 0,
        column: 0
        },
        textinfo:  'none'
    },{
        values: allValues[1],
        labels: allLabels,
        type: 'pie',
        title: '2020/2021',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 1,
        column: 0
        },
        textinfo: 'none'
    },{
        values: allValues[2],
        labels: allLabels,
        type: 'pie',
        title: '2019/2020',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 0,
        column: 1
        },
        textinfo: 'none'
    },{
        values: allValues[3],
        labels: allLabels,
        type: 'pie',
        title: '2018/1019',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 1,
        column: 1
        },
        textinfo: 'none'
    },{
        values: allValues[4],
        labels: allLabels,
        type: 'pie',
        title: '2017/2018',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 0,
        column: 2
        },
        textinfo: 'none'
    },{
        values: allValues[5],
        labels: allLabels,
        type: 'pie',
        title: '2016/2017',
        name: '2017/2018',
        marker: {
        colors: ultimateColors
        },
        domain: {
        row: 1,
        column: 2
        },
        textinfo: 'none',
    }
    ];
    
    var layout = {
        title: 'Koláčový graf známok',
        grid: {rows: 2, columns: 3}
    };    
    
    Plotly.newPlot('pieDiv', data, layout, config)
*/
   var data = [{
      values: allValues[0],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];
    
    var layout = {
      title: roky[0],
        name: roky[0]
    };
    
    Plotly.newPlot('pie1', data, layout, config);

    var layout = {
      title: roky[1],
        name: roky[1],
        marker: {
        colors: ultimateColors
        },
    };

    var data = [{
      values: allValues[1],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];

    Plotly.newPlot('pie2', data, layout, config);

    var layout = {
      title: roky[2],
        name: roky[2],
    };

    var data = [{
      values: allValues[2],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];

    Plotly.newPlot('pie3', data, layout, config);

    var layout = {
      title: roky[3],
        name: roky[3],
    };

    var data = [{
      values: allValues[3],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];

    Plotly.newPlot('pie4', data, layout, config);

    var layout = {
      title: roky[4],
        name: roky[4],
    };

    var data = [{
      values: allValues[4],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];

    Plotly.newPlot('pie5', data, layout, config);

    var layout = {
      title: roky[5],
        name: roky[5],
    };

    var data = [{
      values: allValues[1],
      labels: allLabels,
      type: 'pie',
      marker: {
        colors: ultimateColors
        }
    }];

    Plotly.newPlot('pie6', data, layout, config);

    var values = [
        ['A', 'B', 'C', 'D','E', 'FX', 'FN', '<b>TOTAL</b>'],
        [A[0], B[0], C[0], D[0], E[0], FX[0], FN[0], 163],
        [A[1], B[1], C[1], D[1], E[1], FX[1], FN[1], 144],
        [A[2], B[2], C[2], D[2], E[2], FX[2], FN[2], 137],
        [A[3], B[3], C[3], D[3], E[3], FX[3], FN[3], 68],
        [A[4], B[4], C[4], D[4], E[4], FX[4], FN[4], 101],
        [A[5], B[5], C[5], D[5], E[5], FX[5], FN[5], 136]];
    
    var data = [{
    type: 'table',
    header: {
      values: [["<b>Známky</b>"], ["<b>2021/2022</b>"],
                   ["<b>2020/2021</b>"], ["<b>2019/2020</b>"], ["<b>2018/2019</b>"],
                   ["<b>2017/2018</b>"], ["<b>2016/2017</b>"]],
      align: "center",
      line: {width: 1, color: 'black'},
      fill: {color: "#005C53"},
      font: {family: "Arial", size: 12, color: "white"}
    },
    cells: {
      values: values,
      align: "center",
      line: {color: "#005C53", width: 1},
      fill: {color: ['#25FEFD', 'white']},
      font: {family: "Arial", size: 11, color: ["black"]}
    }
    }]
    
    layout = { 
        title: 'Tabuľka výsledkov',
        font: {size: 18}
      };
    
    Plotly.newPlot('tableDiv', data, layout, config);
  });