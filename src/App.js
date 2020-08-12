import React from 'react';
import axios from 'axios';
import ViewOnboard from './Components/ViewOnboard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      appId:'',
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
      <div style={{padding: '10px'}}>
        {this.state.isSearchPage?          
        <div style={{backgroundColor: '#20a8d8',height:'5vh', borderRadius: '.3rem .3rem 0 0',textAlign:'center'}}>
          <lable style={{color:'white', fontSize: '25px',fontWeight: '600'}}>App Info</lable>
          <div style={{boxSizing: 'border-box', 
                  boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
              <div style={{padding:'5%'}}>
                  <label style={{paddingRight:'10px'}}>App ID</label>
                  <input type="text" defaultValue={this.state.appId} onChange={this.onChangeHandler}/>
                  
                  <button className="btn btn-primary mr-3" onClick={()=>this.getAppInfoJson()} style={{marginLeft:'20px'}}>
                              Search
                            </button>
              </div>
          </div>
        </div> : 
        <ViewOnboard json={this.json}/>
       }
        </div>        
    ); 
  }
}

export default App;