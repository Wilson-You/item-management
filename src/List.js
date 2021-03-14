import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
function List({ list, clearItems, removeItem, editItem }) {
    return <div>
        {list.map(item => {
            return (
                <section key={item.id} className='list-container'>
                    <p>{item.itemName}</p>
                    <div className='icon-btn-container'>
                        <button type='button' className='edit-btn' onClick={() => editItem(item.id)}>
                            <FaEdit />
                        </button>
                        <button type='button' className='remove-btn' onClick={() => removeItem(item.id)}>
                            <FaTrash />
                        </button>
                    </div>
                </section>)
        })}
        <button className='clear-btn' onClick={clearItems}>clear items</button>
    </div>

}

export default List
