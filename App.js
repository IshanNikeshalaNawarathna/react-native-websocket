import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

export default function App() {
  const [getText, setText] = useState("");
  const [getMessage, setMessage] = useState([]);


  useEffect(

    () => {

      const ws = new WebSocket("https://111a-2402-d000-a400-12f8-cd9f-4ff1-976-6937.ngrok-free.app/WebSocket/Socket");

      ws.onopen = () => {
        // connection opened
        console.log("Opne"); // send a message
        ws.send("React-native: hello")
      };

      ws.onmessage = e => {
        // a message was received
        console.log(e.data);
        setMessage([...getMessage, e.data])
      };

      ws.onerror = e => {
        // an error occurred
        console.log("Error");
      };

      ws.onclose = e => {
        // connection closed
        console.log("Close");
      };
    }, []

  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput style={styles.textFild} value={getText} onChangeText={
        (text) => {
          setText(text)
        }
      } />
      <Button title='Send' onPress={
        () => {
          setMessage([...getMessage, getText])
          ws.send(getText)
          setText("")
        }
      } />
      <View style={{ height: 200, width: 300, }}>
        <FlashList
          data={getMessage}
          renderItem={
            ({ item }) => { return <Text>{item}</Text> }
          }
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'pink',
    width: "100%",
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFild: {
    width: 300,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },

});
