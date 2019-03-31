import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'; 
import 'axios'
import axios from 'axios';

class InputField extends React.Component {
  render() {
    return (
      <div className="input-field col s12">
        <input id={this.props.idProp} type={this.props.typeProp} value={this.props.name} onChange={this.props.onChange}></input>
        <label htmlFor={this.props.idProp}>{this.props.placeholderProp}</label>
      </div>
    )
  }
}

class Button extends React.Component {
  render() {
    return (
      <div className="col s12">
        <button className="btn waves-effect waves-light" onClick={this.props.onClick}>
          Submit
        </button>
      </div>
    )
  }
}

class ImagesListView extends React.Component {
  createTable() {
    let table = []
    this.props.listData.forEach(element => {
      table.push(<tr><td><a href={element} rel="noopener noreferrer" target="_blank">{element}</a></td></tr>)
    });
    return table
  }

  render() {
    return (
      <div className="col s12">
        <table className={this.props.className}>
          <tbody>
            {this.createTable()}
          </tbody>
        </table>
      </div>
    )
  }
}

class Progress extends React.Component {
  render() {
    return (
      <div className="col l12" style={{ display: (this.props.loadiing === true && this.props.listData.length===0 ? 'block' : 'none')}}>
        <h6>Loading ...</h6>
      </div>
    )
  }
}

class Notes extends React.Component {
  render() {
    return(
      <div className="col s12">
        <h4>Known Issues and other notes:</h4>
        <ol>
          <li>We can make components in different files.</li>
          <li>There can be a reactive way to load data using socket api or RxPy in backend so as to send data as continuos stream rather than at once.</li>
          <li>Due to this limitation currently, I have kept this to 1 depth level from UI. From backend, it takes depth param.</li>
          <li>We can have more cleaner approach on backend using classes like helper and URL formatter.</li>
          <li>We can also improve some logic related to parsing of data. Right now, I am following tree structure.</li>
        </ol>
      </div>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.baseUrl = "http://35.244.13.233:8200/assignment/"
    this.state = {
      name : "",
      listData: [null],
      loadiing: true
    };
    this.getUrl = this.getUrl.bind(this)
    this.getData = this.getData.bind(this)
  }

  getData() {
    let url = `${this.baseUrl}${this.state.name}/1`
    this.setState({listData: [], loadiing: true})
    axios.get(url).then((res) => {
      console.log(res.data.lenght === 0)
      console.log(res.data)
      if (res.data.length === 0) {
        M.toast({html: "No images found."})
      } 
      this.setState({listData: res.data, loadiing: false})
    })
  }

  getUrl(event) {
    this.setState({name: encodeURI(event.target.value)})
  }

  render() {
   return (
      <div className="container">
        <div className="row">
          <Notes />
          <InputField placeholderProp="Enter URL" idProp="url" typeProp="text" onChange={this.getUrl}/>
          <Button onClick={this.getData}/>
          <Progress loadiing={this.state.loadiing} listData={this.state.listData}/>
          <ImagesListView listData={this.state.listData} className="striped"></ImagesListView>
        </div>
      </div>
   ) 
  }
}

// ========================================

ReactDOM.render(
  <Container />,
  document.getElementById('root')
);

