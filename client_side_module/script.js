let game = {
  home: {
    homeUI: document.getElementById('home'),
    username: document.getElementById('username'),
    btnSubmit: document.getElementById('btnSubmit')
  },
  countdown: {
    countdownUI: document.getElementById('countdown'),
    countTime: document.querySelector('.countTime'),
    countInt: 3
  },
  pause: {
    pauseUI: document.getElementById('pause'),
    btnContinue: document.querySelector('.continue')
  },
  gameOver: {
    gameOverUI: document.getElementById('gameOver'),
    result: {
      playerRes: document.getElementById('playerRes'),
      timeRes: document.getElementById('timeRes'),
      scoreRes: document.getElementById('scoreRes')
    }
  },
  gameplay: {
    gameplayUI: document.getElementById('gameplay'),
    board: {
      boardArea: document.getElementById('board'),
      dangerArea: document.querySelector('.danger-area'),
      peluruD: document.getElementById('dArea'),
      peluruF: document.getElementById('fArea'),
      peluruJ: document.getElementById('jArea'),
      peluruK: document.getElementById('kArea'),
      border: document.querySelector('.border'),
      virus: document.getElementById('#virus')
    },
    statistic: {
      player: document.getElementById('player'),
      time: document.getElementById('time'),
      score: document.getElementById('score'),
      fail: document.getElementById('fail'),
      hint: document.getElementById('hint'),
    }
  },
  states: {
    pause: false,
    time: 1,
    score: 0,
    fail: 0
  }
};

window.onload = () => {
  userValidation();
  game.countdown.countdownUI.style.display = 'none';
  game.pause.pauseUI.style.display = 'none';
  game.gameOver.gameOverUI.style.display = 'none';
  game.gameplay.board.peluruD.style.display = 'none';
  game.gameplay.board.peluruF.style.display = 'none';
  game.gameplay.board.peluruJ.style.display = 'none';
  game.gameplay.board.peluruK.style.display = 'none';
  game.gameplay.statistic.hint.style.display = 'none';
  game.gameplay.gameplayUI.style.display = 'none';
}

function userValidation() {
  game.home.username.addEventListener('input', () => {
    if (game.home.username.value.length > 0) {
      game.home.btnSubmit.removeAttribute('disabled');
    } else {
      game.home.btnSubmit.setAttribute('disabled', true);
    }
  });
  game.home.btnSubmit.addEventListener('click', () => {
    if (game.home.username.value.length > 0) {
      countdown();
      game.gameplay.statistic.player.innerHTML = game.home.username.value;
      game.home.homeUI.style.display = 'none';
      game.countdown.countdownUI.style.display = 'grid';
      game.gameplay.gameplayUI.style.display = 'flex';
    }
  });
}

function countdown() {
  let interval = setInterval(() => {
    if (game.countdown.countInt <= 3) {
      game.countdown.countTime.innerHTML = game.countdown.countInt;
      game.countdown.countInt--;
    }
    if (game.countdown.countInt == 0) {
      game.countdown.countInt = 3;
      clearInterval(interval);
      let timeout = setTimeout(() => {
        game.countdown.countdownUI.style.display = 'none';
        game.gameplay.statistic.hint.style.display = 'block';
        clearTimeout(timeout);
        mainEvents();
      }, 1000);
    }
  }, 1000);
}

function mainEvents() {
  let setSpawn = [350, 450, 550, 650, 750];
  let resSpawn = [];

  for (let i = 0; i < 1; i++) {
    let index = Math.floor(Math.random() * setSpawn.length);
    resSpawn.push(setSpawn[index]);
    setSpawn.splice(index, 1);
  }

  keyClick();
  setInterval(time, 1000);
  setInterval(createVirus, resSpawn);
  setInterval(updateVirus, 16);
  setInterval(countFail, 18);
  pause();
}

function keyClick() {
  document.addEventListener('keyup', (e) => {
    if (game.states.pause == false) {
      switch (e.key) {
        case 'd':
          game.gameplay.board.peluruD.style.display = 'block';
          setTimeout(() => {
            game.gameplay.board.peluruD.style.display = 'none';
          }, 50);
          collision();
          break;
        case 'f':
          game.gameplay.board.peluruF.style.display = 'block';
          setTimeout(() => {
            game.gameplay.board.peluruF.style.display = 'none';
          }, 50);
          collision();
          break;
        case 'j':
          game.gameplay.board.peluruJ.style.display = 'block';
          setTimeout(() => {
            game.gameplay.board.peluruJ.style.display = 'none';
          }, 50);
          collision();
          break;
        case 'k':
          game.gameplay.board.peluruK.style.display = 'block';
          setTimeout(() => {
            game.gameplay.board.peluruK.style.display = 'none';
          }, 50);
          collision();
          break;
      }
    }
  });
}

function time() {
  if (game.states.pause == false) {
    let minutes = Math.floor(game.states.time / 60);
    let seconds = game.states.time % 60;
    game.states.time++;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    game.gameplay.statistic.time.innerHTML = `${minutes}:${seconds}`;
  }
}

