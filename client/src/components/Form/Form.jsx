import React from 'react'
import "./Form.css"
import { SubmitButton } from '../../elements'

const Form = (props) => {
  return (
    <form
      className='app__form' 
      onSubmit={props.handleSubmit}
    >
      {props.children}
      <SubmitButton isLoading={props.isLoading}/>
      {props.lastChild}
    </form>
  )
}
export default Form