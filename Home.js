import React, { useState, useContext } from 'react';
import { View, Button, FlatList, TextInput, Text } from 'react-native';
import { useHistory } from "react-router-native";
import AvailableDonutsContext from './AvailableDonutsContext';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
    const [donutName, setDonutName] = useState(null);
    const [donutPrice, setDonutPrice] = useState(0);
    const { 
      selectedDonuts: selectedItems, 
      setSelectedItems, 
      styles, 
      quantity, 
      setQuantity,
      getDefaultItems } = useContext(AvailableDonutsContext);
    const history = useHistory();

    const handleAddDonut = () => {
      if(selectedItems.some((d) => d.name === donutName)) return;
  
      const donut = {
        name: donutName,
        price: donutPrice,
        key: uuidv4(),
        quantity,
        tempQuantity: quantity,
      };
  
      setSelectedItems([...selectedItems, donut]);
      setDonutName('');
      setDonutPrice(0);
      setQuantity(0);
    }
  
    const handleRemoveDonut = (donut) => {
      setSelectedItems(selectedItems.filter((d => d.key !== donut.key)))
    }
    
    return(
      <>
        <View style={styles.homePageContainer}>
          <TextInput style={styles.textInput} placeholder="Donut name" onChangeText={(name) => setDonutName(name)} value={donutName}/>
          <TextInput style={styles.textInput} placeholder="Donut price" onChangeText={(price) => setDonutPrice(+price)} keyboardType="number-pad" value={donutPrice === 0 ? '' : donutPrice.toString()} />
          <TextInput style={styles.textInput} placeholder="Quantity" onChangeText={(quantity) => setQuantity(+quantity)} keyboardType="number-pad" value={quantity === 0 ? '' : quantity.toString()}/>
          <View style={{flex: 1}}>
            <Button title="Add Donut" onPress={() => handleAddDonut()}></Button>
            <Button title="Go To Orders" onPress={() => history.push('/orders')}></Button>
            <Button title="Reset Default Donuts" onPress={() => getDefaultItems()}></Button>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: "space-between", marginTop: 20}}>
          <FlatList data={selectedItems}
              renderItem={({item}) => {
                return (
                  <View style={{marginHorizontal: 10, marginVertical: 2.5}}>
                    <Button title={`${item.name} ($${item.price})`} onPress={() => handleRemoveDonut(item)}></Button>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      </>
    );
  }

  export default Home;