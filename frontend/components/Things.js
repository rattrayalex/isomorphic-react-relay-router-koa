import React from 'react'

export default ({ things }) => (
  <ul>
    {things.edges.map(({ node: { id, name } }) =>
      <li key={id}>{name}</li>
    )}
  </ul>
)