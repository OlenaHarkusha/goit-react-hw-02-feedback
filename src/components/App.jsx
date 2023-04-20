import React, { Component } from 'react';
import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Notification } from './Notification';
import PropTypes from 'prop-types';

export class App extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    countTotalFeedback: PropTypes.func.isRequired,
    countPositiveFeedbackPercentage: PropTypes.func.isRequired,
  };

  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  handleClick = e => {
    this.setState(prevState => ({
      [e.target.name]: prevState[e.target.name] + 1,
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return Math.ceil((good / this.countTotalFeedback()) * 100);
  };

  render() {
    return (
      <div>
        <Section title="Please leave your feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.handleClick}
          />
        </Section>
        {this.state.good > 0 || this.state.neutral > 0 || this.state.bad > 0 ? (
          <Section title="Statistics">
            <Statistics
              good={this.state.good}
              neutral={this.state.neutral}
              bad={this.state.bad}
              total={this.countTotalFeedback()}
              positive={this.countPositiveFeedbackPercentage()}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </div>
    );
  }
}
