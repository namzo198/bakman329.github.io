import React from 'react'
import Button from './Button.jsx'
import Popup from "./Popup.jsx";

class UploadPopup extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPhoto = this.onClickPhoto.bind(this);
  }

  onClickPhoto(photo) {
    this.props.onClickPhoto(photo);
  }

  render() {
    return (
      <Popup title="Upload photo/video"
           destroy={this.props.destroy}
           okay={() => {}}
           cancel={() => {}} >
        <Button onClick={() => {this.onClickPhoto('/assets/cat.jpg')}}>
          <img src='/assets/cat.jpg'
               style={{width: 60, height: 60}} />
          <p>Cat.jpg</p>
        </Button>
        <Button onClick={() => {this.onClickPhoto('/assets/life.jpg')}}>
          <img src='/assets/life.jpg'
               style={{width: 60, height: 60}} />
          <p>Life.jpg</p>
        </Button>
        
        <Button onClick={() => {this.onClickPhoto('/assets/funny.jpg')}}>
          <img src='/assets/funny.jpg'
               style={{width: 60, height: 60}} />
          <p>Funny.jpg</p>
        </Button>
      </Popup>);
  }
}

export default UploadPopup;