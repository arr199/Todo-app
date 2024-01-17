import React from 'react'
import { TouchableNativeFeedback, View, Text, Modal, StyleSheet, Alert } from 'react-native'
import { useTaskStore } from '../store/store'

export default function RemoveTaskModal (): JSX.Element {
  const { modalVisible, setModalVisible, removeTask, selectedTask } = useTaskStore()
  if (selectedTask === null) return <></>
  const { id } = selectedTask

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.')
    }}>
    <View style={styles.modalView}>
      <Text style={{ fontWeight: '600', fontSize: 20 }}>Do you want to remove the task ? </Text>
      <View style={{ marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 20 }}>
        {/* YES BUTTON */}
        <TouchableNativeFeedback onPress={() => {
          removeTask(id)
          setModalVisible(false)
        }} >
          <View style={{ backgroundColor: '#0077ff', paddingVertical: 5, paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }} >Yes</Text>
          </View>
        </TouchableNativeFeedback>
       {/* NO BUTTON */}
        <TouchableNativeFeedback onPress={() => { setModalVisible(false) }} >
          <View style={{ backgroundColor: '#0077ff', paddingVertical: 5, paddingHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }} >No</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  </Modal>

  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontWeight: '600'

  }
})
