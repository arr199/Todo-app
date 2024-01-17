import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native'

export default function Task (props: any): JSX.Element {
  return (

    <TouchableNativeFeedback {...props}>
      <View style={styles.container} >
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
          <View style={styles.square}></View>
          <Text>{props.children as React.ReactNode}</Text>
        </View>
        <View style={styles.circle} ></View>
      </View>
    </TouchableNativeFeedback>

  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 15

  },
  animation: { opacity: 1 },
  square: { width: 20, height: 20, backgroundColor: '#55BCF666', borderRadius: 3, marginRight: 15 },
  title: { fontWeight: '600' },
  circle: { borderColor: '#55BCF6', width: 14, height: 14, borderWidth: 2, borderRadius: 5 }

})
