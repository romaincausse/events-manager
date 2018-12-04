import React from 'react'
import { Form, Message, Select } from 'semantic-ui-react'

function SelecteInput({ input, type, placeholder, multiple, options, meta: { touched, error } }) {
  return (
    <Form.Field error={touched && !!error} >
      <Select value={ input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        options={options}
        multiple={multiple}
        />
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

export default SelecteInput
