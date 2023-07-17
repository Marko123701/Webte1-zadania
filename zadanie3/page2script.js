const source = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");

var arrGraphX = [];
var arrGraphY1 = [];
var arrGraphY2 = [];

var trace1, trace2, data1, data2;

var displaySin = true;
var displayCos= true;  

var amplitude = 1;

function toogleSin()
{
  if(displaySin == true)
  {
    displaySin = false;
  }
  else
  {
    displaySin = true;
  } 
  drawGraphs();
}

function toogleCos()
{
  if(displayCos == true)
  {
    displayCos = false;
  }
  else
  {
    displayCos = true;
  } 
  drawGraphs();
}

function myButton(){
  source.close();
}

source.addEventListener("message", event =>{
  const eventData = JSON.parse(event.data);
  arrGraphX.push(eventData.x);
  arrGraphY1.push(eventData.y1 * amplitude);
  arrGraphY2.push(eventData.y2 * amplitude);

  console.log(amplitude);
  drawGraphs(); 

  });

function drawGraphs()
{
  trace1 = {
    x: arrGraphX,
    y: arrGraphY1,
    type: 'scatter',
    name: 'Sínus',
    line: {
      color: '#D0AC2F',
      width: 2
    }
  };
  
  trace2 = {
    x: arrGraphX,
    y: arrGraphY2,
    type: 'scatter',
    name: 'Kosínus',
    line: {
      color: '#2F53D0',
      width: 2
    }
  };

  data1 = [trace1];
  data2 = [trace2];
  
  var layout = {
    title: 'Graf sínusu a kosínusu',
    showlegend: true
  };
  
  Plotly.newPlot('sinusoidDiv', [], layout);     
  
  if(displaySin == true && displayCos == true)
  {
    Plotly.addTraces('sinusoidDiv', data1);
    Plotly.addTraces('sinusoidDiv', data2);
  }
  else if(displaySin == true && displayCos == false)
  {
    Plotly.addTraces('sinusoidDiv', data1); 
  }
  else if(displaySin == false && displayCos == true)
  {
    Plotly.addTraces('sinusoidDiv', data2);  
  }  
}

function selectOnlyThis(id){

  var myCheckbox = document.getElementsByName("myCheckbox");
  Array.prototype.forEach.call(myCheckbox,function(el){
    el.checked = false;
  });
  id.checked = true;
}

function show(id){
  var numInput = document.getElementById('numDiv');
  var slider = document.getElementById('sliderDiv');

  if(id.value == 1){
    numInput.style.display = "flex";
    slider.style.display = "none";
  }
  else{
    numInput.style.display = "none";
    slider.style.display = "flex";
  }
}

class BtnInput extends HTMLElement {
  constructor() {

    const mySylesInpt = `
    width: 150px;
    height: 50px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid rgb(66, 65, 65);
    border-radius: 15px;
    `;

    const mySylesBtn = `
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    margin-right: 10px;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    `;

      super();

      this.attachShadow({mode: 'open'});

      const wrapper = document.createElement("div");
      wrapper.setAttribute("class", "wrapper");

      const button = wrapper.appendChild(document.createElement("button"));
      button.setAttribute("class", "button");
      button.setAttribute("id", "btn");
      button.style.cssText = mySylesBtn;
      button.innerHTML = this.hasAttribute("text") ? this.getAttribute("text") : "Tlacidlo";

      const input = wrapper.appendChild(document.createElement("input"));
      input.setAttribute("class", "inputNum");
      input.setAttribute("type", "number");
      input.style.cssText = mySylesInpt;

      let minimum = this.hasAttribute("min-val") ? this.getAttribute("min-val") : 1;
      let maximum = this.hasAttribute("max-val") ? this.getAttribute("max-val") : 10;

      input.setAttribute("min", minimum);
      input.setAttribute("max", maximum);
      input.setAttribute("value", 1);

      this.shadowRoot.append(wrapper);

      this.clickEventFunc = (event) => {
          const customEvent = new CustomEvent('btn-click', {
              bubbles: true,
              composed: true,
          });
          maximum = this.getAttribute("max-val");
          input.setAttribute("max", maximum);
          console.log(maximum+ ' maximum')

          let min = parseInt(input.min,10);
          let max = parseInt(input.max,10);
          let value = parseInt(input.value,10);

          if((min <= value && value <= max)){
            amplitude = input.value;
          }
          else{
            console.log('alert-input nie je v intervale');
          }
      }

      this.shadowRoot.querySelector(".button").addEventListener("click", this.clickEventFunc);

      
      this.inputUpdateFunc = (event) => {
          const customEvent = new CustomEvent('input-update', {
              bubbles: true,
              composed: true,
              detail: {value: event.target.value},
          });
          //this.dispatchEvent(customEvent);
      }

      this.shadowRoot.querySelector(".inputNum").addEventListener("change", this.inputUpdateFunc);
  }
}

