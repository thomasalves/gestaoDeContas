import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./select.css";


interface clienteValues {
  persons: Array<object>,
  id: string,
  name: string,
};

export default class SelectCLient extends Component< any, any>{
  constructor(props: clienteValues) {
    super(props)
    this.state = {
      persons: [],
      id: '',
      name: '',
    }

  }
  async componentDidMount(){
    await axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      let options = res.data.map((d: { id: number; name: string }) => ({
        value : d.id,
        label : d.name,
        
      }))        
      this.setState({persons: options});
    })
  }
  
  handleChange(e:any){
    this.setState({id:e.value, name:e.label});
  }
     
      
render() {
   return (
    <div className="select">
        <Select 
        {...this.props}
        // styles={this.customStyles}
        options={this.state.persons}   
        onChange={this.handleChange.bind(this)}
        defaultValue= {{label: "Selecione um cliente", value: ""}}
        />
        {this.props.render(this.state)}
      </div>
    )
  }
}

