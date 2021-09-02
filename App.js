import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

const donuts = [
  {name: 'Mora', type: 'basic', key: 1},
  {name: 'Chocolate', type: 'basic', key: 2},
  {name: 'Azucar canela', type: 'basic', key: 3},
  {name: 'Gansito', type: 'heavy', key: 4},
  {name: 'Aleman', type: 'special', key: 5},
  {name: 'Snicker', type: 'special', key: 6},
  {name: 'Mazapan', type: 'special', key: 7},
  {name: 'Oreo', type: 'special', key: 8},
  {name: 'Azucar rellena manzana', type: 'special', key: 9},
  {name: 'Chocolate rellena vainilla', type: 'special', key: 10},
]

export default function App() {
  const [total, setTotal] = useState(0);
  const [isHomePage, setIsHomePage] = useState(true);
  const [selectedDonuts, setSelectedDonuts] = useState([]);
  
  const handleSumupBasic = () => setTotal(total + 13);
  const handleSumupGourmet = () => setTotal(total + 16);
  const handleSumupSpecial = () => setTotal(total + 19);
  const handleSumupHeavy = () => setTotal(total + 29);
  const sumupMapping = {
    'basic': handleSumupBasic,
    'special': handleSumupSpecial,
    'heavy': handleSumupHeavy,
  };
  
  const handleAddDonut = (donut) => {
    if(selectedDonuts.some((d) => d.name === donut.name)) return;
    
    selectedDonuts.push(donut);
    setSelectedDonuts(selectedDonuts);
  }

  if (isHomePage) {
    return (
      <View>
        <FlatList data={donuts} 
            renderItem={({item}) => <Button title={item.name} onPress={() => handleAddDonut(item)}></Button>}></FlatList>
        <Button title="Next" onPress={() => setIsHomePage(false)}></Button>
        <FlatList data={selectedDonuts}
            renderItem={({item}) => <Text>{item.name}</Text>}></FlatList>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        {
          donuts.map((donut) => <Button key={donut.key} title={donut.name} onPress={sumupMapping[donut.type]}></Button>)
        }
        <Text>{total}</Text>
        <Button title="Clear" onPress={() => setTotal(0)}></Button>
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
});
