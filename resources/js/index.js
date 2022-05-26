// fetch('./data.json')
//   .then(response => {
//     return response.json()
//   })
//   .then(data => console.log(data))

async function getExpenseData() {
  const response = await fetch('./data.json')
  const data = await response.json()
  displayData(data)
}

const displayData = function(data) {
  data.forEach(element => {
    console.log(element)
  })
}

// getExpenseData()

// const dataContainer = document.querySelector('.data-container')
// const para = document.createElement('p')
// para.innerText = 'test text'
// dataContainer.appendChild(para)
// console.dir(para)