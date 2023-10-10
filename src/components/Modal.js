import { React } from "react"

export default function Modal({
    animals,
    setIsShowModal,
    SelectCell
}) {


    const changeHandler = (e) => {
        console.log(e.target.value);
        SelectCell(e.target.value)

    }


    return (
        <div className="modal" onClick={() => setIsShowModal(false)}>
            <div className="modal__inner" onClick={(e) => e.stopPropagation()}>
                <select onChange={(e) => { changeHandler(e) }}>
                    <option>Выберите из списка</option>
                    {
                        animals.map(a => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}