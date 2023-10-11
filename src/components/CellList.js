import React from 'react';
import Cell from './Cell';

const CellList = ({
    cells,
    animals,
    setCurrentAnimal,
    setTargetCell,
    ondrop,
    newCellHandler,
    onclickDeleteCell,
    setIsShowModal
}) => {


    const onclickNewCellHandler = () => {
        newCellHandler()
    }


    return (
        <ul className='cellList'>
            {
                cells.length === 0 ?
                    <p>Пустой лист</p> : ''
            }
            {
                cells.map(cell => (
                    <Cell
                        setTargetCell={setTargetCell}
                        setCurrentAnimal={setCurrentAnimal}
                        cell={cell}
                        key={cell.id}
                        ondrop={ondrop}
                        animals={animals.filter(a => a.cell === cell.id)}
                        onclickDeleteCell={onclickDeleteCell}
                        setIsShowModal={setIsShowModal}
                    />
                ))
            }
            <li onClick={onclickNewCellHandler} className='newCellBtn'>+</li>
        </ul>
    )
}

export default CellList