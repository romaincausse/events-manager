import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react'
import cuid from 'cuid';
import { format as dateFormat } from 'date-fns'
import { createEvent, updateEvent } from '../eventActions'
import TextInput from '../../../app/common/form/TextInput'
import TextArea from '../../../app/common/form/TextArea'
import SelectInput from '../../../app/common/form/SelecteInput'
import DateInput from '../../../app/common/form/DateInput'


const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id

  let event = {}

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: "Event title is required" }),
  category: isRequired({ message: "Please provide a category" }),
  description: composeValidators(
    isRequired({ message: "Please add a description" }),
    hasLengthGreaterThan(4)({ message: "Description need to be at least 5 characteres" }))(),
  city: isRequired("city"),
  venue: isRequired("venue"),
  date: isRequired("date")
})

class EventForm extends Component {

  onFormSubmit = values => {
    values.date = dateFormat(values.date, 'yyyy-MM-dd/')
    if (this.props.initialValues.id) {
      this.props.updateEvent(values)
      this.props.history.goBack()
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Bob"
      }
      this.props.createEvent(newEvent)
      this.props.history.push("/events")
    }
  }

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment >
            <Header sub color="teal" content="Event details" />
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field name="title" type="text" component={TextInput} placeholder="Event name" />
              <Field name="category" component={SelectInput} options={category} placeholder="Event about" />
              <Field name="description" component={TextArea} rows={3} placeholder="Event description" />
              <Header sub color="teal" content="Event location details" />
              <Field name="city" type="text" component={TextInput} placeholder="Event city" />
              <Field name="venue" type="text" component={TextInput} placeholder="Event venue" />
              <Field name="date" type="text" component={DateInput} 
                showTimeSelect
                timeFormat="HH:mm"
                dateFormat="yyyy-MM-dd HH:mm"
                timeCaption="time"
                placeholder="Event date" />
              <Button positive type="submit" disabled={invalid || submitting || pristine}>
                Submit
                </Button>
              <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(mapState, actions)(reduxForm({ form: "eventForm", enableReinitialize: true, validate })(EventForm));
