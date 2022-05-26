const chart = document.querySelector('#chart')
const expenseColumns = document.querySelectorAll('.exp-col')
const columnLabel = document.querySelectorAll('.weekday')

// Break this function up!!!
const displayData = function(data) {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const date = new Date()
  const dayNum = date.getDay()

  const weeklySpend = []
  const amountLabelHeight = 54
  const maxColHeight = chart.scrollHeight - amountLabelHeight

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
    expenseColumns[counter].style.minHeight = 
    Math.floor(spend / maxSpend * maxColHeight) + "px"
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


// Might not include below - these are hover controls 
// for the weekday labels
columnLabel.forEach(label => {
  label.addEventListener('mouseover', () => {
    const gridChildren = label.parentElement.children
    for (let x = 0; x < gridChildren.length; x++) {
      if(gridChildren[x] === label) {
        expenseColumns[x - 7].children[0].classList.remove('hidden')
      }
    }
  })
})

columnLabel.forEach(label => {
  label.addEventListener('mouseleave', () => {
    const gridChildren = label.parentElement.children
    for (let x = 0; x < gridChildren.length; x++) {
      if(gridChildren[x] === label) {
        expenseColumns[x - 7].children[0].classList.add('hidden')
      }
    }
  })
})