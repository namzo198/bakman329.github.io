//The highlighlight palette


const inner_yellow = 'rgb(255,255,153)'
const black = 'rgb(0,0,0)'
const white = 'rgb(240,240,240)'
const blue = 'rgb(66,103,178)'

export const highLightStyle = {
  yellow: inner_yellow,
  black: black,
  blue:blue,
};


export const highLight = {
  backgroundColor:highLightStyle.yellow,
  //color:highLightStyle.black,
  boxShadow:'3px 3px #999900',
  display:'inline-block',
  //padding:'1px',
  borderRadius:'5px'

}

export const highLightExtended = {
  backgroundColor:highLightStyle.yellow,
  color:highLightStyle.black,
  boxShadow:'3px 3px #999900',
  //display:'inline-block',
  width:'100px',
  //height:'20px',
  padding:'10px 10px 10px 10px',
  borderRadius:'5px',
}


export const No_highLight = {
  backgroundColor:highLightStyle.white,
  color:highLightStyle.black
}

/* let highlightMark = {
    backgroundColor:highLightStyle.yellow,
    color:highLightStyle.black
}*/
