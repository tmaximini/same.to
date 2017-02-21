import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import I18n from 'react-native-i18n';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import { COLORS } from '../../constants';
import styles from './styles';


export default class Feedback extends Component {

  constructor() {
    super();
    this.state = {
      feedback: '',
      sending: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }


  onSubmit() {
    // TODO: handle feedback sending to server
    this.setState({ feedback: '', sending: true });
    setTimeout(() => {
      Actions.pop({ refresh: {} });
    }, 400);
  }

  render() {
    return (
      <Form
        onSubmit={this.onSubmit}
        buttonText={I18n.t('send_feedback')}
        buttonProps={{
          noResize: true
        }}
        buttonDisabled={this.state.sending || this.state.feedback.length < 3}
      >
        <View style={styles.container}>
          {this.state.sending ? (
            <ActivityIndicator
              style={styles.centering}
              color={COLORS.CYAN}
              animating
              size="large"
            />
          ) : (
            <Input
              placeholder={I18n.t('feedback_better')}
              value={this.state.feedback}
              numberOfLines={10}
              onChangeText={text => this.setState({ feedback: text })}
              multiline
              returnKeyType="none"
              style={{ height: 200 }}
            />
          )}
        </View>
      </Form>
    );
  }
}
