import React from 'react'
import { Form, Message } from 'semantic-ui-react'

function TextArea({ input, rows, placeholder, meta: { touched, error } }) {
  return (
    <Form.Field error={touched && !!error}>
      <textarea {...input} placeholder={placeholder} rows={rows} />
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

export default TextArea
