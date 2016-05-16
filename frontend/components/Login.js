import React from 'react'  //eslint-disable-line no-unused-vars
import Helmet from 'react-helmet'

export default ({ viewer }) => (
  <div>
    <Helmet title='Login' />

    <span>
      Your username: {viewer.username}
    </span>
    <form method='post' action='/login' >
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