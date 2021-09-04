import { Button, makeStyles, TextField } from '@material-ui/core'
import React, { FC, useEffect } from 'react'
import { GoogleSignin } from '../firebase/api'
import googleIcon from '../img/googleIcon.png'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  signinForm: {
    width: 400,
    height: 200,
    margin: '0 auto',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#ade6f0',
  },
  button: {
    fontWeight: 'bold',
  },
})

const Signin: FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.signinForm}>
      <h1>サインイン</h1>
      <div>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          size='large'
          onClick={() => GoogleSignin()}>
          <img src={googleIcon} alt='icon' />
          Googleでサインイン
        </Button>
      </div>
    </div>
  )
}

export default Signin
