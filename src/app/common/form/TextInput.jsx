import React from 'react'
import { Form, Message } from 'semantic-ui-react'

function TextInput({ input, width, type, placeholder, meta: { touched, error } }) {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <input {...input} placeholder={placeholder} type={type} />
      {touched && error && (
        <Message
          color="red"
          content={error}
        />
      )
      }
    </Form.Field>
  )
}

export default TextInput
