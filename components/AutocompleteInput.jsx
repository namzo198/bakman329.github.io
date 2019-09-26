import React from 'react'
import ReactDOM from 'react-dom'


import {containsIgnoreCase} from '../utilities.js'

class AutocompleteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: (this.props.defaultValue ? this.props.defaultValue : ''), current_focus: -1};
    this.items = [];
    this.removeList = this.removeList.bind(this);
    this.createList = this.createList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.verifyFocus = this.verifyFocus.bind(this);
    this.onKeyDown= this.onKeyDown.bind(this);
  }

  // Returns the last comma-seperated value within the text
  lastValue(str) {
    var last_comma_i = str.lastIndexOf(',');
    if (last_comma_i == -1) {
      return str;
    }
    return str.substr(last_comma_i + 1).trim();
  }

  completeLastValue(e, str, complete_value) {
    var last_comma_i = str.lastIndexOf(',');
    var new_value = (last_comma_i == -1)
      ? complete_value
      : str.substr(0, last_comma_i) + ", " + complete_value;
    this.setState({value: new_value, current_focus: -1});
    this.props.onChange(new_value);
      
      if(this.props.onEnter !== undefined ){
          
           //console.log("The enter key has been pressed");
            this.props.onEnter(new_value)  
            this.setState({value:''})
        }
  }

  
    
  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }

  removeList() {
    this.setState({container: null}, () => {
      document.removeEventListener('click', this.onClick);
    });
  }

  createList(e) {
    e.persist();

    var last_value;
    last_value = (this.props.commaSeperated) ? this.lastValue(e.target.value) : e.target.value;

    if (!last_value) {
      this.removeList();
      return;
    }

    var raw_list = e.target.value.split(",").map(function(item) {
      return item.trim();
    });

    var items = [];
    this.items = [];
    var n_added = 0;
    
    this.props.list.forEach((element, index) => {
      if (element.substr(0, last_value.length).toLocaleLowerCase() == last_value.toLocaleLowerCase()
        && !containsIgnoreCase(raw_list, element)) {
        var click = (() =>  this.completeLastValue(e, e.target.value, element));
        this.items[n_added] = click;
        items.push(
          <div key={n_added}
            className={(this.state.current_focus == n_added) ? "autocomplete-active" : ""}
            onClick={click}>
            <strong>{element.substr(0, last_value.length)}</strong>
            {element.substr(last_value.length)}
          </div>);
        n_added++;
      }
    });

    if (items.length == 0) {
      this.removeList();
      return;
    }

    this.setState({container: <div className="autocomplete-items"
      ref={(element) => {this.container = element}}>{items}</div>});
    document.addEventListener('click', this.onClick);
  }

  onChange(e) {
    e.persist();
    this.props.onChange(e.target.value);
    this.setState({value: e.target.value, current_focus: -1},
      () => {this.createList(e)});
  }

  onClick(e) {
    if (!this.input.contains(e.target)) {
      this.removeList();
    }
  }

  verifyFocus(focus) {
    var n_items = this.items.length;
    var new_focus = focus;
    if (focus >= n_items) new_focus = 0;
    if (focus < 0) new_focus = (n_items - 1);
    return new_focus;
  }

  onKeyDown(e) {
    e.persist();
    var new_focus = this.state.current_focus;
    if (e.keyCode == 40) { // Down arrow
      e.preventDefault();
      new_focus = this.verifyFocus(this.state.current_focus + 1);
    } else if (e.keyCode == 38) { // Up arrow
      e.preventDefault();
      new_focus = this.verifyFocus(this.state.current_focus - 1);
    } else if (e.keyCode == 13) { // Enter key

        
      if (this.state.current_focus >-1 && this.items[this.state.current_focus]) {
          this.items[this.state.current_focus]();
         
          
      }else if( this.state.current_focus == -1 && this.state.value != "") {
           //console.log("He pressed me"+this.state.value)
          this.props.onEnter(this.state.value);
          this.setState({value:""})
        
      }
       
    }
       

    this.setState({current_focus: new_focus},
      () => {this.createList(e)});  
    }
    
	render() {    
           
    var container;
		return (
       <div className="autocomplete">
        <input id="text" type='text' placeholder={this.props.placeholder}
              className = {this.props.className}
               rows={this.props.rows ? this.props.rows : '1'}
               cols={this.props.cols ? this.props.cols : '65'}
               ref={(element) => {this.input = element}}
               onChange={this.onChange} 
               value={this.state.value}
               onKeyDown={this.onKeyDown}
               onFocus={this.createList}
               autoComplete='off' />
        {this.state.container}
		  </div>);
	}
}

export default AutocompleteInput;