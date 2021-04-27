import React from 'react'
import { Container, Grid } from '@material-ui/core'
import CreditCardValidation from "../components/CreditCardValidation"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    mainStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
}));

function Homepage() {
    return (
        <div>
            <Container className={useStyles.mainStyle} maxWidth="sm">
                <Grid container direction='column'>     
                    <Grid item >
                        <h1>DNB UX Validation Demo</h1>
                    </Grid>  
                
                    <Grid item>
                        <CreditCardValidation /> 
                    </Grid>
              
                </Grid>     
            </Container>     
        </div>
    )
}

export default Homepage
