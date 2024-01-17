import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem } from './ListItem';
import { ListType } from '../../../types';

interface Props {
  listData: ListType[];
}

export const ListView: React.FC<Props> = ({ listData }) => (
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
