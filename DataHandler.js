import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (key) => {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
}

const setData = async (key, value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
}

const DataHandler = {
    getData,
    setData,
}

export default DataHandler;