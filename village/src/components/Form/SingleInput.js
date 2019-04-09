import React, { Component } from 'react'

export default class SingleInput extends Component {
  state = {
    edit: false,
    hover: false
  }

  edit = event => {
    console.log('hello')
    event.preventDefault();
    this.setState({ edit: true })
  }

  submit = event => {
    this.setState({ edit: false })
    this.props.submit(event);
  }

  render() {
    return (
      <div 
        onClick = { event => this.edit(event) }
      >
      { this.state.edit ?
        <form onSubmit = { event => this.submit(event) }>  
          <input 
            type="text"
            name = { this.props.name }
            value = { this.props.value }
            onChange = { event => this.props.changeHandler(event) }
          />
        </form>
      :
      <span>{ this.props.value }</span>
      }
      </div>
    )
  }
}
