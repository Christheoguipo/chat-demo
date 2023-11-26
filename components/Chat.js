import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { color } = route.params;

  // No dependency was added to useEffect so that it only runs once when the component is mounted
  useEffect(() => {
    navigation.setOptions({
      title: name
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>Hello Screen2!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Chat;