import React from 'react';
import {CreateEvent} from '../../controller/databaseFunctions.js';
import {saveVisitedAdaptation} from '../../utilities.js'


export function HighlightBoilerplate (props) {
   
    // alert("I am here in HighlighBoilerplate")
    
   var event = { 
       action:`Highlight: ${props}`,
        details:"1",
        object:"Highlight Adaptation",
        session:localStorage.session
   }
      
    saveVisitedAdaptation(props,"highlight");
        
    CreateEvent(event);
   
}