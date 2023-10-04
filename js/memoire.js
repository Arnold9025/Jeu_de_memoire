const Memoire = (function () {
    class Image {
        url
        point
        constructor (url, point) {
            this.url = url
            this.point = point
        }

        createCard () {
            const flipCard = document.createElement('div')
            const flipCardInner = document.createElement('div')

            const flipCardFront = document.createElement('div')
            const flipCardBack = document.createElement('div')
            const point = document.createElement('div')
            point.setAttribute('class', 'point')
            point.innerHTML = '+' + this.point
            flipCardInner.setAttribute('class', 'flip-card-inner')
            flipCardInner.setAttribute('data-point', this.point)

            flipCardFront.setAttribute('class', 'flip-card-front')
            flipCard.setAttribute('class', 'flip-card')
            flipCardBack.setAttribute('class', 'flip-card-back')
            flipCardInner.appendChild(flipCardBack)
            flipCardFront.appendChild(point)
            flipCardInner.appendChild(flipCardFront)
            flipCard.appendChild(flipCardInner)
            flipCardBack.style.backgroundImage = 'url(./image/back.jpg)'
            flipCardFront.style.backgroundImage = 'url(' + this.url + ')'
            return flipCard
        }
    }
    // class deck {
    //     cards
    //     constructor () {

    //     }
    // }
    class Score {
        scoreActuel
        meilleurScore
        constructor () {
            this.scoreActuel = document.getElementById('scoreActuel')
            this.meilleurScore = document.getElementById('meilleurScore')
        }

        updateScoreActuel (scoreToUpdate) {
            this.scoreActuel.innerHTML = 'Score:' + scoreToUpdate
        }

        updateMeilleurScore (scoresTab) {
            if (scoresTab.length === 0) {
                this.meilleurScore.innerHTML = 'Meilleur Score:' + 0
            } else {
                this.meilleurScore.innerHTML = 'Meilleur Score:' + Math.max(...scoresTab)
            }
        }
    }
    function showImage (images, output) {
        while (output.firstElementChild) {
            output.removeChild(output.firstElementChild)
        }
        images.forEach(function (image) {
            const div = document.createElement('div')
            div.setAttribute('class', 'showCard')
            div.style.backgroundImage = 'url(' + image.url + ')'

            output.appendChild(div)
        })
    }
    function generateImage (img, difficulty) {
        const images = []
        if (difficulty.value !== '-' && img.value !== '-') {
            for (let index = 0; index < difficulty.value; index++) {
                images.push(new Image('./image/' + img.value + (index + 1) + '.jpg', (index + 1) * 5))
            }
        }

        return images
    }
    function endGame (scoresTab, game, images, output, form, scoreActuelValue, body, value) {
        scoresTab.push(scoreActuelValue)
        removeAllChildren(game)

        const bR = body.querySelector('#buttonRestart')
        if (bR) {
            body.removeChild(bR)
        }
        const buttonRestart = document.createElement('div')
        buttonRestart.innerHTML = 'Restart'
        buttonRestart.setAttribute('id', 'buttonRestart')

        game.appendChild(buttonRestart)
        buttonRestart.addEventListener('click', function () {
            displayCards(game, images, output, form, scoresTab, value)
        })
    }
    function updateTimer (endTime, timerInterval, endOfGame) {
        const timer = document.getElementById('timer')

        const timerSets = document.getElementsByClassName('timerset')
        const now = new Date().getTime()
        const timeLeft = endTime - now
        const secondsLeft = Math.floor(timeLeft / 1000)
        if (secondsLeft >= 0) {
            const minutes = Math.floor(secondsLeft / 60)
            const seconds = secondsLeft % 60
            timerSets[0].innerHTML = minutes
            timerSets[1].innerHTML = ':'
            timerSets[2].innerHTML = (seconds < 10 ? '0' : '') + seconds
            endOfGame = false
        } else {
            clearInterval(timerInterval)
            endOfGame = true
        }
        return [secondsLeft, endOfGame]
    }

    function comparerCartes (tableau) {
        for (let i = 0; i < tableau.length; i++) {
            for (let j = i + 1; j < tableau.length; j++) {
                if (tableau[i].lastElementChild.style.backgroundImage !== tableau[j].lastElementChild.style.backgroundImage) {
                    return false
                }
            }
        }
        return true
    }

    function doFlip (card, flippedCards, endTime, cardsFound, timerInterval, images, secondsLeft, endOfGame) {
        let datas = []
        const points = 0
        console.log(endOfGame)
        if (!endOfGame) {
            card.classList.add('flipped')
            if (!flippedCards.includes(card)) {
                flippedCards.push(card)
                datas = verifyCards(flippedCards, points, endTime, cardsFound, timerInterval, images, secondsLeft, endOfGame)
                endOfGame = datas[3]
                return datas
            }
        }
    }
    function removeAllChildren (parent) {
        while (parent.firstElementChild) {
            parent.removeChild(parent.firstElementChild)
        }
    }
    function verifyCards (flippedCards, points, endTime, cardsFound, timerInterval, images, secondsLeft, endOfGame) {
        if (!comparerCartes(flippedCards) && !endOfGame) {
            setTimeout(function () {
                flippedCards.forEach(function (card) {
                    card.classList.remove('flipped')
                })
                flippedCards.length = 0
            }, 1000)
        } else {
            if (flippedCards.length >= 2 && !endOfGame) {
                const cardFound = flippedCards.slice(-1)[0]
                points = parseInt(cardFound.getAttribute('data-point'))

                flippedCards.splice(0, flippedCards.length)
                cardsFound++
            }
        }
        if (cardsFound === images.length && !endOfGame) {
            clearInterval(timerInterval)
            points += secondsLeft
            endOfGame = true
        }

        return [points, cardsFound, timerInterval, endOfGame]
    }

    function displayCards (game, images, output, form, scoresTab, value) {
        const timer = document.getElementById('timer')
        let endOfGame = false
        const endGamePage = document.getElementById('endGame')
        const score = new Score()
        let time = 0
        console.log(value)
        switch (value) {
        case '4':
            time = 60000
            break
        case '8':
            time = 80000
            break
        case '12':
            time = 120000
            break
        }
        endGamePage.style.display = 'none'
        const imagesCopie = images.slice()
        const imagesFusionne = images.concat(imagesCopie)
        const flippedCards = []
        timer.style.display = 'flex'
        removeAllChildren(game)
        form.style.display = 'none'
        const stop = document.createElement('h3')
        stop.innerHTML = 'STOP'
        const stopPanel = document.getElementById('stopPanel')
        removeAllChildren(stopPanel)
        stopPanel.appendChild(stop)
        stop.addEventListener('click', function () {
            clearInterval(timerInterval)

            endGame(scoresTab, game, images, output, form, scoreActuelValue, body, value)
        })
        removeAllChildren(output)

        imagesFusionne.sort(function () {
            return Math.random() - 0.5 // tri aléatoire
        })
        imagesFusionne.forEach(function (image) {
            game.appendChild(image.createCard())
        })
        const cards = document.querySelectorAll('.flip-card-inner')
        let cardsFound = 0
        let scoreActuelValue = 0
        const body = document.getElementsByTagName('body')[0]

        const startTime = new Date().getTime()
        const endTime = startTime + time// 1 minute
        let secondsLeft = ''
        let timerInterval = setInterval(function () {
            secondsLeft = updateTimer(endTime, timerInterval, endOfGame)[0]
            endOfGame = updateTimer(endTime, timerInterval, endOfGame)[1]
        }, 1000)

        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                if (endOfGame === false) {
                    const datas = doFlip(card, flippedCards, endTime, cardsFound, timerInterval, images, secondsLeft, endOfGame
                    )

                    scoreActuelValue += datas[0]
                    score.updateScoreActuel(scoreActuelValue)
                    console.log(scoresTab)
                    score.updateMeilleurScore(scoresTab)
                    cardsFound = datas[1]
                    timerInterval = datas[2]
                    endOfGame = datas[3]

                    if (endOfGame === true) {
                        endGame(scoresTab, game, images, output, form, scoreActuelValue, body, value)
                    }
                } else {
                    endGame(scoresTab, game, images, output, form, scoreActuelValue, body, value)
                }
            })
        })
    }

    function init () {
        const form = document.getElementsByTagName('form')[0]
        const imageOption = document.getElementById('imageOption')
        const difficultyOption = document.getElementById('difficultyOption')
        const output = document.getElementById('output')
        const game = document.getElementById('game')
        let images = []
        const scoresTab = []
        difficultyOption.addEventListener('input', function () {
            images = generateImage(imageOption, difficultyOption)
            showImage(images, output)
        })
        imageOption.addEventListener('input', function () {
            images = generateImage(imageOption, difficultyOption)
            showImage(images, output)
        })

        game.firstElementChild.addEventListener('click', function () {
            if (imageOption.value !== '-' && difficultyOption.value !== '-') {
                displayCards(game, images, output, form, scoresTab, difficultyOption.value)
            }
        })
    }

    return {
        init
    }
})()
