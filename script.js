// add javascript here
function gid(id) {
    return document.getElementById(id)
}
const cards = []
let mode = 0
let cardVar = 0
function renderCards() {
    const container = gid('flashcards')
    container.innerHTML = ''
    if (cards.length === 0) {
        container.textContent = 'No flashcards yet.'
        return
    }
    const list = document.createElement('ul')
    cards.forEach(card => {
        const item = document.createElement('li')
        item.textContent = `${card.term}: ${card.definition}`
        list.appendChild(item)
    })
    container.appendChild(list)
}
gid('mode').addEventListener('click', function(){
    if (mode == 0){
        document.getElementsByName('enter').forEach(el => {
        el.style.display = 'none';
        })
          document.getElementsByName('learn').forEach(el => {
        el.style.display = 'inline';
        });
        mode = 1
        gid('title').textContent = 'Test mode!'
      
    } else {
        document.getElementsByName('enter').forEach(el => {
        el.style.display = 'inline';
        })
        document.getElementsByName('learn').forEach(el => {
        el.style.display = 'none';
        });
        mode = 0
        gid('title').textContent = 'Add flashcards here!'
    }
})


gid('pushBtn').addEventListener('click', function(){
    const term = gid('fname').value.trim()
    const definition = gid('fdef').value.trim()
    if (!term || !definition){
        alert('invalid input!')
        return
    }
    cards.push({ term, definition })
    gid('fname').value = ''
    gid('fdef').value = ''
    renderCards()
    console.log(cards)
})
gid('next').addEventListener('click', function(){
    cardVar = 0
    var pick = Math.floor(Math.random() * cards.length)
    var card = cards[pick]
    console.log(card)
    gid('current').textContent = card.term
  
})
  gid('flipr').addEventListener('click', function() {
    if (cardVar == 0) {
        gid('current').textContent = card.definition
        cardVar = 1
    } else {
        gid('current').textContent = card.term
        cardVar = 0
    }
})
document.addEventListener('DOMContentLoaded', function() {
    renderCards()
    document.getElementsByName('enter').forEach(el => {
        el.style.display = 'inline';
    });
    document.getElementsByName('learn').forEach(el => {
        el.style.display = 'none';
    });
    mode = 0; 
    gid('title').textContent = 'Enter flashcards here!';
    var pick = Math.floor(Math.random() * cards.length)
    var card = cards[pick]
    gid('current').textContent = card.term
})