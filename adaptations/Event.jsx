import React from 'react';
import {CreateEvent} from '../controller/databaseFunctions.js';



export function createEvent (props) {
    
  var event = {
      action: props.action,
      object:props.object,
      details: props.context,
      session_id:localStorage.session
      
  }; 
    
    CreateEvent(event);
}

export default createEvent;