import React from 'react'
import {Alert} from '@mui/material'
const Message = ({message}) => {
  return <>
  <Alert  severity="error">{message}</Alert>
  </>
}

export default Message