import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AvailableDonutsContext from './AvailableDonutsContext';
import defaultDonuts from './defaultDonuts.json';


const styles = StyleSheet.create({
    homePageContainer: {
      flex: 1,
      marginTop: 25,
      marginHorizontal: 10,
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
  });
  

const AvailableDonutsState = (props) => {
    const [selectedDonuts, setSelectedDonuts] = useState(defaultDonuts);
    const [quantity, setQuantity] = useState(0);


    return(
      <AvailableDonutsContext.Provider value={{
        selectedDonuts,
        setSelectedDonuts,
        styles,
        quantity,
        setQuantity,
      }}>
          {props.children}
      </AvailableDonutsContext.Provider>  
    );
}

export default AvailableDonutsState;