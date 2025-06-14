import axios from 'axios'

const url='/api/persons'

function addPeople(newPeople){
  const request = axios.post(url, newPeople)
  return request.then(response => response.data)
}

function updatePeople(newPeople) {
  const request = axios.put(`${url}/${newPeople.id}`, newPeople)
  return request.then(response => response.data)
}

function deletePeople(id){
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

function getAll(){
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default { addPeople, deletePeople, getAll, updatePeople}
