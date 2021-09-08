import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TextInput } from 'react-native';

export default function App() {
  const [total, setTotal] = useState(0);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedDonuts, setSelectedDonuts] = useState([]);
  const [order, setOrder] = useState({});
  const [donutName, setDonutName] = useState(null);
  const [donutPrice, setDonutPrice] = useState(0);
  
  const handleAddToOrder = (donut) => {
    if (order[donut.key]) {
      order[donut.key].count += 1;
      setOrder({...order});
    }else{
      order[donut.key] = {
        name: donut.name,
        count: 1,
      }
      setOrder({...order});
    }

    setTotal(total + donut.price);
  }

  const handleRemoveFromOrder = (donut) => {
    if (order[donut.key]) {
      if (order[donut.key].count === 1) {
        delete order[donut.key];
      }else{
        order[donut.key].count -= 1;
      }
      setOrder({...order});
    }
    
    setTotal(total - donut.price);
  }

  const handleClearOrder = () => {
    setTotal(0);
    setOrder({});
  }

  const handleAddDonut = () => {
    if(selectedDonuts.some((d) => d.name === donutName)) return;

    const donut = {
      name: donutName,
      price: donutPrice,
      key: selectedDonuts.length,
    };

    setSelectedDonuts([...selectedDonuts, donut]);
    setDonutName('');
    setDonutPrice('');
  }

  const handleRemoveDonut = (donut) => {
    setSelectedDonuts(selectedDonuts.filter((d => d.key !== donut.key)))
  }

  if (isHomePage) {
    return (
      <View style={styles.homePageContainer}>
        <TextInput style={styles.textInput} placeholder="Donut name" onChangeText={setDonutName}/>
        <TextInput style={styles.textInput} placeholder="Donut price" onChangeText={setDonutPrice} keyboardType="number-pad" />
        <Button title="Add" onPress={() => handleAddDonut()}></Button>
        <Button title="Next" onPress={() => setIsHomePage(false)}></Button>
        <FlatList data={selectedDonuts}
            renderItem={({item}) => <Button title={item.name} onPress={() => handleRemoveDonut(item)}
            keyExtractor={(item, index) => index.toString()}></Button>}></FlatList>
      </View>
    );
  }else{
    return (
      <View>
        {
          selectedDonuts.map((donut) => {
            return(
              <View key={donut.key}>
                <Text>{donut.name}</Text>
                <Button title="+" onPress={() => handleAddToOrder(donut)}></Button>
                <Button title="-" onPress={() => handleRemoveFromOrder(donut)}></Button>
              </View>
            );
          })
        }
        <Text>The total is: ${total}</Text>
        <Button title="Clear" onPress={() => handleClearOrder()}></Button>
        <Text>The order:</Text>
        <FlatList data={Object.values(order)}
          renderItem={({item}) => <Text>{item.name} x{item.count}</Text>} 
          keyExtractor={(item, index) => index.toString()}/>
        <Button title="Back" onPress={() => setIsHomePage(true)}></Button>
      </View>
    );  
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePageContainer: {
    flex: 1,
    marginTop: 25,
  },
  textInput:{
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
});
