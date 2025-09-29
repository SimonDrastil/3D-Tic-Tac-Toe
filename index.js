(() => {
  'use strict';

  const BOARD_SIZE = 3;
  const MAX_FLOORS = 3;
  const STORAGE_KEYS = {
    score: 'ttt3d-score',
    settings: 'ttt3d-settings'
  };
  const SOUND_SOURCES = {
    place: 'data:audio/wav;base64,UklGRrQGAABXQVZFZm10IBAAAAABAAEA4C4AAMBdAAACABAAZGF0YZAGAAAAAAwMNBeoILMn0Su1LE4qySSOHDgSiwZj+qTuLeTC2wPWXNP/0+DXtt7/5w7zEP8kC2YWASBBJ50rwiybKlAlRR0TE3gHUvuD7+vkUtxZ1nPT1dN41xfeNucp8iD+OgqUFVgfyyZkK8ks4irTJfkd6xNkCEH8Y/Cs5eXctNaO06/TFNd83W/mRfEw/VAJwRSqHlEmJSvMLCUrUSaqHsEUUAkw/UXxb+Z83RTXr9OO07TW5dys5WPwQfxkCOsT+R3TJeIqySxkK8smWB+UFToKIP4p8jbnF95419XTc9NZ1lLc6+SD71L7eAcTE0UdUCWbKsIsnStBJwEgZhYkCxD/DvP/57be4Nf/01zTA9bC2y3kpO5j+osGOBKOHMkkTiq1LNErsyeoIDQXDAwAAPTzzOhY303YL9RL07LVN9ty48jtdfmdBVwR0xs+JP0ppCwBLCAoSiEBGPIM8ADc9Jrp/9+/2GPUPtNl1bDau+Lt7Ij4rgR9EBUbriOnKY0sKyyIKOkhyhjXDeABxvVs6qjgNdmc1DfTHtUt2gfiFeyc978DnQ9UGhsjTClyLFEs7CiEIpEZuw7QArD2P+tW4a/Z29Q009vUr9lW4T/rsPbQArsOkRmEIuwoUSxyLEwpGyNUGp0PvwOc9xXsB+It2h7VN9Oc1DXZqOBs6sb14AHXDcoY6SGIKCssjSynKa4jFRt9EK4EiPjt7LvisNpl1T7TY9S/2P/fmunc9PAA8gwBGEohICgBLKQs/Sk+JNMbXBGdBXX5yO1y4zfbstVL0y/UTdhY38zo9PMAAAwMNBeoILMn0Su1LE4qySSOHDgSiwZj+qTuLeTC2wPWXNP/0+DXtt7/5w7zEP8kC2YWASBBJ50rwiybKlAlRR0TE3gHUvuD7+vkUtxZ1nPT1dN41xfeNucp8iD+OgqUFVgfyyZkK8ks4irTJfkd6xNkCEH8Y/Cs5eXctNaO06/TFNd83W/mRfEw/VAJwRSqHlEmJSvMLCUrUSaqHsEUUAkw/UXxb+Z83RTXr9OO07TW5dys5WPwQfxkCOsT+R3TJeIqySxkK8smWB+UFToKIP4p8jbnF95419XTc9NZ1lLc6+SD71L7eAcTE0UdUCWbKsIsnStBJwEgZhYkCxD/DvP/57be4Nf/01zTA9bC2y3kpO5j+osGOBKOHMkkTiq1LNErsyeoIDQXDAwAAPTzzOhY303YL9RL07LVN9ty48jtdfmdBVwR0xs+JP0ppCwBLCAoSiEBGPIM8ADc9Jrp/9+/2GPUPtNl1bDau+Lt7Ij4rgR9EBUbriOnKY0sKyyIKOkhyhjXDeABxvVs6qjgNdmc1DfTHtUt2gfiFeyc978DnQ9UGhsjTClyLFEs7CiEIpEZuw7QArD2P+tW4a/Z29Q009vUr9lW4T/rsPbQArsOkRmEIuwoUSxyLEwpGyM=',
    win: 'data:audio/wav;base64,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',
    draw: 'data:audio/wav;base64,UklGRnQKAABXQVZFZm10IBAAAAABAAEA4C4AAMBdAAACABAAZGF0YVAKAAAAABEJ2BEPGnQhySfdLIYwpjIsMxQyZy86K68l9B4+F8wO4gXK/MrzLes54y7cRdat0YzO/MwIzbHO6NGV1pHcq+Or61D0U/1qBk8PuBdhHwwmgyuaLzAyLzORMlkwmixyJwshmRlXEYkId/9p9qfte+Ul3uHX4dJPz0fN2cwJzs7QENWu2nrhPem48ab6vwO7DFAVOB0zJAoqjS6XMQ8z6jIqMdstGikMI+Ib1xMrCyQCDvku8M/nM+CZ2TXUNNC2zc7Mhc3Vz6rT5the397mKu/+9xIBHgrYEvoaQiJ0KF8t2zDLMiAz2DH8LqQq8yQXHkgWxA3RBLj7wPI06ljibNuo1TvRSM7ozCXN/c5i0jnXWd2S5KjsW/Vl/noHVBCqGDggwSYRLPwvYzIyM2My/C8RLMEmOCCqGFQQegdl/lv1qOyS5FndOddi0v3OJc3ozEjOO9Go1WzbWOI06sDyuPvRBMQNSBYXHvMkpCr8LtgxIDPLMtswXy10KEIi+hrYEh4KEgH+9yrv3uZe3+bYqtPVz4XNzsy2zTTQNdSZ2TPgz+cu8A75JAIrC9cT4hsMIxop2y0qMeoyDzOXMY0uCiozJDgdUBW7DL8Dpvq48T3peuGu2hDVztAJztnMR81Pz+HS4dcl3nvlp+1p9nf/iQhXEZkZCyFyJ5osWTCRMi8zMDKaL4MrDCZhH7gXTw9qBlP9UPSr66vjkdyV1ujRsc4IzfzMjM6t0UXWLtw54y3ryvPK/OIFzA4+F/QeryU6K2cvFDIsM6YyhjDdLMkndCEPGtgREQkAAO/2KO7x5YzeN9gj03rPWs3UzOzNmdDG1FHaDOHC6DTxHvo2AzYM0xTHHNIjuylTLnQxBDP4Mk8xGC5rKW8jVRxVFLALrQKW+bHwSOif4PTZfdRm0NDN0cxvzafPZtOO2PXeZ+ap7nf3iQCXCVkShRrbIR8oHy2xMLkyJzP3MTIv8CpSJYYewxZIDloFQfxF87DqyOLN2/bVc9FpzvHMFs3WziXS5tb03B7kKezV9Nz98gbSDzEYzR9nJssrzC9KMjIzezIrMFYsGieiICIZ1hACCO7+4vUo7Qblvt2M16HSJc81zeDMKM4E0VzVDdvp4bjpPPIv+0gEQA3MFagdlCRYKsUuuDEYM9syAzGeLccopyJuG1gTpQqbAYb4rO9W58jfP9nv0wTQnc3OzJ3NBNDv0z/ZyN9W56zvhvibAaUKWBNuG6cixyieLQMx2zIYM7gxxS5YKpQkqB3MFUANSAQv+zzyuOnp4Q3bXNUE0SjO4Mw1zSXPodKM177dBuUo7eL17v4CCNYQIhmiIBonViwrMHsyMjNKMswvyytnJs0fMRjSD/IG3P3V9CnsHuT03ObWJdLWzhbN8cxpznPR9tXN28jisOpF80H8WgVIDsMWhh5SJfAqMi/3MSczuTKxMB8tHyjbIYUaWRKXCYkAd/ep7mfm9d6O2GbTp89vzdHM0M1m0H3U9Nmf4EjosfCW+a0CsAtVFFUcbyNrKRguTzH4MgQzdDFTLrsp0iPHHNMUNgw2Ax76NPHC6AzhUdrG1JnQ7M3UzFrNes8j0zfYjN7x5Sju7/YAABEJ2BEPGnQhySfdLIYwpjIsMxQyZy86K68l9B4+F8wO4gXK/MrzLes54y7cRdat0YzO/MwIzbHO6NGV1pHcq+Or61D0U/1qBk8PuBdhHwwmgyuaLzAyLzORMlkwmixyJwshmRlXEYkId/9p9qfte+Ul3uHX4dJPz0fN2cwJzs7QENWu2nrhPem48ab6vwO7DFAVOB0zJAoqjS6XMQ8z6jIqMdstGikMI+Ib1xMrCyQCDvku8M/nM+CZ2TXUNNC2zc7Mhc3Vz6rT5the397mKu/+9xIBHgrYEvoaQiJ0KF8t2zDLMiAz2DH8LqQq8yQ='
  };

  const selectors = {};

  const state = {
    floors: [],
    currentPlayer: 'X',
    gameOver: false,
    winner: null,
    winningLine: null,
    history: [],
    statusMessage: 'Preparing match…',
    settings: {
      showCoords: false,
      sounds: true,
      firstPlayerNextMatch: 'X'
    },
    score: { X: 0, O: 0, D: 0 },
    recentlyAddedFloorIndex: null,
    lastFocusedCell: null
  };

  const winLines = generateWinLines();

  document.addEventListener('DOMContentLoaded', init);

  /**
   * Cache references to DOM nodes for quick reuse.
   */
  function cacheElements() {
    selectors.board = document.getElementById('board-stack');
    selectors.statusMessage = document.getElementById('status-message');
    selectors.turnIndicator = document.getElementById('turn-indicator');
    selectors.floorCount = document.getElementById('floor-count');
    selectors.scoreX = document.getElementById('score-x');
    selectors.scoreO = document.getElementById('score-o');
    selectors.scoreD = document.getElementById('score-d');
    selectors.newMatch = document.getElementById('new-match');
    selectors.resetScores = document.getElementById('reset-scores');
    selectors.undoMove = document.getElementById('undo-move');
    selectors.openSettings = document.getElementById('open-settings');
    selectors.modal = document.getElementById('settings-modal');
    selectors.saveSettings = document.getElementById('save-settings');
    selectors.toggleCoords = document.getElementById('toggle-coords');
    selectors.toggleSounds = document.getElementById('toggle-sounds');
    selectors.selectFirstPlayer = document.getElementById('select-first-player');
  }

  function attachEventListeners() {
    selectors.newMatch.addEventListener('click', () => startNewMatch());
    selectors.resetScores.addEventListener('click', handleResetScores);
    selectors.undoMove.addEventListener('click', undoLastMove);
    selectors.openSettings.addEventListener('click', openModal);
    selectors.saveSettings.addEventListener('click', saveSettings);
    selectors.modal.addEventListener('click', (event) => {
      if (event.target && event.target.hasAttribute('data-modal-dismiss')) {
        closeModal();
      }
    });
  }

  function init() {
    cacheElements();
    attachEventListeners();
    loadPersistence();
    applySettingsToControls();
    startNewMatch({ initial: true });
  }

  function startNewMatch({ initial = false } = {}) {
    state.floors = [createFloor(false)];
    state.currentPlayer = state.settings.firstPlayerNextMatch === 'O' ? 'O' : 'X';
    state.gameOver = false;
    state.winner = null;
    state.winningLine = null;
    state.history = [];
    state.statusMessage = '';
    state.recentlyAddedFloorIndex = null;
    state.lastFocusedCell = null;
    updateDefaultStatus();
    renderAll();
    if (!initial) {
      playSound('place', 0.45); // soft cue for reset
    }
  }

  function createFloor(spawnedByTie) {
    return {
      cells: Array(BOARD_SIZE * BOARD_SIZE).fill(null),
      locked: false,
      spawnedByTie: Boolean(spawnedByTie)
    };
  }

  function renderAll() {
    renderBoard();
    renderStatus();
    renderScores();
    updateControls();
    updateBoardMeta();
  }

  function renderBoard() {
    const board = selectors.board;
    board.innerHTML = '';
    board.classList.toggle('show-coords', state.settings.showCoords);
    const translateStep = 38;
    const elevationStep = 72;
    state.floors.forEach((floor, z) => {
      const floorWrapper = document.createElement('div');
      floorWrapper.className = 'board-floor';
      if (floor.locked) {
        floorWrapper.classList.add('is-locked');
      }
      if (state.recentlyAddedFloorIndex === z) {
        floorWrapper.classList.add('is-new');
      }
      const translateX = z * translateStep;
      const translateY = z * -translateStep;
      const translateZ = z * elevationStep;
      floorWrapper.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(58deg) rotateZ(-45deg)`;

      const grid = document.createElement('div');
      grid.className = 'board-floor__grid';
      grid.dataset.label = `Floor ${z + 1}`;

      for (let y = 0; y < BOARD_SIZE; y += 1) {
        for (let x = 0; x < BOARD_SIZE; x += 1) {
          const index = indexFrom(x, y);
          const value = floor.cells[index];
          const cell = document.createElement('button');
          cell.type = 'button';
          cell.className = 'cell';
          cell.dataset.x = String(x);
          cell.dataset.y = String(y);
          cell.dataset.z = String(z);
          cell.dataset.index = String(index);
          cell.dataset.coord = `${x},${y},${z}`;
          cell.id = cellId(x, y, z);
          cell.setAttribute('role', 'gridcell');
          const occupant = value ? `${value}` : 'empty';
          cell.setAttribute('aria-label', `Cell ${x},${y},${z}: ${occupant}`);
          if (value) {
            cell.textContent = value;
            cell.classList.add(value === 'X' ? 'is-x' : 'is-o');
          } else {
            cell.textContent = '';
          }
          if (floor.locked || state.gameOver) {
            cell.disabled = true;
          }
          cell.addEventListener('click', handleCellClick);
          cell.addEventListener('keydown', handleCellKeydown);
          cell.addEventListener('focus', () => {
            state.lastFocusedCell = { x, y, z };
          });

          if (state.winningLine && isCoordInLine(state.winningLine, x, y, z)) {
            cell.classList.add('is-winning');
          }

          grid.appendChild(cell);
        }
      }

      floorWrapper.appendChild(grid);
      board.appendChild(floorWrapper);
    });
    state.recentlyAddedFloorIndex = null;
    restoreFocus();
  }

  function renderStatus() {
    selectors.turnIndicator.textContent = state.currentPlayer;
    selectors.floorCount.textContent = `${state.floors.length} / ${MAX_FLOORS}`;
    selectors.statusMessage.textContent = state.statusMessage;
  }

  function renderScores() {
    selectors.scoreX.textContent = String(state.score.X);
    selectors.scoreO.textContent = String(state.score.O);
    selectors.scoreD.textContent = String(state.score.D);
  }

  function updateControls() {
    selectors.undoMove.disabled = state.history.length === 0;
  }

  function updateBoardMeta() {
    selectors.board.setAttribute('aria-disabled', state.gameOver ? 'true' : 'false');
  }

  function handleCellClick(event) {
    const target = event.currentTarget;
    const x = Number(target.dataset.x);
    const y = Number(target.dataset.y);
    const z = Number(target.dataset.z);
    attemptMove(x, y, z);
  }

  function handleCellKeydown(event) {
    const { key } = event;
    const cell = event.currentTarget;
    const x = Number(cell.dataset.x);
    const y = Number(cell.dataset.y);
    const z = Number(cell.dataset.z);

    if (key === 'ArrowLeft') {
      event.preventDefault();
      focusCell(Math.max(0, x - 1), y, z);
      return;
    }
    if (key === 'ArrowRight') {
      event.preventDefault();
      focusCell(Math.min(BOARD_SIZE - 1, x + 1), y, z);
      return;
    }
    if (key === 'ArrowUp') {
      event.preventDefault();
      focusCell(x, Math.max(0, y - 1), z);
      return;
    }
    if (key === 'ArrowDown') {
      event.preventDefault();
      focusCell(x, Math.min(BOARD_SIZE - 1, y + 1), z);
      return;
    }
    if (key === '[') {
      event.preventDefault();
      if (z > 0) {
        focusCell(x, y, z - 1);
      }
      return;
    }
    if (key === ']') {
      event.preventDefault();
      if (z < state.floors.length - 1) {
        focusCell(x, y, z + 1);
      }
      return;
    }
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      attemptMove(x, y, z);
    }
  }

  function focusCell(x, y, z) {
    const target = document.getElementById(cellId(x, y, z));
    if (target && !target.disabled) {
      target.focus();
    }
  }

  function restoreFocus() {
    if (!state.lastFocusedCell) {
      return;
    }
    const { x, y, z } = state.lastFocusedCell;
    const node = document.getElementById(cellId(x, y, z));
    if (node && !node.disabled) {
      node.focus({ preventScroll: true });
    }
  }

  function attemptMove(x, y, z) {
    if (state.gameOver) {
      return;
    }
    const floor = state.floors[z];
    if (!floor || floor.locked) {
      return;
    }
    const index = indexFrom(x, y);
    if (floor.cells[index]) {
      return;
    }

    const historyEntry = {
      x,
      y,
      z,
      player: state.currentPlayer,
      previousStatus: state.statusMessage,
      previousGameOver: state.gameOver,
      previousWinner: state.winner,
      previousWinningLine: state.winningLine ? state.winningLine.map((coord) => ({ ...coord })) : null,
      previousScore: { ...state.score },
      lockedFloorIndex: null,
      lockedFloorWasLocked: false,
      statusOverride: false,
      floorAdded: false,
      floorAddedIndex: null
    };

    floor.cells[index] = state.currentPlayer;
    playSound('place');

    const winningLine = checkWin(state.currentPlayer);
    if (winningLine) {
      state.gameOver = true;
      state.winner = state.currentPlayer;
      state.winningLine = winningLine;
      state.statusMessage = `${state.currentPlayer} wins on a 3D line!`;
      state.score[state.currentPlayer] += 1;
      playSound('win');
      state.history.push(historyEntry);
      renderAll();
      persistScore();
      return;
    }

    if (isFloorFull(floor)) {
      floor.locked = true;
      historyEntry.lockedFloorIndex = z;
      historyEntry.lockedFloorWasLocked = false;
      historyEntry.statusOverride = true;
      if (state.floors.length < MAX_FLOORS) {
        const newFloor = createFloor(true);
        state.floors.push(newFloor);
        state.recentlyAddedFloorIndex = state.floors.length - 1;
        historyEntry.floorAdded = true;
        historyEntry.floorAddedIndex = state.recentlyAddedFloorIndex;
        state.statusMessage = `Floor ${z + 1} tied — Floor ${state.floors.length} created`;
      } else {
        const allFull = state.floors.every((f) => isFloorFull(f));
        if (allFull) {
          state.gameOver = true;
          state.winner = null;
          state.winningLine = null;
          state.statusMessage = 'Draw — all floors filled';
          state.score.D += 1;
          playSound('draw');
          historyEntry.statusOverride = true;
        } else {
          state.statusMessage = `Floor ${z + 1} tied`;
        }
      }
    }

    if (!state.gameOver) {
      state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
      if (!historyEntry.statusOverride) {
        updateDefaultStatus();
      }
    }

    state.history.push(historyEntry);
    renderAll();
    persistScore();
  }

  function undoLastMove() {
    if (!state.history.length) {
      return;
    }
    const entry = state.history.pop();
    const floor = state.floors[entry.z];
    if (floor) {
      const idx = indexFrom(entry.x, entry.y);
      floor.cells[idx] = null;
    }
    if (entry.lockedFloorIndex !== null && state.floors[entry.lockedFloorIndex]) {
      state.floors[entry.lockedFloorIndex].locked = entry.lockedFloorWasLocked;
    }
    if (entry.floorAdded && entry.floorAddedIndex !== null) {
      const topIndex = state.floors.length - 1;
      if (topIndex === entry.floorAddedIndex && isFloorEmpty(state.floors[topIndex])) {
        state.floors.pop();
        const prevIndex = Math.max(0, entry.floorAddedIndex - 1);
        if (state.floors[prevIndex]) {
          state.floors[prevIndex].locked = false;
        }
      }
    }

    state.currentPlayer = entry.player;
    state.gameOver = entry.previousGameOver;
    state.winner = entry.previousWinner;
    state.winningLine = entry.previousWinningLine ? entry.previousWinningLine.map((coord) => ({ ...coord })) : null;
    state.score = { ...entry.previousScore };
    state.statusMessage = entry.previousStatus;
    state.recentlyAddedFloorIndex = null;
    state.lastFocusedCell = { x: entry.x, y: entry.y, z: entry.z };
    renderAll();
    persistScore();
  }

  function updateDefaultStatus() {
    state.statusMessage = `Turn: ${state.currentPlayer} · Floor ${state.floors.length} of ${MAX_FLOORS}`;
  }

  function isFloorFull(floor) {
    return floor.cells.every((cell) => cell !== null);
  }

  function isFloorEmpty(floor) {
    return floor.cells.every((cell) => cell === null);
  }

  function indexFrom(x, y) {
    return y * BOARD_SIZE + x;
  }

  function cellId(x, y, z) {
    return `cell-${x}-${y}-${z}`;
  }

  function isCoordInLine(line, x, y, z) {
    return line.some((coord) => coord.x === x && coord.y === y && coord.z === z);
  }

  function checkWin(symbol) {
    for (const line of winLines) {
      let matched = true;
      for (const coord of line) {
        const cellValue = getCellValue(coord.x, coord.y, coord.z);
        if (cellValue !== symbol) {
          matched = false;
          break;
        }
      }
      if (matched) {
        return line.map((coord) => ({ ...coord }));
      }
    }
    return null;
  }

  function getCellValue(x, y, z) {
    const floor = state.floors[z];
    if (!floor) {
      return null;
    }
    return floor.cells[indexFrom(x, y)];
  }

  function playSound(name, volume = 1) {
    if (!state.settings.sounds) {
      return;
    }
    const src = SOUND_SOURCES[name];
    if (!src) {
      return;
    }
    const audio = new Audio(src);
    audio.volume = Math.min(1, Math.max(0, volume));
    audio.play().catch(() => {});
  }

  function loadPersistence() {
    try {
      const storedScore = localStorage.getItem(STORAGE_KEYS.score);
      if (storedScore) {
        const parsed = JSON.parse(storedScore);
        if (parsed && typeof parsed === 'object') {
          state.score = {
            X: Number(parsed.X) || 0,
            O: Number(parsed.O) || 0,
            D: Number(parsed.D) || 0
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load score from storage', error);
    }

    try {
      const storedSettings = localStorage.getItem(STORAGE_KEYS.settings);
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed && typeof parsed === 'object') {
          state.settings = {
            showCoords: Boolean(parsed.showCoords),
            sounds: parsed.sounds !== false,
            firstPlayerNextMatch: parsed.firstPlayerNextMatch === 'O' ? 'O' : 'X'
          };
        }
      }
    } catch (error) {
      console.warn('Failed to load settings from storage', error);
    }
  }

  function persistScore() {
    try {
      localStorage.setItem(STORAGE_KEYS.score, JSON.stringify(state.score));
    } catch (error) {
      console.warn('Failed to persist score', error);
    }
  }

  function persistSettings() {
    try {
      localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
    } catch (error) {
      console.warn('Failed to persist settings', error);
    }
  }

  let modalPreviousFocus = null;
  let modalKeydownHandler = null;

  function openModal() {
    if (!selectors.modal.hasAttribute('hidden')) {
      return;
    }
    modalPreviousFocus = document.activeElement;
    selectors.modal.removeAttribute('hidden');
    applySettingsToControls();
    trapModalFocus();
  }

  function closeModal() {
    if (selectors.modal.hasAttribute('hidden')) {
      return;
    }
    selectors.modal.setAttribute('hidden', '');
    releaseModalFocus();
    if (modalPreviousFocus && typeof modalPreviousFocus.focus === 'function') {
      modalPreviousFocus.focus();
    }
    modalPreviousFocus = null;
  }

  function trapModalFocus() {
    const focusable = getFocusableModalElements();
    if (!focusable.length) {
      return;
    }
    const [first, last] = [focusable[0], focusable[focusable.length - 1]];
    modalKeydownHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    selectors.modal.addEventListener('keydown', modalKeydownHandler);
    setTimeout(() => first.focus(), 0);
  }

  function releaseModalFocus() {
    if (modalKeydownHandler) {
      selectors.modal.removeEventListener('keydown', modalKeydownHandler);
      modalKeydownHandler = null;
    }
  }

  function getFocusableModalElements() {
    const nodes = selectors.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    return Array.from(nodes).filter((node) => !node.hasAttribute('disabled'));
  }

  function applySettingsToControls() {
    selectors.toggleCoords.checked = state.settings.showCoords;
    selectors.toggleSounds.checked = state.settings.sounds;
    selectors.selectFirstPlayer.value = state.settings.firstPlayerNextMatch;
  }

  function saveSettings() {
    state.settings.showCoords = selectors.toggleCoords.checked;
    state.settings.sounds = selectors.toggleSounds.checked;
    state.settings.firstPlayerNextMatch = selectors.selectFirstPlayer.value === 'O' ? 'O' : 'X';
    persistSettings();
    renderAll();
    closeModal();
  }

  function handleResetScores() {
    state.score = { X: 0, O: 0, D: 0 };
    persistScore();
    startNewMatch();
  }

  /**
   * Generate all 49 winning lines for a 3×3×3 cube using vector maths.
   * Each line is an array of coordinate objects `{x, y, z}`.
   */
  function generateWinLines() {
    const lines = [];
    const range = Array.from({ length: BOARD_SIZE }, (_, i) => i);

    const makeLine = (coords) => lines.push(coords);

    // Rows and columns within each floor.
    range.forEach((z) => {
      range.forEach((y) => {
        makeLine(range.map((x) => ({ x, y, z })));
      });
      range.forEach((x) => {
        makeLine(range.map((y) => ({ x, y, z })));
      });
    });

    // Vertical pillars across floors.
    range.forEach((x) => {
      range.forEach((y) => {
        makeLine(range.map((z) => ({ x, y, z })));
      });
    });

    // Floor diagonals.
    range.forEach((z) => {
      makeLine(range.map((i) => ({ x: i, y: i, z })));
      makeLine(range.map((i) => ({ x: BOARD_SIZE - 1 - i, y: i, z })));
    });

    // Vertical diagonals along Y/Z planes.
    range.forEach((x) => {
      makeLine(range.map((i) => ({ x, y: i, z: i })));
      makeLine(range.map((i) => ({ x, y: BOARD_SIZE - 1 - i, z: i })));
    });

    // Vertical diagonals along X/Z planes.
    range.forEach((y) => {
      makeLine(range.map((i) => ({ x: i, y, z: i })));
      makeLine(range.map((i) => ({ x: BOARD_SIZE - 1 - i, y, z: i })));
    });

    // Space diagonals traversing x, y, and z.
    makeLine(range.map((i) => ({ x: i, y: i, z: i })));
    makeLine(range.map((i) => ({ x: i, y: BOARD_SIZE - 1 - i, z: i })));
    makeLine(range.map((i) => ({ x: BOARD_SIZE - 1 - i, y: i, z: i })));
    makeLine(range.map((i) => ({ x: BOARD_SIZE - 1 - i, y: BOARD_SIZE - 1 - i, z: i })));

    return lines;
  }
})();
