import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios';
import "./select.css"


interface clienteValues {
  persons: Array<object>,
  id: string,
  name: string,
}

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
    //    this.getOptions()
    await axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
      let options = res.data.map((d: { id: number; name: string }) => ({
        value : d.id,
        label : d.name,
        
      }))        
      this.setState({persons: options})
    })
  }
  
  handleChange(e:any){
    this.setState({id:e.value, name:e.label})
  }

  // customStyles = {
  //   control: (provided: any) => ({
  //     ...provided,
      // width: "490px",
      // marginLeft: "8%",
      // marginTop: "1%",
      // marginBottom:"1%",
      // border: "none",
      // fontSize: "14x",
      // cursor: "ponter",
      // '&:hover': {
      //   width: '500px',
      //   border: "1px solid rgb(29, 5, 184)"
  //     },
  //   })
  // }
      
      
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

