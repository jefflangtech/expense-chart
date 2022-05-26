const chart = document.querySelector('#chart')
const expenseColumns = document.querySelectorAll('.exp-col')
const columnLabel = document.querySelectorAll('.weekday')

const displayData = function(data) {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat']
  const date = new Date()
  const dayNum = date.getDay()


  const weeklySpend = []
  const maxColHeight = chart.scrollHeight

  let counter = 0
  data.forEach(element => {
    const { day, amount } = { ...element }
    expenseColumns[counter].children[0].innerText = `$${amount}`
    columnLabel[counter].innerText = day
    if(daysOfWeek[dayNum] === day) {
      expenseColumns[counter].classList.add('current-day')
    }
    weeklySpend.push(amount)
    counter++
  })
  counter = 0
  const maxSpend = Math.max(...weeklySpend)
  weeklySpend.forEach(spend => {
    expenseColumns[counter].style.minHeight = Math.floor(spend / maxSpend * maxColHeight) + "px"
    counter++
  })
}

async function getExpenseData() {
  const response = await fetch('./data.json')
  const data = await response.json()
  displayData(data)
}

getExpenseData()

// Event Listeners

expenseColumns.forEach(column => {
  column.addEventListener('mouseover', () => {
    column.children[0].classList.remove('hidden')
  })
})

expenseColumns.forEach(column => {
  column.addEventListener('mouseleave', () => {
    column.children[0].classList.add('hidden')
  })
})

// REVISIT - make hover on the weekday label show the amount as well

// columnLabel.forEach(label => {
//   label.addEventListener('mouseover', () => {
//     const gridChildren = label.parentElement.children
//     gridChildren.forEach(child => {
//       if 
//     })
//   })
// })