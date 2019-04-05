import React from 'react';
import {CreateEvent} from '../controller/databaseFunctions.js';



export function Event (props) {
    
  var event = {
      action: props.action,
      details: props.context,
      object: 'Alex Doe',
      session_id:localStorage.session_id
      
  }; 
    
    CreateEvent(event);
}

export default Event;