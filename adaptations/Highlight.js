//The highlighlight palette


const yellow = 'rgb(240,207,41)'
const black = 'rgb(0,0,0)'
const white = 'rgb(240,240,240)'
const blue = 'rgb(66,103,178)'

export const highLightStyle = {
  yellow: yellow,
  black: black,
  blue:blue,
};


export const highLight = {
  backgroundColor:highLightStyle.yellow,
  //color:highLightStyle.black,
  boxShadow:'3px 3px',
  display:'inline-block',
  padding:'12px 20px 12px 20px',
  borderRadius:'25px'
    
}

export const highLightExtended = {
  backgroundColor:highLightStyle.yellow,
  color:highLightStyle.black,
  boxShadow:'3px 3px',
  display:'inline-block',
  //width:'100px',
  //height:'20px',
  padding:'12px 20px 12px 20px',
  borderRadius:'5px'
}


export const No_highLight = {
  backgroundColor:highLightStyle.white,
  color:highLightStyle.black
}

/* let highlightMark = {
    backgroundColor:highLightStyle.yellow,
    color:highLightStyle.black
}*/