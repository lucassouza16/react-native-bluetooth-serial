const ReactNative = require('react-native')
const { Buffer } = require('buffer')
const { NativeModules, NativeEventEmitter } = ReactNative
const RCTBluetoothSerial = NativeModules.RCTBluetoothSerial

/**
 * Listen for available events
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
RCTBluetoothSerial.on = (eventName, handler) => {
  NativeEventEmitter.addListener(eventName, handler)
}

/**
 * Stop listening for event
 * @param  {String} eventName Name of event one of connectionSuccess, connectionLost, data, rawData
 * @param  {Function} handler Event handler
 */
RCTBluetoothSerial.removeListener = (eventName, handler) => {
  NativeEventEmitter.removeListener(eventName, handler)
}

/**
 * Write data to device, you can pass string or buffer,
 * We must convert to base64 in RN there is no way to pass buffer directly
 * @param  {Buffer|String} data
 * @return {Promise<Boolean>}
 */
RCTBluetoothSerial.write = (data) => {
  if (typeof data === 'string') {
    data = new Buffer(data)
  }
  return RCTBluetoothSerial.writeToDevice(data.toString('base64'))
}

module.exports = RCTBluetoothSerial
