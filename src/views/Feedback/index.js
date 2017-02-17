import React, { Component } from 'react';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import Form from '../../layouts/form';
import Input from '../../components/Input';
import styles from './styles';


export default class Feedback extends Component {

  state = {
    feedback: null
  };

  render() {
    return (
      <Form
        onSubmit={() => {}}
        buttonText={I18n.t('send_feedback')}
      >
        <View style={styles.container}>
          <Input
            placeholder={I18n.t('feedback_better')}
            value={this.state.feedback}
            numberOfLines={10}
            onChangeText={text => this.setState({ feedback: text })}
            multiline
            style={{ height: 300 }}
          />
        </View>
      </Form>
    );
  }
}
