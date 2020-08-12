import React from 'react';

class ViewFormModel extends React.Component { 

  render() {
    let arr = this.props.data;
    let formfields = [];    
    Object.keys(arr).map((field, index) => {
      let fieldData = arr[field];
      let fieldId = fieldData.name;     
      switch (fieldData.type) {
        case('text'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewText"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              <input className="formControl"
                            type={fieldData.type}
                            key={fieldId}                  
                            defaultValue={fieldData.value}
                            readOnly/>
            </div>
          );
          break;
        case('textarea'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewTextArea"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label>
              <textarea className="formControl"
                        defaultValue={fieldData.value}
                        key={fieldId}
                       readOnly
                        />         
            </div>
          );
          break;
        case('radiogroup'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewRadio"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> 
              <input className="formControl"
                            key={fieldId}                  
                            defaultValue={fieldData.value}
                            readOnly/>               
            </div>
          );
          break;
        case('checkbox'):
          formfields.push(
            <div className={'form-group ' + fieldData.colWidth} key={"viewCheckBox"+fieldId}>
              
              <input className="form-check-input"
                           type="checkbox" 
                           key={fieldId} 
                           defaultChecked={fieldData.value}
                           disabled= {true}/>
              <label htmlFor={fieldId}>{fieldData.label}</label>  
            </div>
          );
          break;
        case('select'):
            formfields.push(
                <div className={'form-group ' + fieldData.colWidth} key={"viewSelect"+fieldId}>
                    <label htmlFor={fieldId}>{fieldData.label}</label> 
                    <input className="formControl"
                            type={fieldData.type}
                            key={fieldId}                  
                            defaultValue={fieldData.selectedLabel}
                            readOnly/>
                </div>
            );

          break; 
        
        default:
          formfields.push(
            <div className='col-md-4 mb-3' key={"viewdefault"+fieldId}>
              <label htmlFor={fieldId}>{fieldData.label}</label> 
              <input className="formControl"
                            type={fieldData.type}
                            key={fieldId}                  
                            defaultValue={fieldData.value}
                            readOnly/>            
            </div>
           
          );
      }
    });

    return (
      <div className="form-row mb-3">
        {formfields}
      </div>
    );
  }
}

export default ViewFormModel;
