import React from "react";


const Cell = ({
    cell,
    animals,
    setCurrentAnimal,
    setTargetCell,
    ondrop,
    onclickDeleteCell,
    setIsShowModal
}) => {
    const dragStart = (animalId) => {
        console.log(animalId);
        setCurrentAnimal(animalId)
    }


    const ondropHandler = () => {
        ondrop()
    }


    const dragEnterHadler = (cellId) => {
        setTargetCell(cellId)
    }


    return (
        <li className="cell"
            onDragEnter={() => dragEnterHadler(cell.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => ondropHandler()}
            onClick={() => {
                setTargetCell(cell.id)
                setIsShowModal(true)
            }}
        >
            {
                animals.map(animal => (
                    <div
                        key={animal.id}
                        draggable
                        className="animal"
                        onDragStart={() => dragStart(animal.id)}
                    >{animal.name}</div>
                ))
            }
            <span onClick={(e) => {
                e.stopPropagation()
                onclickDeleteCell(cell.id)
            }} className="deletecell">x</span>
        </li>
    )
}

export default Cell