function pause() {
  document.addEventListener('keyup', (e) => {
    switch (e.key) {
      case 'Escape':
        if (game.states.pause == false) {
          game.states.pause = true;
          game.pause.pauseUI.style.display = 'grid';
          game.gameplay.statistic.hint.style.display = 'block';
          game.gameplay.statistic.hint.innerHTML = '>> Press ESC to continue game';
        } else {
          countdownPause();
          continueGame();
          setTimeout(() => {
            game.states.pause = false;
            game.gameplay.statistic.hint.innerHTML = '>> Press ESC to pause game';
          }, 4500);
        }
        break;
    }
  });
  game.pause.btnContinue.addEventListener('click', () => {
    countdownPause();
    continueGame();
    setTimeout(() => {
      game.states.pause = false;
      game.gameplay.statistic.hint.innerHTML = '>> Press ESC to pause game';
    }, 4500);
  });
}

function countdownPause() {
  game.countdown.countTime.innerHTML = '';
  setTimeout(() => {
    let interval = setInterval(() => {
      if (game.countdown.countInt <= 3) {
        game.countdown.countTime.innerHTML = game.countdown.countInt;
        game.countdown.countInt--;
      }
      if (game.countdown.countInt == 0) {
        game.countdown.countInt = 3;
        clearInterval(interval);
        let timeout = setTimeout(() => {
          game.countdown.countdownUI.style.display = 'none';
          clearTimeout(timeout);
        }, 1000);
      }
    }, 1000);
  }, 400);
}

function continueGame() {
  setTimeout(() => {
    game.countdown.countdownUI.style.display = 'grid';
    game.pause.pauseUI.style.display = 'none';
  }, 400);
}

function createVirus() {
  if (game.states.pause == false) {
    let setLocate = [0, 25, 50, 75];
    let resLocate = [];

    for (let i = 0; i < 1; i++) {
      let index = Math.floor(Math.random() * setLocate.length);
      resLocate.push(setLocate[index]);
      setLocate.splice(index, 1);
    }

    const virus = document.createElement('div');
    virus.setAttribute('id', 'virus');
    virus.setAttribute('width', '75');
    virus.setAttribute('height', '75');
    virus.style.left = `calc(${resLocate}% + 11px)`;
    game.gameplay.board.boardArea.appendChild(virus);
  }
}

function updateVirus() {
  if (game.states.pause == false) {
    let allVirus = document.querySelectorAll('#virus');
    for (let i = 0; i < allVirus.length; i++) {
      let virus = allVirus[i];
      let update = parseInt(window.getComputedStyle(virus).getPropertyValue('top'));
      virus.style.top = update + 5 + 'px';
    }
  }
}

function collision() {
  if (game.states.pause == false) {
    let allVirus = document.querySelectorAll('#virus');
    let allPeluru = document.getElementsByClassName('peluru');

    for (let i = 0; i < allPeluru.length; i++) {
      let peluru = allPeluru[i];
      for (let j = 0; j < allVirus.length; j++) {
        let virus = allVirus[j];
        if (virus != undefined) {
          let virusBound = virus.getBoundingClientRect();
          let peluruBound = peluru.getBoundingClientRect();
          if (
            peluruBound.left < virusBound.right &&
            peluruBound.right > virusBound.left &&
            peluruBound.top < virusBound.bottom &&
            peluruBound.bottom > virusBound.top
          ) {
            virus.parentElement.removeChild(virus);
            game.states.score++;
            game.gameplay.statistic.score.innerHTML = game.states.score;
          }
        }
      }
    }
  }
}

function countFail() {
  if (game.states.pause == false) {
    let allVirus = document.querySelectorAll('#virus');
    let allBorder = document.querySelectorAll('.border');

    for (let i = 0; i < allBorder.length; i++) {
      let border = allBorder[i];
      for (let j = 0; j < allVirus.length; j++) {
        let virus = allVirus[j];
        if (virus != undefined) {
          let virusBound = virus.getBoundingClientRect();
          let borderBound = border.getBoundingClientRect();
          if (
            virusBound.left < borderBound.right &&
            virusBound.right > borderBound.left &&
            virusBound.top < borderBound.bottom &&
            virusBound.bottom > borderBound.top
          ) {
            virus.parentElement.removeChild(virus);
            game.states.fail++;
            game.gameplay.statistic.fail.innerHTML = game.states.fail;
          }
        }
      }
    }

    if (game.states.fail == 10) {
      game.states.pause = true;
      game.gameOver.gameOverUI.style.display = 'grid';
      game.gameplay.statistic.hint.style.display = 'none';
      game.gameOver.result.playerRes.innerHTML = game.home.username.value;
      game.gameOver.result.timeRes.innerHTML = game.gameplay.statistic.time.innerHTML;
      game.gameOver.result.scoreRes.innerHTML = game.states.score;
    }
  }
}