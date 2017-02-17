import React, { Component } from 'react';
import { View } from 'react-native';
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
        buttonText="Feedback senden"
      >
        <View style={styles.container}>
          <Input
            placeholder="Was können wir an Same.to verbessern?"
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
