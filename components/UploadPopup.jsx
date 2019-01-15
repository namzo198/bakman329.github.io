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
           destroy={(cancel=false) => {
             this.setState({renderUploadPopup: false});
           }}
           okay={() => {}}
           cancel={() => {}} >
        <Button onClick={() => {this.onClickPhoto('/assets/profile_img.jpg')}}>
          <img src='/assets/profile_img.jpg'
               style={{width: 60, height: 60}} />
          <p>Me.jpg</p>
        </Button>
        <Button onClick={() => {this.onClickPhoto('/assets/Dinosaur.png')}}>
          <img src='/assets/Dinosaur.png'
               style={{width: 60, height: 60}} />
          <p>Dino.jpg</p>
        </Button>
      </Popup>);
  }
}

export default UploadPopup;