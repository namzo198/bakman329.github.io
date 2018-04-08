import React from 'react';
import ReactDOM from 'react-dom';

class Menu extends React.Component {
   constructor(props) {
      super(props);
      this.state = {show: false};
      
      this.toggleShow = this.toggleShow.bind(this);
      this.setWrapperRef = this.setWrapperRef.bind(this);           
      this.handleClickOutside = this.handleClickOutside.bind(this);
   }

   componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
   }

   componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
   }

   setWrapperRef(node) {
      this.wrapperRef = node;
   }

   handleClickOutside(event) {
         if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({show: false});
         }
    }

   toggleShow() {
      this.setState({show: !this.state.show});
   }

   unshow() {
      this.setState({show: false});
   }

   render() {
      if (!this.state.show) {
         return (
            <div className="menu" tabIndex="0"></div>
         )
      }
      return (
         <div className="menu" tabIndex="0" ref={this.setWrapperRef}>{this.props.children}</div>
      )
   }
}

export default Menu;