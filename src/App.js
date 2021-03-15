import './App.css';
import { useState, useEffect } from 'react'
import Alert from './Alert'
import List from './List'

const getLocalStorage = () => {
  const list = localStorage.getItem('list')
  if (list) {
    const parsedList = JSON.parse(list)
    return parsedList
  }
  else {
    return []
  }
}
function App() {
  const [itemName, setItemName] = useState('')
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })
  const [list, setList] = useState(getLocalStorage())
  const [isEdit, setIsEdit] = useState(false)
  const [editID, setEditID] = useState(null)

  const removeAlert = () => {
    setAlert({ show: false, msg: '', type: '' })
  }

  const clearItems = () => {
    setList([])
  }

  const removeItem = id => {
    setList(list.filter(item => item.id !== id))
  }
  const editItem = id => {
    const foundItem = list.find(item => item.id === id)
    setItemName(foundItem.itemName)
    setIsEdit(true)
    setEditID(foundItem.id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!itemName) {
      setAlert({ show: true, msg: 'Please enter an item', type: 'success' })
    } else if (itemName && isEdit) {
      setList(list.map(item => {
        if (item.id === editID) {
          return { ...item, itemName: itemName }
        }
        return item
      })
      )
      setItemName('')
      setEditID(null)
      setIsEdit(false)
      setAlert({ show: true, msg: 'Item updated', type: 'success' })
    } else {
      const newItem = { id: new Date().getTime().toString(), itemName: itemName }
      setList([...list, newItem])
      setItemName('')
      setAlert({ show: true, msg: 'Item added', type: 'success' })
    }
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  })
  return (
    <div className='all-container'>
      {alert.show && <Alert {...alert} removeAlert={removeAlert} list={list} />}
      <form className='form-container' onSubmit={handleSubmit}>
        <h2 className='title'>Item Management</h2>
        <div className='input-btn-container'>
          <input type='text' className='input-field' placeholder='e.g book' value={itemName} onChange={e => setItemName(e.target.value)} />
          <button type='submit'>{isEdit ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {list.length > 0 && <List list={list} clearItems={clearItems} removeItem={removeItem} editItem={editItem} />}
    </div>

  )
}


export default App;
