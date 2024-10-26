import React, { Component } from 'react'
import  { useNavigate } from 'react-router-dom'

const TableHeader = () => {

  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>  {/* Added a header for the remove button */}
        <th>Edit</th>
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const navigate = useNavigate(); // For navigation after form submission
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>
          <button className='btn btn-danger' onClick={() => props.removeCharacter(index)}>Delete</button>  {/* Button to remove character */}
        </td>
        <td>
          <button className='btn btn-primary' onClick={() => navigate(`/edit/${row.id}`)}>Edit</button>  {/* Button to remove character */}
        </td>
      </tr>
    )
  })

  return <tbody>{rows}</tbody>
}

class Table extends Component {
  render() {
    const { characterData, removeCharacter } = this.props  // Destructure removeCharacter
    return (
      <table className='table table-hover my-3'>
        <TableHeader />
        <TableBody characterData={characterData} removeCharacter={removeCharacter} />  
      </table>
    )
  }
}

export default Table;
