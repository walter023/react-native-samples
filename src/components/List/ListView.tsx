/* eslint-disable no-use-before-define */
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ListItem from './ListItem.tsx';
import { ListType } from '../../../types.ts';

interface Props {
  listData: ListType[];
}

const ListView: React.FC<Props> = ({ listData }) => (
  <FlatList
    style={styles.listSpace}
    contentContainerStyle={styles.listcontainer}
    data={listData}
    keyExtractor={item => item.name}
    renderItem={data => <ListItem data={data} />}
    showsVerticalScrollIndicator={false}
  />
);

const styles = StyleSheet.create({
  listSpace: {
    paddingTop: 8,
    marginHorizontal: 6,
  },
  listcontainer: {
    flexGrow: 1,
    paddingBottom: 16,
  },
});

export default ListView;
