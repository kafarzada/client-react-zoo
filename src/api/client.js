import axios from 'axios'


export const fetchCells = async function () {
    try {
        const data = await axios("http://localhost:3000/cell")
        return data.data?.cells
    }
    catch (e) {
        throw Error(e.message)
    }
}


export const fetchAnimals = async function () {
    try {
        const data = await axios("http://localhost:3000/animal")
        return data?.data?.animals
    }
    catch (e) {
        throw Error(e.message)
    }
}


export const fetchForwardAnimal = async function (animalId, targetCellId) {
    const result = await axios.patch(`http://localhost:3000/animal/${animalId}/${targetCellId}`)
    return result
}


export const fetchNewCell = async function () {
    try {
        const newCell = axios.post("http://localhost:3000/cell", {})
        return newCell
    } catch (e) {
        throw Error(e.message)
    }
}


export const fetchNewAnimal = async function (name) {
    try {
        const data = await axios.post('http://localhost:3000/animal', { name })
        console.log(data.data?.animal);
        return data.data?.animal
    } catch (e) {
        throw Error(e.message)
    }
}


export const fetchDeleteCell = async function (cellId) {
    try {
        const response = await axios.delete("http://localhost:3000/cell/" + cellId)
        const { cId, animals } = response.data.data
        return {
            cId, animals
        }
    } catch (error) {
        throw Error(error.message)
    }
}