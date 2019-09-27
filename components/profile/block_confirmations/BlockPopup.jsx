import React from 'react'
import ReactDOM from 'react-dom'
import Popup from '../../Popup.jsx'
import {getParsed,blockFriend,linkToName} from '../../../utilities.js'

class BlockPopup extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        
        console.log(this.props.routeTo);
        
        return(
        
            <Popup title="Confirm Block" okay={this.props.agreeToBlock} okButtonName="Confirm" cancel={() => this.props.cancelBlock('first')} grayHeader={true} content_style={true} destroy={() => {null}} noFooter={false} height={30} routeTo={this.props.routeTo}> 
                <div className="popup_content">
                    <p> Are you sure you want to block {linkToName(this.props.friendName)}</p>
                    <p>{linkToName(this.props.friendName)} will no longer be able to:</p>

                       <ul >   
                            <li> See things you post on your timeline</li>

                            <li> Tag you</li>

                            <li> Invite you to events or groups</li>

                            <li> Start a converstation with you</li>

                            <li> Add you as a friend</li>
                        </ul>

                    <p>If you're friends, blocking {linkToName(this.props.friendName)} will also unfriend him </p>
                    <p> If you want to limit what you share with {linkToName(this.props.friendName).split(" ")[0]} or see less of him on FriendBook, you can take a break from him instead.</p>
                </div> 
            </Popup>
        
        )
    }
}

export default BlockPopup;