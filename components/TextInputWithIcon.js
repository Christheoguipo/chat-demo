import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TextInputWithIcon = (props) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, padding: 10 }}>
      <Icon name="ios-person" size={20} color="black" /> {/ Adjust the icon name, size, and color /}
      <TextInput
        style={{
          fontSize: 16,
          fontWeight: '300',
          width: '88%',
          color: '#757083',
          opacity: 0.5,
          height: 60,

          padding: 15,
          borderWidth: 1,
        }}
        value={props.name}
        onChangeText={props.setName}
      />
    </View>
  );
};

export default TextInputWithIcon;