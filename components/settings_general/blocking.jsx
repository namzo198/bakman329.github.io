import React from 'react'
import BlockUsers from './blocking_features/blockUsers.jsx';
import BlockApp from './blocking_features/blockApp.jsx'
import BlockAppInvites from './blocking_features/blockAppInvites.jsx'
import BlockEventInvites from './blocking_features/blockEventInvites.jsx'


class Blocking extends React.Component {
    
    render(){
        let visited = JSON.parse(localStorage.featuresVisited);
        visited.block.app = true;
        visited.block.user = true;
        localStorage.setItem("featuresVisited", JSON.stringify(visited));
        return (
            
           <div id="wrapper_right">
              <div className = "right_content">
               <BlockUsers/>
               <hr/>
               <BlockAppInvites />
               <hr/>
               <BlockEventInvites />
               <hr/>
               <BlockApp />
                </div>
           </div> 
        );
    }
}

export default Blocking;
