import React, { Component, PropTypes } from 'react';
import {
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Input from '../../components/Input';
// import PlusButton from '../../components/PlusButton';
import GeoInput from '../../components/GeoInput';
import Button from '../../components/Button';
import { actions as profileActions } from '../../redux/modules/editCreateProfile';
import { getProfile } from '../../services/profiles';

import styles from './styles';

@connect(
  state => state.editCreateProfile,
  profileActions,
)
export default class EditCreateProfile extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    updateRemoteProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    locationString: PropTypes.string,
    isNew: PropTypes.bool,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      occupaction: PropTypes.string,
      employer: PropTypes.string,
      hobbies: PropTypes.string,
      gender: PropTypes.string,
      image: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.isValid = this.isValid.bind(this);
  }


  componentWillMount() {
    getProfile()
      .then(this.props.setProfile);
  }

  isValid() {
    const { profile } = this.props;
    const { firstName, lastName, location } = profile;
    return firstName && lastName && location;
  }

  handleImageUpload() {
    const options = {
      title: 'Select Avatar',
      // customButtons: [
      //   {name: 'fb', title: 'Choose Photo from Facebook'},
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    /**
    * The first arg is the options object for customization
    * (it can also be null or omitted for default options),
    * The second arg is the callback which sends object: response (more info below in README)
    */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        // You can display the image using either data...
        source = { uri: `data:image/jpeg;base64,${response.data}` };

        // Or a reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  render() {
    const {
      profile,
      update,
      geocodeLocation,
      locationString,
      isNew,
      updateRemoteProfile,
    } = this.props;

    const { avatarSource } = this.state;

    const {
      firstName,
      lastName,
      occupaction,
      employer,
      hobbies,
      gender,
      image,
    } = profile;

    let fbImageUri;
    if (image && image.thumbs) {
      fbImageUri = image.thumbs['320x320'];
    }

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={this.handleImageUpload}>
              <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                {(!avatarSource && !fbImageUri) ? <Text style={styles.avatarText}>Select a Photo</Text> :
                  <Image style={styles.avatar} source={avatarSource || { uri: fbImageUri }} />
                }
              </View>
            </TouchableOpacity>
          </View>
          {/*<Button
            text="Upload Image"
            onPress={this.handleImageUpload}
          />*/}
          <View style={styles.inputGroup}>
            <Input
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => update('firstName', text)}
              style={{ flex: 1 }}
            />
            <View style={styles.spacer}></View>
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => update('lastName', text)}
              style={{ flex: 1 }}
            />
          </View>
          <Input
            placeholder="Tätigkeit"
            value={occupaction}
            onChangeText={(text) => update('occupaction', text)}
          />
          <Input
            placeholder="Arbeitgeber"
            value={employer}
            onChangeText={(text) => update('employer', text)}
          />
          <GeoInput
            placeholder="Wohnort"
            enablePoweredByContainer={false}
            value={locationString}
            onChangeText={text => update('locationString', text)}
            onAdressSelect={geocodeLocation}
          />
          <Input
            placeholder="Hobbies"
            value={hobbies}
            onChangeText={(text) => update('hobbies', text)}
          />
          <Button
            text={isNew ? 'Save' : 'Update'}
            onPress={() => updateRemoteProfile(profile)}
            disabled={!this.isValid()}
          />
          <KeyboardSpacer />
        </ScrollView>
      </View>
    );
  }
}



