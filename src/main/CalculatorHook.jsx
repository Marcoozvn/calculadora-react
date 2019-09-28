import React, { useState} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

export default props => {
  
  const [displayValue, setDisplayValue] = useState('0')
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operation, setOperation] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [currentIndex, setCurrentIndex] = useState(0)

  const clearMemory = () => {
    setDisplayValue('0')
    setClearDisplay(false)
    setOperation(null)
    setValues([0, 0])
    setCurrentIndex(0)
  }

  const inputOperation = (op) => {
    if (currentIndex === 0) { 
      setOperation(op)
      setCurrentIndex(1)
      setClearDisplay(true)

    } else {
      
      const equals = op === '='
      const currentOperation = operation
      const auxValues = [...values]

      auxValues[0] = doCalculus(auxValues, currentOperation)
      auxValues[1] = 0

      setDisplayValue(auxValues[0])
      setOperation(equals ? null : operation)
      setCurrentIndex(equals ? 0 : 1)
      setClearDisplay(!equals)
      setValues(auxValues)
    }
  }

  const doCalculus = (values, op) => {
    switch (op) {
      case '+':
        return values[0] + values[1]
      case '-':
        return values[0] - values[1]
      case '*':
        return values[0] * values[1]
      case '/':
        return values[0] / values[1]
      default:
        return 0
      }
  }

  const addDigit = (n) => {
    if (n === '.' && displayValue.includes('.')) return

    const auxClearDisplay = displayValue === '0' || clearDisplay
    const currentValue = auxClearDisplay ? '' : displayValue
    const auxDisplayValue = currentValue + n

    setDisplayValue(auxDisplayValue)
    setClearDisplay(false)

    if (n !== '.') {
      const i = currentIndex
      const newValue = parseFloat(auxDisplayValue)
      const auxValues = [...values]
      auxValues[i] = newValue

      setValues(auxValues)
    }
  }

  return (
    <div className="calculator">
      <Display value={displayValue}/>
      <Button label="AC" click={() => clearMemory()} triple/>
      <Button label="/" click={inputOperation} operation/>
      <Button label="7" click={addDigit}/>
      <Button label="8" click={addDigit}/>
      <Button label="9" click={addDigit}/>
      <Button label="*" click={inputOperation} operation/>
      <Button label="4" click={addDigit}/>
      <Button label="5" click={addDigit}/> 
      <Button label="6" click={addDigit}/>
      <Button label="-" click={inputOperation} operation/>
      <Button label="1" click={addDigit}/>
      <Button label="2" click={addDigit}/>
      <Button label="3" click={addDigit}/>
      <Button label="+" click={inputOperation} operation/>
      <Button label="0" click={addDigit} double/>
      <Button label="." click={addDigit}/>
      <Button label="=" click={inputOperation} operation/>
    </div>
  )
}