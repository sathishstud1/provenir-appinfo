import React from 'react';
import ReactDOM from 'react-dom';
import CreateViewPage from './CreateViewPage';
import PageNavigation from './PageNavigation';

class ViewOnboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      currentPageId: 0,
      isEdit:false
    };
    this.PageLength = 0;
    this.PageList = [];
  }

  componentDidMount() {
    
    if(this.state.currentPageId==0){
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
    }
    if(this.PageLength==1){
      ReactDOM.findDOMNode(this.refs["previousBtn"]).style.display = 'none';
      ReactDOM.findDOMNode(this.refs["nextBtn"]).style.display = 'none';
    }
  }

  relaodPage = () =>{
    window.location.reload();
  }

  renderPage = (Page, PageId, PageLength) => {
    let refId = 'ShowPage' + PageId;
    let divstyle = {
      display: 'none'
    }
    if (PageId === 0) {
      divstyle = {}
    }
    return <div ref={refId}
                key={'createPage' + PageId}
                style={divstyle}>
      <CreateViewPage Page={Page}
                  PageLength={PageLength}
                  PageId={PageId}
                  currentPageId={PageId}/>
    </div>;
  }

  render() {   
    let items = [];
    let tabs = [];
    let btns = [];
    let pages = this.props.json.PageList;
    this.PageList = [];
    this.CurrentPageId = 0;
    this.PageLength = 0;
    //Pages
    Object.keys(pages).map((pageIndex, index) => {
      this.PageList.push(pages[index]);
    });
    this.PageLength = this.PageList.length;
    //let className  = 'btn btn-outline-light rounded-0 text-dark';
    let tabStyle = {backgroundColor: '#20a8d8', 
                    borderColor: '#20a8d8',
                    paddingTop: '1%',
                    float: 'left', 
                    fontSize: '18px', 
                    cursor: 'pointer',
                    paddingRight: '2%',
                    paddingLeft: '2%'}
    let currtabStyle = {}

    for (let i = 0; i < this.PageLength; i++) {
      let tabId = 'pagebtn' + i;
      //let tabStyle = className;
      
      currtabStyle = Object.assign({}, tabStyle);
      
      if(this.state.currentPageId === i){
        currtabStyle ['borderBottom'] = '2px solid white';
      }
      tabs.push(
        <li >
          <a style={currtabStyle}
                  onClick={() => {
                      PageNavigation.changePage(i, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                      this.setState({currentPageId: i});
                                    
                  }}
                  id={tabId}
                  key={tabId}
                  >            
            <span style={{color:'white'}}>{this.PageList[i].PageTitle}</span>
          </a>
        </li>
      );

      items.push(
        this.renderPage(this.PageList[i], i, this.PageLength)
      );
    }   
    

    btns.push(
      <div style={{display: 'inline-block'}}><button ref="previousBtn"
              key='previousPage'
              onClick={() => {
                  const pageId = PageNavigation.previousPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});               
              }}
              type="button"
              style={{display: 'inline-block'}}>
        Previous</button></div>
    );
    btns.push(
      <div style={{display: 'inline-block'}}><button className="btn btn-primary mr-3"
              key='nextPage'
              ref="nextBtn"
              onClick={() => {
                  const pageId = PageNavigation.nextPage(this.state.currentPageId, this.PageLength, "ShowPage", "previousBtn", "nextBtn", this, ReactDOM);
                  this.setState({currentPageId: pageId});                
              }}
              type="button"
              >
        Next</button></div>
    );
    return (
         <div style={{boxSizing: 'border-box', 
            boxShadow: '0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)'}}>
                <ul style={{backgroundColor: '#20a8d8',
                    height:'7vh', 
                          borderRadius: '.3rem .3rem 0 0',
                          listStyleType:'none'}}>
                    {tabs.length>1?tabs:null}
              </ul>
                <div style={{paddingRight: '2%',paddingLeft: '2%',paddingBottom: '5%'}}>{items} </div>
                <div className="text-right float-right" style={{width: '20%'}}>
                    {btns}
                </div>
                <button onClick={()=>this.relaodPage()} style={{marginLeft:'20px'}}>
                   Back
                  </button>
                <div className="clearfix"></div>
            </div>
         

    );
  }
}

export default ViewOnboard;
