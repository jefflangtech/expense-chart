const chart = document.querySelector('#chart')
const expenseColumns = document.querySelectorAll('.exp-col')
const dayLabel = document.querySelectorAll('.weekday')

const getFontSize = function() {
  const htmlElem = document.querySelector('html')
  const style = window.getComputedStyle(htmlElem, null).getPropertyValue('font-size')
  return parseInt(style)
}

const dayGetter = function() {
  const date = new Date()
  return date.getDay()
}

const displayData = function(data) {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const dayNum = dayGetter()

  const weeklySpend = []
  const amountLabelHeight = (getFontSize() * 3)
  const maxColHeight = chart.scrollHeight - amountLabelHeight

  let counter = 0
  data.forEach(element => {
    const { day, amount } = { ...element }
    expenseColumns[counter].children[0].innerText = `$${amount}`
    dayLabel[counter].innerText = day
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
  column.addEventListener('touchstart', () => {
    column.children[0].classList.forEach(item => {
      if(item === 'hidden') {
        column.children[0].classList.remove('hidden')
        expenseColumns.forEach(col => {
          if(col !== column) {
            col.children[0].classList.add('hidden')
          }
        })
      } else {
        column.children[0].classList.add('hidden')
      }
    })
  })
})

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

dayLabel.forEach(label => {
  label.addEventListener('mouseover', () => {
    const gridChildren = label.parentElement.children
    for (let x = 0; x < gridChildren.length; x++) {
      if(gridChildren[x] === label) {
        expenseColumns[x - 7].children[0].classList.remove('hidden')
      }
    }
  })
})

dayLabel.forEach(label => {
  label.addEventListener('mouseleave', () => {
    const gridChildren = label.parentElement.children
    for (let x = 0; x < gridChildren.length; x++) {
      if(gridChildren[x] === label) {
        expenseColumns[x - 7].children[0].classList.add('hidden')
      }
    }
  })
})