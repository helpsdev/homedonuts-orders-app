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
    setDonutPrice(0);
  }

  const handleRemoveDonut = (donut) => {
    setSelectedDonuts(selectedDonuts.filter((d => d.key !== donut.key)))
  }

  if (isHomePage) {
    return (
      <View style={styles.homePageContainer}>
        <TextInput style={styles.textInput} placeholder="Donut name" onChangeText={(name) => setDonutName(name)} value={donutName}/>
        <TextInput style={styles.textInput} placeholder="Donut price" onChangeText={(price) => setDonutPrice(+price)} keyboardType="number-pad" value={donutPrice === 0 ? '' : donutPrice.toString()} />
        <Button title="Add" onPress={() => handleAddDonut()}></Button>
        <Button title="Next" onPress={() => setIsHomePage(false)}></Button>
        <FlatList data={selectedDonuts}
            renderItem={({item}) => <Button title={item.name} onPress={() => handleRemoveDonut(item)}></Button>}
            keyExtractor={(item, index) => index.toString()}
          />
      </View>
    );
  }else{
    return (
      <View style={styles.orderContainer}>
        {
          selectedDonuts.map((donut) => {
            return(
              <View key={donut.key} style={styles.quantityContainer}>
                <View style={{ flex: 1 }}>
                  <Button title="+" onPress={() => handleAddToOrder(donut)}></Button>
                </View>
                <Text style={{ flex: 4, fontSize: 20, textAlign: "center"}}>{donut.name}</Text>
                <View style={{ flex: 1 }}>
                  <Button title="-" onPress={() => handleRemoveFromOrder(donut)}></Button>
                </View>
              </View>
            );
          })
        }
        <Text style={styles.text}>The total is: ${total}</Text>
        <Button title="Clear" onPress={() => handleClearOrder()}></Button>
        <Text style={styles.text}>The order:</Text>
        <FlatList data={Object.values(order)}
          renderItem={({item}) => <Text style={styles.text}>{item.name} x{item.count}</Text>} 
          keyExtractor={(item, index) => index.toString()}/>
        <Button title="Back" onPress={() => setIsHomePage(true)}></Button>
      </View>
    );  
  }
}


const styles = StyleSheet.create({
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
  },
  orderContainer:{
    paddingTop: 25,
    flex: 1,
  },
  quantityContainer:{
    flex: 1,
    flexDirection: "row",
  },
  text:{
    fontSize: 20,
  },
});
