import React from 'react';
import TextField from '@material-ui/core/TextField';

const Date = ({ date, setDate }) => {

  
  return (
    <React.Fragment>
      <fieldset>
        <legend> [ 검색날짜 ] </legend>
      <TextField
        name="searchDate"
        type={"date"}    
      />
      </fieldset>
    </React.Fragment>
  );

}

export default Date;