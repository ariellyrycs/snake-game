
(() => {
    'use strict';
    let longX = 100,
        longY = 100,
        snake = new DoublyLinkedList(),
        snakeAccess = {},
        directions = {
            ArrowUp: [0, -1],
            ArrowDown: [0, 1],
            ArrowLeft: [-1, 0],
            ArrowRight: [1, 0]
        },
        currentDirections = [0, -1],
        playing,
        charryChange,
        currentCherryPosition,
        boardElem = document.querySelector('.board');

    //initial state
    snake.addStart([50, 50]);
    snakeAccess['50,50'] = true;

    let generateCherry = () => {
        let s;
        do {
            s = [Math.floor(Math.random() * longX), Math.floor(Math.random() * longY)];
        } while(snakeAccess[s[0] + ',' + s[1]]);
        return s;
    };
    
    let renderBoard = () => {
        let boardStr = '';
        for(let i = 0; i < longY; i += 1) {
            for(let j = 0; j < longX; j += 1) {
                let icon = '',
                    currentAccess = j + ',' + i;
                if(snakeAccess[currentAccess]) {
                    icon = 'snake-head';
                } else if(typeof snakeAccess[currentAccess] !== 'undefined') {
                    icon = 'tail';
                } else if(i === currentCherryPosition[1] && j === currentCherryPosition[0]) {
                    icon = 'cherry';
                }
                boardStr += `<div class="${icon}"></div>`;
            }
        }
        boardElem.innerHTML = boardStr;
    };

    let recreateCherry =  () => {
        currentCherryPosition = generateCherry();
        clearInterval(charryChange);
        charryChange = setTimeout(() => currentCherryPosition = generateCherry(), 40000);
    };


    let moveDirection = () => {
        if(!snake.head) return;
        let [x, y] = snake.head.val;
        snakeAccess[x + ',' + y] = false;
        x += currentDirections[0];
        y += currentDirections[1];
        x += longX;
        y += longY;
        x %= longX;
        y %= longY;
        if(currentCherryPosition[0] === x && currentCherryPosition[1] === y) {
            recreateCherry();
        } else {
            let [tailX, tailY] = snake.tail.val;
            delete snakeAccess[tailX + ',' + tailY];
            snake.removeEnd();
        }
        let newPosition = x + ',' + y;
        if(typeof snakeAccess[newPosition] === 'undefined') {
            snakeAccess[newPosition] = true;
        } else {
            alert('you lost!');
            clearInterval(playing);
            return;
        }
        snake.addStart([x, y]);
        renderBoard();
    };

    //start
    recreateCherry();
    moveDirection();
    playing = setInterval(moveDirection, 100);
    

    document.addEventListener('keydown', (e) => {
        if(typeof directions[e.key] !== 'undefined') {
            if(currentDirections[0] + directions[e.key][0] === 0 &&
                currentDirections[1] + directions[e.key][1] === 0) {
                return;
            }
            currentDirections = directions[e.key];
        }
    });
})();
