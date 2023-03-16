import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TaskList = ({data}) => {
    const {key, nome} = data
  return (
    <View>
      <Text>{nome}</Text>
    </View>
  )
}

export default TaskList

const styles = StyleSheet.create({})