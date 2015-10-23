import React from 'react'  //eslint-disable-line no-unused-vars
import Helmet from 'react-helmet'

export default ({ }) => (
  <div>
    <Helmet title='Login' />

    <form method='post' action='/login'>
      <input type='text'
        name='username'
        placeholder='Email'
      />
      <input type='password'
        name='password'
        placeholder='Password'
      />
      <button type='submit'>
        Submit
      </button>
    </form>

  </div>
)