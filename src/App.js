import React from 'react';
import axios from 'axios';
import ViewOnboard from './Components/ViewOnboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      appId:0,
      isSearchPage:true
    };
    this.json = {};
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler = function (e) {
    this.setState({appId:e.target.value});
  }

  getAppInfoJson = ()=>{

      let postData = {
        appId: this.state.appId,
      };
      let URL = 'http://localhost:8080/getAppInfoJson';
     
      return axios
        .post(URL, postData)
        .then((response) => {
          if (response.data.status) {
            this.json = JSON.parse(response.data.data);
            console.log(this.json)
            this.setState({ isSearchPage: false });
          } else {
            console.log(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    
  }

  render() {  
    return (
      <div>
        {this.state.isSearchPage?<div style={{padding:'5%'}}>
        <label style={{paddingRight:'10px'}}>App ID</label>
        <input type="text" defaultValue={this.state.appId} onChange={this.onChangeHandler}/>
        
        <button onClick={()=>this.getAppInfoJson()} style={{marginLeft:'20px'}}>
                    Search
                  </button>
        </div>:<ViewOnboard json={this.json}/>}
      </div>
    ); 
  }
}

export default App;