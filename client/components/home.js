import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getList, changeSelectState, selectAll, deselectAll } from '../redux/reducers/user'

const Home = () => {
  const [cheking, isCheking] = useState(false)
  const dispatch = useDispatch()

  const list = useSelector((store) => store.users)
  const listSelected = useSelector((store) =>
  store.users.filter((user) => user.isChecked).map((user) => `${user.first_name} ${user.last_name}`)
)

  const handleChange = (id) => {
    dispatch(changeSelectState(id))
    isCheking(list.length===listSelected.length)
  }
  const handleChangeAll = () => {
    if (cheking) {
      dispatch(deselectAll())
      isCheking(!cheking)
    } else {
      dispatch(selectAll())
      isCheking(!cheking)
    }
  }


  useEffect(() => {
    dispatch(getList())
  }, [])
  return (
    <div>
      {JSON.stringify(list)}
      <div className="flex flex-row w-1/2 ">
        <div className="table w-full">
          <div className="m-2 table-cell border-2 bg-gray-700 text-black px-4 py-2 text-center">
            <input name="selectAll" type="checkbox" onChange={handleChangeAll} checked={cheking} />
          </div>
          <div className="m-2 table-cell border-2 bg-gray-700 text-black px-4 py-2 text-center">
            First Name
          </div>
          <div className="m-2 table-cell  border-2 bg-gray-700 text-black px-4 py-2 text-center">
            Last Name
          </div>
          <div className="m-2 table-cell border-2 bg-gray-700 text-black px-4 py-2 text-center">
            Age
          </div>
        </div>
      </div>

      {list.map((user) => (
        <div key={`${user.id}`} className="flex flex-row w-1/2 ">
          <div className="table w-full">
            <div
              className={`m-2 table-cell ${
                user.isChecked ? 'bg-blue-600' : 'bg-gray-400'
              } text-black px-4 py-2`}
            >
              <input
                type="checkbox"
                checked={user.isChecked}
                onChange={() => handleChange(user.id)}
              />
            </div>
            <div className="m-2 table-cell bg-gray-400 text-black px-4 py-2  text-center">
              {user.first_name}
            </div>
            <div className="m-2 table-cell bg-gray-400 text-black px-4 py-2 text-center">
              {user.last_name}
            </div>
            <div className="m-2 table-cell bg-gray-400 text-black px-4 py-2 text-center ">
              {user.age}
            </div>
          </div>
        </div>
      ))}
      <div className="flex flex-row w-1/2 border-2">{listSelected.join(', ')}</div>
    </div>
  )
}

Home.propTypes = {}

export default Home
