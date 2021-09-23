import React, { useState, useContext } from 'react';
import { View, Button, FlatList, TextInput } from 'react-native';
import AvailableDonutsContext from './AvailableDonutsContext';

const Home = ({ toggleView }) => {
    const [donutName, setDonutName] = useState(null);
    const [donutPrice, setDonutPrice] = useState(0);
    const { selectedDonuts, setSelectedDonuts, styles } = useContext(AvailableDonutsContext);
  
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
  
    return(
      <>
        <View style={styles.homePageContainer}>
          <TextInput style={styles.textInput} placeholder="Donut name" onChangeText={(name) => setDonutName(name)} value={donutName}/>
          <TextInput style={styles.textInput} placeholder="Donut price" onChangeText={(price) => setDonutPrice(+price)} keyboardType="number-pad" value={donutPrice === 0 ? '' : donutPrice.toString()} />
          <View style={{flex: 1}}>
            <Button title="Add Donut" onPress={() => handleAddDonut()}></Button>
            <Button title="Go To Orders" onPress={() => toggleView(false)}></Button>
          </View>
        </View>
        <View style={{flex: 3, justifyContent: "space-between", marginTop: 20}}>
          <FlatList data={selectedDonuts}
              renderItem={({item}) => {
                return (
                  <View style={{marginHorizontal: 10}}>
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