import React, { Component, PropTypes } from 'react';
import I18n from 'react-native-i18n';
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  // NativeModules,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import CountryPicker, { getAllCountries } from 'react-native-country-picker-modal';
import Form from '../../layouts/form';
import InputGroup from '../../components/InputGroup';
import GenderSelect from '../../components/GenderSelect';
import Input from '../../components/Input';
import GeoInput from '../../components/GeoInput';
import { actions as profileActions } from '../../redux/modules/editCreateProfile';
import { uploadImage } from '../../services/profiles';
// import { API_BASE, getAuthToken } from '../../services/api';
import styles from './styles';

// const RNUploader = NativeModules.RNUploader;

@connect(
  state => state.editCreateProfile,
  profileActions,
)
export default class EditCreateProfile extends Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    updateRemoteProfile: PropTypes.func.isRequired,
    fetchProfile: PropTypes.func.isRequired,
    setProfile: PropTypes.func.isRequired,
    geocodeLocation: PropTypes.func.isRequired,
    locationString: PropTypes.string,
    profile: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      occupation: PropTypes.string,
      company: PropTypes.string,
      interests: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
      ]),
      gender: PropTypes.string,
      image: PropTypes.object,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      avatarSource: null,
      geoFocus: false,
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { profile } = this.props;
    // required fields
    const { firstName, lastName, location, interests } = profile;

    return firstName && lastName && location && interests && interests.length;
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

        // pass imgObj and callback
        uploadImage(response, this.props.fetchProfile);

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
      updateRemoteProfile,
    } = this.props;

    const { avatarSource } = this.state;

    const {
      firstName,
      lastName,
      occupation,
      company,
      interests,
      gender,
      location,
      image,
      signupCompleted,
      citizenship,
    } = profile;

    let fbImageUri;
    if (image && image.thumbs) {
      fbImageUri = image.thumbs['320x320'];
    }

    let locality;
    if (location && location.locality) {
      locality = location.locality;
    }

    return (
      <Form
        buttonText={signupCompleted ? I18n.t('save') : I18n.t('continue')}
        onSubmit={() => updateRemoteProfile(profile)}
        buttonDisabled={!this.isValid()}
      >
        <View style={styles.wrapper}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={this.handleImageUpload}>
              <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
                {(!avatarSource && !fbImageUri)
                  ? <Text style={styles.avatarText}>Select a Photo</Text>
                  : <Image style={styles.avatar} source={avatarSource || { uri: fbImageUri }} />
                }
              </View>
            </TouchableOpacity>
          </View>
          <InputGroup>
            <Input
              placeholder={I18n.t('first_name')}
              value={firstName}
              onChangeText={(text) => update('firstName', text)}
              style={{ flexGrow: 1 }}
            />
            <Input
              placeholder={I18n.t('last_name')}
              value={lastName}
              onChangeText={(text) => update('lastName', text)}
              style={{ flexGrow: 1 }}
            />
          </InputGroup>
          <Input
            placeholder={I18n.t('occupation')}
            value={occupation}
            onChangeText={(text) => update('occupation', text)}
          />
          <Input
            placeholder={I18n.t('employer')}
            value={company}
            onChangeText={(text) => update('company', text)}
          />
          <Input
            placeholder={I18n.t('interests')}
            value={interests ? interests.join(', ') : null}
            onChangeText={(text) => update('interests', text.split(', '))}
          />
          <GeoInput
            focus={this.state.geoFocus}
            onFocus={() => this.setState({ geoFocus: true })}
            onBlur={() => this.setState({ geoFocus: false })}
            placeholder={I18n.t('city')}
            enablePoweredByContainer={false}
            value={locationString || locality}
            onChangeText={text => update('locationString', text)}
            onAdressSelect={geocodeLocation}
          />
          <CountryPicker
            onChange={(value) => {
              update('citizenship', value.cca2);
            }}
            cca2={citizenship || 'DE'}
            translation="deu"
            closeable
            filterable
          />
          <GenderSelect
            onChange={(val) => update('gender', val)}
            gender={gender}
          />
        </View>
      </Form>
    );
  }
}



