import React from 'react';
import { View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TextInputWithIcon = (props) => {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingLeft: 5
    }}>
      <Icon name="person-outline" size={20} color="black" />
      <TextInput
        style={{
          fontSize: 16,
          fontWeight: '300',
          width: '88%',
          color: '#757083',
          // opacity: 0.5,
          height: 60,

          padding: 15,
          borderWidth: 0,
        }}
        value={props.name}
        onChangeText={props.setName}
        placeholder='Your Name'
      />
    </View>
  );
};

export default TextInputWithIcon;