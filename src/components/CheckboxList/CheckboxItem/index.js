import React, { PropTypes } from 'react';
import I18n from 'react-native-i18n';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const appartment = require('../../../assets/Acc_Appartement.png');
const camping = require('../../../assets/Acc_Camping.png');
const hostel = require('../../../assets/Acc_Hostel.png');
const hotel = require('../../../assets/Acc_Hotel.png');
const house = require('../../../assets/Acc_House.png');
const other = require('../../../assets/Acc_Others.png');

const concert = require('../../../assets/Activity_Concert.png');
const dating = require('../../../assets/Activity_Dating.png');
const food = require('../../../assets/Activity_Essen.png');
const gaming = require('../../../assets/Activity_Gaming.png');
const party = require('../../../assets/Activity_Party.png');
const shopping = require('../../../assets/Activity_Shopping.png');
const sport = require('../../../assets/Activity_Sport.png');
const cinema = require('../../../assets/Activity_TV.png');

const airplane = require('../../../assets/Trip_Airplane.png');
const bus = require('../../../assets/Trip_Bus.png');
const car = require('../../../assets/Trip_Car.png');
const limo = require('../../../assets/Trip_Limo.png');
const taxi = require('../../../assets/Trip_Taxi.png');
const train = require('../../../assets/Trip_Train.png');

const images = {
  appartment,
  camping,
  hostel,
  hostal: hostel,
  hotel,
  house,
  other,

  concert,
  dating,
  food,
  dinner: food,
  gaming,
  party,
  shopping,
  sport,
  cinema,

  airplane,
  bus,
  car,
  limo,
  driver: limo,
  taxi,
  train,
};

const getImage = item => images[item] || images.other;

const CheckboxItem = ({ item, onChange, active }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.circle}
      onPress={() => onChange(item)}
      activeOpacity={0.8}
    >
      <Image
        style={styles.image}
        source={getImage(item)}
      >
        <View style={styles.inactive}>
          {active && <View
            style={styles.checked}
          >
            <Icon
              name="check"
              size={22}
              style={styles.icon}
            />
          </View>}
        </View>
      </Image>

    </TouchableOpacity>
    <Text style={styles.itemText}>{I18n.t(item)}</Text>
  </View>
);


CheckboxItem.propTypes = {
  item: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckboxItem;
