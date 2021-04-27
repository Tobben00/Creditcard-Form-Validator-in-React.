import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

    cardBox: {
        width: '425px',
        height: '200px',
        backgroundColor: 'white',
        borderRadius: '2%',
        padding: '20px',
        boxShadow: '3px 3px 5px 6px #ccc',
      },
    
}));

function CreditCardValidation() {
  
    const INITIAL_CARD_STATE = {
        cardHolderName: "",
        cardNumber: "",
        ccvCode: "",
        expirationDate: Date.now(),
        cardType: "",
    }

    const INITIAL_FORM_ERROR_STATE = {
      cardNumber: "",
      cardHolderName: "",
      ccvNumber: "",
    }


    const [value, setValue] = useState(INITIAL_CARD_STATE);
    const [isError, setIsError] = useState(INITIAL_FORM_ERROR_STATE);
    const classname = useStyles();

    function regexForNumbersOnly(number, length) {
      return new RegExp('^[0-9]{' + length + '}').test(number)
    }

    function regexForLettersOnly(letter) {
      return /^[a-zA-Z ]+$/.test(letter);
    } 

    function validateCardNumber(e) {
      const lengthCard = value.cardNumber.length + 1;
      const test = value.cardNumber.charAt(0);
      console.log(value.cardNumber);
      console.log(test);
      if(lengthCard >= 16){
        setIsError({cardNumber: "true"});
      }
      if(lengthCard <= 16){
        setIsError({cardNumber: "false"});
      }
      if(test === "4") {
        setValue({...value, cardType: "Visa"});
      }
      
      if(regexForNumbersOnly(e.target.value) === false){
        console.log(regexForNumbersOnly(e));
      }
      
      setValue({...value, cardNumber: e.target.value});
      console.log(value.cardNumber.charAt(0));
    }

    function validateCardHolderName(e) {
      const lengthHolderName = value.cardHolderName.replace(/\s+/," ").length + 1;
     
      console.log(regexForLettersOnly(value.cardHolderName.replace(/\s+/," ")))
      if(lengthHolderName < 5 || !regexForLettersOnly(value.cardHolderName.replace(/\s+/," "))){
        setIsError({cardHolderName: "true"});
      } else setIsError({cardHolderName: "false"});

      setValue({...value, cardHolderName: e.target.value});
      console.log(lengthHolderName)
    }

    function validateCCVNumber(e) {
      const lengthCcvCode = value.ccvCode.length;
     
      if(lengthCcvCode <= 2){
        setIsError({ccvNumber: "false"});
      }
      if(lengthCcvCode >= 3){
        setIsError({ccvNumber: "true"});
      }
      setValue({...value, ccvCode: e.target.value});
    
    }

    const onSubmit = () => {
      
      if(!regexForNumbersOnly(value.cardNumber, 16) || value.cardNumber.length !== 16){

        alert("Please enter correct Card Number and it cannot be empty!");
        return
      }  

      if(!regexForLettersOnly(value.cardHolderName.replace(/\s+/," "))) {
        alert("Card owner name do only contain letters and cannot be empty!");
        return
      }

      if(!regexForNumbersOnly(value.ccvCode, 3)){
        alert("CCV Code need to be 3 Digits only and cannot be empty!");
        return
      }

      alert("Submit successfully sent the form!");
      console.log(value);
    }

    

    return (
      <div>
        <form>
      <LocalizaitonProvider dateAdapter={AdapterDateFns}>
       
      <div className={classname.cardBox} >

      <Grid container>
      <div style={{ width: 180 }}>
        <TextField onChange={validateCardNumber} error={isError.cardNumber === "true"} helperText={isError.cardNumber === "true" ? 'Max amount of digits is 16!' : ' '} id="standard-basic" label="Card Number (16 Digits)" variant="standard" />
      </div>

      <div style={{ width: 150, marginLeft: 15 }}>
      <TextField onChange={validateCardHolderName} error={isError.cardHolderName === "true"} helperText={isError.cardHolderName === "true" ? 'Minimum 5 letter name.' : ' '}  id="standard-basic" label="Owner's Name" variant="standard" />
      </div>
      </Grid>

      <Grid container style={{marginTop: 10}}>
      <div style={{ width: 159 }}>
        <DatePicker 
          views={['month', 'year']}
          label="Card Expiration Date"
          minDate={new Date('2020-01-01')}
          maxDate={new Date('2023-12-01')}
          value={value.expirationDate}
          onChange={(newValue) => {
            setValue({...value, expirationDate: Date.parse(newValue)});
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              helperText={null}
              variant="standard"
            />
          )}/>
      </div>

      <div style={{ width: 100, marginLeft: 35 }}>
        <TextField onChange={validateCCVNumber} error={isError.ccvNumber === "true"} helperText={isError.ccvNumber === "true" ? 'Least 3 digit code allowed.' : ' '} id="standard-basic" label="CCV Number" variant="standard" />
      </div>

      <div style={{ width: 90, marginLeft: 20 }}>
        <TextField defaultValue={value.cardType = ""} disabled id="standard-basic" label="Card Type" variant="standard" />
      </div>
        </Grid>

        <Button onClick={() => onSubmit()} variant="contained">SUBMIT</Button>

  </div>
    </LocalizaitonProvider>
            
  </form>
    </div>
    );
}

export default CreditCardValidation