let stylesheetText = `
#slider-container {
    --value : 0 ;
    --slider-track-color : #B0EFEF45 ;
    --slider-thumb-color : #fff ;
    --slider-fill-color  : #31D3C6 ;
    --slider-fill2-color : #00A2BB ;

    width : 100% ;
    height: 1rem ;
    display: flex ;
    align-items: center ;
    justify-content: center ;
    padding: 0 ;
    margin: 0 ;

    animation: color-cycle 1s infinite alternate linear;
}

@keyframes color-cycle {
    0% {
        --slider-fill-color  : #31D3C6 ;
    }
    100% {
        --slider-fill-color : #00A2BB ;
    }
}

#slider {
    -webkit-appearance: none;
    appearance: none;

    height: 1rem ;
    width: 100% ;
    margin : 0 ;
    padding: 0 ;

    background-color: #00000000 ;
    outline: none ;
    z-index: 99 ;
}

#slider-track {
    position: absolute ;
    top: calc(50% - 0.25rem);
    left: 0 ;
    width: 100% ;
    height: 0.5rem ;
    border-radius: 0.25rem ;
    background-color: var(--slider-track-color) ;
    overflow: hidden ;
}

#slider-track::before {
    position: absolute ;
    content: "" ;
    left: calc(-100% + 1.5rem) ;
    top : 0 ;
    width : calc(100% - 1rem) ;
    height: 100% ;
    background-color: var(--slider-fill-color) ;
    transition: background-color 300ms ease-out ;
    transform-origin: 100% 0%;
    transform: translateX(calc( var(--value) * 100% )) scaleX(1.2);
}

#slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width : 1rem ;
    height: 1rem ;
    border-radius: 50% ;
    background-color: var(--slider-thumb-color) ;
    cursor: pointer ;
    z-index: 99 ;
    border: 2px solid var(--slider-fill-color) ;
    transition: border-color 300ms ease-out ;
}

#value {
    position: absolute ;
    bottom: calc(100% + 0.5rem) ;
    left: calc( var(--value) * calc(100% - 1rem) - 0.8rem) ;
    min-width: 3ch ;
    border-radius: 4px ;
    pointer-events: none ;

    padding: 0.5rem ;
    display: flex ;
    align-items: center ;
    justify-content: center ;

    color: #FFF ;
    background-color: var(--slider-fill-color);
    opacity: 0 ;

    transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;
}

#value::before {
    position: absolute ;
    content: "" ;
    top: 100% ;
    left: 50% ;
    width: 1rem ;
    height: 1rem ;
    border-radius: 2px ;
    background-color: inherit ;
    transform: translate(-50%,-80%) rotate(45deg);
    z-index: -1 ;
}

#slider-container:hover  #value {
    opacity: 1 ;
} 
` ;

class customSlider extends HTMLElement {
    constructor(){
        super();
        this.value = parseFloat(this.getAttribute("value")) || 0;
        this.min   = parseFloat(this.getAttribute("min"))   || 0;
        this.max   = parseFloat(this.getAttribute("max"))   || 20;
        this.step  = parseFloat(this.getAttribute("step"))  || 1;

        this.style.minWidth = "12rem" ;
        this.style.minHeight = "1rem" ;
        this.style.position = "relative" ;

        this.root = this.attachShadow({mode:"open"}) ;

        this.dragging = false ;

        this.create();
        this.update();
    }

    create(){
        let slider   = document.createElement("input") ;
        let sliderContainer = document.createElement("div");
        let sliderTrack = document.createElement("div");
        let value = document.createElement("div");

        let style = document.createElement("style") ;
        style.innerHTML = stylesheetText ;

        slider.type = "range";
        slider.id = "slider";
        slider.min = this.min;
        slider.max = this.max;
        slider.step = this.step;
        slider.value = this.value;

        sliderContainer.id = "slider-container";
        sliderTrack.id = "slider-track";
        value.id = "value";

        slider.addEventListener("input",this.update.bind(this));

        sliderContainer.appendChild(slider);
        sliderContainer.appendChild(value);
        sliderContainer.appendChild(sliderTrack);
        this.root.appendChild(style);
        this.root.appendChild(sliderContainer);
    }

    update(){
        var myBtn = document.getElementById('numInput');
        
        let track  = this.root.getElementById("slider-container");
        let slider = this.root.getElementById("slider");
        let value = this.root.getElementById("value");
        let valuePercentage =   (slider.value - (this.min)) / (this.max - this.min);
        value.innerText = slider.value ;
        console.log(valuePercentage);
        track.style.setProperty("--value",valuePercentage);

        myBtn.setAttribute("max-val",slider.value);
    }


}

customElements.define('custom-slider', customSlider );