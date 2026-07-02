 let firstCard = null
    let lock = false
    let counter = 0
    const cards = document.querySelectorAll('.cardinner')
    const counterP = document.getElementById('counter')
    function updateCount() {
      counterP.innerText = "Total Flips: " + counter
    }
    cards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.dataset.matched === "true") { return }
        else if (lock) {
          return
        }
        else if (!firstCard) {
          card.classList.toggle('flipped')
          firstCard = card
          counter++
          updateCount()
        }
        else if (firstCard === card) {
          card.classList.remove('flipped')
          firstCard = null
          counter--
          updateCount()
          return
        }
        else {
          card.classList.toggle('flipped')
          if (firstCard.dataset.type === card.dataset.type) {
            firstCard.classList.add('matched')
            card.classList.add('matched')
            firstCard.dataset.matched = "true"
            card.dataset.matched = "true"
            firstCard = null
            counter++
            updateCount()
          } else {
            lock = true
            counter++
            updateCount()
            setTimeout(() => {
              firstCard.classList.remove('flipped')
              card.classList.remove('flipped')
              firstCard = null
              lock = false
            }, 1000)
          }
        }
      })

    })
