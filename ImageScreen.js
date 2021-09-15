import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import Styles from './Styles';

const CLIENT_ID = 'ACCESS_KEY_HERE';

const ImageScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getData = async () => {
    console.log(page);
    try {
      const url = `https://api.unsplash.com/search/photos?query=popular&orientation=portrait&page=${page}&per_page=6&client_id=${CLIENT_ID}`;
      const response = await fetch(url);
      const json = await response.json();
      setData(data.concat(json.results));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onEndReached = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setLoading(true, getData());
  }, [page]);

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View style={Styles.gridItem}>
        <FastImage
          style={[
            Styles.imageContainer,
            index % 2 === 1 ? Styles.rightGridMargin : Styles.leftGridMargin,
          ]}
          source={{
            uri: item.urls.small,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  };

  const renderFooter = () => {
    return loading ? (
      <View style={Styles.loader}>
        <ActivityIndicator size="small" />
      </View>
    ) : null;
  };

  return (
    <FlatList
      style={Styles.container}
      data={data}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      ListFooterComponent={renderFooter}
    />
  );
};

export default ImageScreen;
