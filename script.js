
function gid(id) {
    return document.getElementById(id)
}
var pick
var card
const cards = []
let mode = 0
let cardVar = 0
let currentCardIndex = 0
function renderCards() {
    //this is used to render the flashcards on the page, it will be called whenever a new card is added or when the page is loaded
    const container = gid('flashcards')
    container.innerHTML = ''
    if (cards.length === 0) {
        container.textContent = 'No flashcards yet.'
        return
    }
    const list = document.createElement('ul') //my list here
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        const item = document.createElement('li')
        item.textContent = `${card.term}: ${card.definition}`
        list.appendChild(item)
    }
    container.appendChild(list)
}

function addCard(term, definition) {
    if (!term || !definition) {
        alert('invalid input!')
        return false
    }
    cards.push({ term, definition })
    return true
}

function shuffleCards(array, iterations) { 
    if (!array || array.length == 0) {
        return array
    }
    for (let iter = 0; iter < iterations; iter++) {
        for (let i = array.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1))
            const temp = array[i]
            array[i] = array[randomIndex]
            array[randomIndex] = temp
        }
    }
    return array
}

gid('mode').addEventListener('click', function(){
    if (mode == 0){
        const enterEls = document.getElementsByName('enter')
        for (let i = 0; i < enterEls.length; i++) {
            enterEls[i].style.display = 'none'
        }
        const learnEls = document.getElementsByName('learn')
        for (let i = 0; i < learnEls.length; i++) {
            learnEls[i].style.display = 'inline'
        }
        mode = 1
        gid('title').textContent = 'Test mode!'
      
    } else {
        const enterEls = document.getElementsByName('enter')
        for (let i = 0; i < enterEls.length; i++) {
            enterEls[i].style.display = 'inline'
        }
        const learnEls = document.getElementsByName('learn')
        for (let i = 0; i < learnEls.length; i++) {
            learnEls[i].style.display = 'none'
        }
        mode = 0
        gid('title').textContent = 'Add flashcards here!'
    }
})


gid('pushBtn').addEventListener('click', function(){
    const term = gid('fname').value.trim()
    const definition = gid('fdef').value.trim()
    if (!addCard(term, definition)) {
        return
    }
    gid('fname').value = ''
    gid('fdef').value = ''
    renderCards()
    console.log(cards)
})
gid('next').addEventListener('click', function(){
    if (cards.length === 0) {
        return
    }
    cardVar = 0
    currentCardIndex = (currentCardIndex + 1) % cards.length
    card = cards[currentCardIndex]
    console.log(card)
    gid('current').textContent = card.term
    gid('type').textContent = 'Term:'
})

gid('shuffle').addEventListener('click', function(){
    const iterations = parseInt(gid('iterations').value) || 1
    shuffleCards(cards, iterations)
    currentCardIndex = 0
    card = cards[0]
    cardVar = 0
    gid('current').textContent = card.term
    gid('type').textContent = 'Term:'
    console.log('Cards shuffled')
})

  gid('flipr').addEventListener('click', function() {
    if (cardVar == 0) {
        gid('current').textContent = card.definition
        cardVar = 1
        gid('type').textContent = 'Definition:'
    } else {
        gid('current').textContent = card.term
        cardVar = 0
        gid('type').textContent = 'Term:'
    }
})
//https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event for DOMContentLoaded listner 
document.addEventListener('DOMContentLoaded', function() {
    renderCards()
    const enterEls = document.getElementsByName('enter')
    for (let i = 0; i < enterEls.length; i++) {
        enterEls[i].style.display = 'inline'
    }
    const learnEls = document.getElementsByName('learn')
    for (let i = 0; i < learnEls.length; i++) {
        learnEls[i].style.display = 'none'
    }
    mode = 0; 
    gid('title').textContent = 'Enter flashcards here!';
    if (cards.length > 0) {
        currentCardIndex = 0
        card = cards[0]
        gid('type').textContent = 'Term:'
        gid('current').textContent = card.term
    }
})