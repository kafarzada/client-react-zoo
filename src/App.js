import './App.css';
import { useEffect, useState } from 'react';
import { fetchCells, fetchAnimals, fetchNewAnimal, fetchForwardAnimal, fetchNewCell, fetchDeleteCell } from "./api/client"
import CellList from './components/CellList';
import Modal from './components/Modal';


function App() {
  let [animals, setAnimals] = useState([])
  let [cells, setCells] = useState([])
  let [currentAnimal, setCurrentAnimal] = useState('')
  let [targetCell, setTargetCell] = useState('')
  let [name, setname] = useState('')
  let [isShowModal, setIsShowModal] = useState(false)
  let [error, setError] = useState('')

  useEffect(() => {
    fetchCells()
      .then(cells => setCells(cells))
      .catch(e => {
        setError(e.message)
      })

    fetchAnimals()
      .then(animals => {
        setAnimals(animals)
      })
      .catch(e => {
        setError(e.message)
      })
  }, [])


  const sendNewAnimal = async (e) => {
    e.preventDefault()
    try {
      const newAnimal = await fetchNewAnimal(name)
      setAnimals([...animals, newAnimal])
    } catch (e) {
      console.error(e)
    }
  }


  const SelectCell = async (animalId = null) => {
    try {
      const data = await fetchForwardAnimal(animalId ?? currentAnimal, targetCell)
      const { animal } = data.data
      setAnimals([...animals.map(a => {
        if (a.id === animal.id) {
          a.cell = animal.cell
        }
        return a
      })])
    } catch (e) {
      console.error(e.message)
    }
  }


  const newCellHandler = async () => {
    try {
      const data = await fetchNewCell()
      const { cell } = data?.data
      setCells([...cells, cell])
    } catch (e) {
      console.error(e.message)
    }
  }


  const onclickDeleteCell = async (cellId) => {
    try {
      const data = await fetchDeleteCell(cellId)
      const { cId } = data
      const returnAnimals = data.animals
      setCells([...cells.filter(cell => cell.id !== cId)])
      if (returnAnimals.length !== 0) {
        const temp = animals.map(a => {
          for (let i = 0; i < returnAnimals.length; i++) {
            if (a.id === returnAnimals[i].id) {
              a.cell = null
            }
          }
          return a
        })
        setAnimals([...temp])
      }
    } catch (e) {
      console.error(e.message)
    }
  }


  return (
    <div className="App">
      {
        error ? <span className='span-error-message'>Ошибка при получении данных: <br /> {error}</span> : ""
      }
      <div className='content'>
        {
          isShowModal ? <Modal
            animals={animals.filter(a => a.cell === null)}
            setCurrentAnimal={setCurrentAnimal}
            currentAnimal={currentAnimal}
            setIsShowModal={setIsShowModal}
            SelectCell={SelectCell}
          /> : ""
        }
        <div className='column main-content'>
          <CellList
            setCurrentAnimal={setCurrentAnimal}
            setAnimals={setAnimals}
            setTargetCell={setTargetCell}
            cells={cells}
            ondrop={SelectCell}
            newCellHandler={newCellHandler}
            animals={animals.filter(a => a.cell !== null)}
            onclickDeleteCell={onclickDeleteCell}
            setIsShowModal={setIsShowModal}
          />
        </div>
        <div className='column app-form'>
          <div className='cell'>
            {
              animals.filter(a => a.cell === null).map(a => (
                <div
                  key={a.id}
                  draggable
                  className='animal'
                  onDragStart={() => setCurrentAnimal(a.id)}
                >{a.name}</div>
              ))
            }
          </div>
          <form>
            <input className='input__newAnimal' type='text' required value={name} onChange={(e) => setname(e.target.value)} />
            <input className='btn' type={"submit"} onClick={sendNewAnimal} value={"Добавить"} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
