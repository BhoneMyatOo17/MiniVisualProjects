let matchedcount = 0
 const carddata = [
  {
    number:8,
    suit:"♠",
    type:"spade8",
    color:"black"
  },
  {
    number:4,
    suit:"♥",
    type:"heart4",
    color:"red"
  },
  {
    number:7,
    suit:"♦",
    type:"diamond7",
    color:"red"
  },
  {
    number:8,
    suit:"♣",
    type:"club8",
    color:"black"
  }
 ]
 const pairs = [...carddata, ...carddata]//spread arr twice
 pairs.sort(() => Math.random() - 0.5) //sort pairs into random 


 
 let firstCard = null
    let lock = false
    let counter = 0
    const cards = document.querySelectorAll('.cardinner')
    const counterP = document.getElementById('counter')
    const cardcontainer = document.getElementById('card-container')
    function updateCount() {
      counterP.innerText = counter
    }

    function checkMatched(){
      if(matchedcount === carddata.length){
        setTimeout(()=>{
        alert('Congrats! All cards are matched')
        matchedcount = 0
        firstCard = null
        lock = false
        cardcontainer.innerHTML=""
        pairs.sort(() => Math.random() - 0.5)
        renderCards()
        },400)
      }
    }

    function renderCards(){
     
      for (let i=0;i<pairs.length;i++){
        const { number, suit, type, color } = pairs[i]
        const card = document.createElement('div')
        card.classList.add('flipcard')
        cardcontainer.appendChild(card)
        const cardinner = document.createElement('div')
        cardinner.classList.add('cardinner')
        cardinner.dataset.type = type
        card.appendChild(cardinner)
        const cardfront = document.createElement('div')
        cardfront.classList.add('cardfront','shadow-md')
        cardinner.appendChild(cardfront)
        const cardborder = document.createElement('div')
        cardborder.classList.add('card-border')
        cardfront.appendChild(cardborder)
        const p = document.createElement('p')
        p.classList.add('icon-front')
        p.innerText = "✧"
        cardborder.appendChild(p)
        const cardback = document.createElement('div')
        cardback.classList.add('cardback','shadow-md')
        cardinner.appendChild(cardback)
        const innerborder = document.createElement('div')
        innerborder.classList.add('card-border')
        if(color==="black"){
          cardback.classList.add('black')
        }else{
          cardback.classList.add('red')
        }
        cardback.appendChild(innerborder)
        const topNum = document.createElement('div')
        topNum.innerText = number
        topNum.classList.add('absolute','top-3','left-4','text-xl')
        innerborder.appendChild(topNum)
        const icon = document.createElement('div')
        icon.classList.add('icon','absolute','top-1/2','left-1/2','-translate-x-1/2','-translate-y-1/2')
        icon.innerText=suit
        innerborder.appendChild(icon)
        const bottomNum = document.createElement('div')
        bottomNum.innerText = number
        bottomNum.classList.add('absolute','bottom-3','right-4','text-xl')
        innerborder.appendChild(bottomNum)
      cardinner.addEventListener('click', () => {
        if (cardinner.dataset.matched === "true") { return }
        else if (lock) {
          return
        }
        else if (!firstCard) {
          cardinner.classList.toggle('flipped')
          firstCard = cardinner
          counter++
          updateCount()
        }
        else if (firstCard === cardinner) {
          cardinner.classList.remove('flipped')
          firstCard = null
          counter--
          updateCount()
          return
        }
        else {
          cardinner.classList.toggle('flipped')
          if (firstCard.dataset.type === cardinner.dataset.type) {
            firstCard.classList.add('matched')
            cardinner.classList.add('matched')
            firstCard.dataset.matched = "true"
            cardinner.dataset.matched = "true"
            firstCard = null
            counter++
            matchedcount++
            checkMatched()
            updateCount()
          } else {
            lock = true
            counter++
            updateCount()
            const card1 = firstCard
            const card2 = cardinner
            firstCard = null
            lock = true
            setTimeout(() => {
              card1.classList.remove('flipped')
              card2.classList.remove('flipped')
              lock = false
            }, 1000)
          }
        }
      })

    
      }
    }

    renderCards()