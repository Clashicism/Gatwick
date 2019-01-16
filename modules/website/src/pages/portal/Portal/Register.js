import React from 'react'
import { navigate } from '@reach/router'
import { Button, TextField } from '@material-ui/core'
import { register } from 'API'
import { Container, Text, Error } from 'components'

export default () => {
  let [address, setAddress] = React.useState('')
  let [username, setUsername] = React.useState('')
  let [password, setPassword] = React.useState('')
  let [passwordConfirm, setPasswordConfirm] = React.useState('')
  let [registerError, setRegisterError] = React.useState({})
  let [errorClosed, setErrorClosed] = React.useState(true)

  // a function for handling the form submission
  let handleSubmit = async (e) => {

    // prevent the default action of reloading the page
    e.preventDefault()

    // call the API endpoint
    let result = await register(address, username, password, passwordConfirm)
    if (result.status === 'error') {
      setErrorClosed(false)
      setRegisterError(result)
    } else {
      setRegisterError({})
      setErrorClosed(true)
      sessionStorage.gatewayAPIKey = result.APIKey
      navigate('/portal/dashboard')
    }
  }

  return (
    <>
    <Container halfWidth centered>
      <h1>Register for Free</h1>
      <Text>
        Sign up for a Gateway merchant account to instantly start creating
        payment buttons and tracking invoices across your websites and apps.
        All you need is a Bitcoin Cash address, a username and a password:
      </Text>
      <Error
        error={registerError}
        closed={errorClosed}
        setClosed={setErrorClosed}
      />
      <form
        onSubmit={handleSubmit}
      >
        <TextField
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Bitcoin Cash address"
          style={{
            width: '80%'
          }}
        />
        <br/>
        <br/>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your new username"
          style={{
            width: '80%'
          }}
        />
        <br />
        <br />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={{
            width: '80%'
          }}
        />
        <br />
        <br />
        <TextField
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Retype password"
          type="password"
          style={{
            width: '80%'
          }}
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
        Register
        </Button>
      </form>
      <br />
      <Button>Advanced</Button>
    </Container>
    </>
  )
}
