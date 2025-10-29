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

  const CELL_SPACING = 1.35;
  const FLOOR_VERTICAL_SPACING = 1.6;
  const PLATE_THICKNESS = 0.08;
  const BLOCK_HEIGHT = 0.9;
  const HOVER_ELEVATION = 0.02;
  const WIN_PULSE_DURATION = 1.2;

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

  // ADDED: Three.js scene state cache
  const threeState = {
    scene: null,
    renderer: null,
    camera: null,
    controls: null,
    raycaster: null,
    pointer: null,
    floorAnchors: [],
    cellAnchors: new Map(),
    cellMeshes: new Map(),
    hitMeshes: [],
    hoverOutline: null,
    hoveredCellKey: null,
    animations: [],
    pendingFloorAnimation: null,
    winningPulse: null,
    winningKey: null,
    cameraReset: null,
    defaultCamera: {
      position: null,
      target: null
    },
    defaultCameraOffset: null,
    pointerDown: null
  };

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
    // ADDED: canvas + reset camera control
    selectors.canvas = document.getElementById('game-canvas');
    selectors.resetCamera = document.getElementById('reset-camera');
  }

  function attachEventListeners() {
    selectors.newMatch.addEventListener('click', () => startNewMatch());
    selectors.resetScores.addEventListener('click', handleResetScores);
    selectors.undoMove.addEventListener('click', undoLastMove);
    selectors.openSettings.addEventListener('click', openModal);
    selectors.saveSettings.addEventListener('click', saveSettings);
    if (selectors.resetCamera) {
      selectors.resetCamera.addEventListener('click', () => resetCamera(true));
    }
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
    setupThreeScene();
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
    syncThreeScene();
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
    queueFloorSpawnAnimation(state.recentlyAddedFloorIndex);
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

  // ADDED: convert linear index back to grid coordinates
  function coordsFromIndex(index) {
    const x = index % BOARD_SIZE;
    const y = Math.floor(index / BOARD_SIZE);
    return { x, y };
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

  // ADDED: 3D scene bootstrap & helpers
  function setupThreeScene() {
    if (!window.THREE || !selectors.canvas) {
      console.warn('Three.js unavailable; skipping 3D scene.');
      return;
    }
    if (threeState.renderer) {
      return;
    }
    if (typeof THREE.OrbitControls !== 'function') {
      console.warn('OrbitControls unavailable; skipping 3D scene.');
      return;
    }

    const canvas = selectors.canvas;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    if (renderer.outputColorSpace) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    }
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    threeState.renderer = renderer;

    const scene = new THREE.Scene();
    scene.background = null;
    threeState.scene = scene;

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(6.5, 7.6, 8.4);
    threeState.camera = camera;

    const controls = new THREE.OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = true;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.minPolarAngle = 0.3;
    controls.maxPolarAngle = Math.PI * 0.9;
    controls.target.set(0, 1.2, 0);
    threeState.controls = controls;

    threeState.defaultCamera.position = camera.position.clone();
    threeState.defaultCamera.target = controls.target.clone();
    threeState.defaultCameraOffset = camera.position.clone().sub(controls.target);

    const ambient = new THREE.AmbientLight(0xffffff, 0.62);
    scene.add(ambient);
    const dir = new THREE.DirectionalLight(0xffffff, 0.95);
    dir.position.set(6, 12, 6);
    scene.add(dir);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x040404, 0.4);
    scene.add(hemi);

    threeState.geometries = {
      block: new THREE.BoxGeometry(0.9, BLOCK_HEIGHT, 0.9),
      plate: new THREE.BoxGeometry(BOARD_SIZE * CELL_SPACING + 0.4, PLATE_THICKNESS, BOARD_SIZE * CELL_SPACING + 0.4),
      hit: new THREE.BoxGeometry(0.98, BLOCK_HEIGHT + 0.2, 0.98)
    };

    threeState.materials = {
      blockX: new THREE.MeshPhysicalMaterial({
        color: 0xd6dae1,
        metalness: 0.55,
        roughness: 0.2,
        clearcoat: 0.7,
        clearcoatRoughness: 0.22
      }),
      blockO: new THREE.MeshPhysicalMaterial({
        color: 0x2c2c2e,
        metalness: 0.6,
        roughness: 0.32,
        clearcoat: 0.65,
        clearcoatRoughness: 0.28
      }),
      plateActive: new THREE.MeshPhysicalMaterial({
        color: 0xb8b8b8,
        transparent: true,
        opacity: 0.42,
        transmission: 0.88,
        roughness: 0.16,
        thickness: 0.68,
        metalness: 0.08,
        clearcoat: 0.4
      }),
      plateLocked: new THREE.MeshPhysicalMaterial({
        color: 0x3a3a3a,
        transparent: true,
        opacity: 0.28,
        transmission: 0.48,
        roughness: 0.38,
        thickness: 0.45,
        metalness: 0.06,
        clearcoat: 0.25
      }),
      gridLine: new THREE.LineBasicMaterial({
        color: 0xbebebe,
        transparent: true,
        opacity: 0.6
      }),
      gridEdge: new THREE.LineBasicMaterial({
        color: 0xe4e4e4,
        transparent: true,
        opacity: 0.85
      }),
      hit: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.03,
        depthWrite: false
      })
    };

    threeState.pointer = new THREE.Vector2();
    threeState.raycaster = new THREE.Raycaster();

    const hoverEdges = new THREE.EdgesGeometry(threeState.geometries.block);
    const hoverMat = new THREE.LineBasicMaterial({ color: 0xcacaca });
    const hoverOutline = new THREE.LineSegments(hoverEdges, hoverMat);
    hoverOutline.visible = false;
    hoverOutline.position.y = BLOCK_HEIGHT / 2 + HOVER_ELEVATION;
    hoverOutline.scale.setScalar(1.04);
    threeState.hoverOutline = hoverOutline;
    scene.add(hoverOutline);

    handleResize();
    window.addEventListener('resize', handleResize);

    canvas.addEventListener('pointermove', handleCanvasPointerMove);
    canvas.addEventListener('pointerleave', () => setHoverCell(null));
    canvas.addEventListener('pointerdown', handleCanvasPointerDown);
    canvas.addEventListener('pointerup', handleCanvasPointerUp);
    canvas.addEventListener('pointercancel', () => {
      threeState.pointerDown = null;
      setHoverCell(null);
    });

    resetCamera(false);
    updateControlsTarget();

    renderer.setAnimationLoop(renderThreeFrame);
  }

  function handleResize() {
    if (!threeState.renderer || !threeState.camera || !selectors.canvas) {
      return;
    }
    const parent = selectors.canvas.parentElement;
    if (!parent) {
      return;
    }
    const width = Math.max(1, parent.clientWidth);
    const height = Math.max(1, parent.clientHeight);
    threeState.renderer.setSize(width, height, false);
    threeState.camera.aspect = width / height;
    threeState.camera.updateProjectionMatrix();
  }

  function queueFloorSpawnAnimation(index) {
    if (index === null || index === undefined || index < 0) {
      return;
    }
    threeState.pendingFloorAnimation = index;
  }

  function syncThreeScene() {
    if (!threeState.scene || !threeState.renderer || !threeState.materials) {
      return;
    }

    ensureFloorsRendered(state.floors.length);

    const seenKeys = new Set();
    state.floors.forEach((floor, z) => {
      setFloorLocked(z, floor.locked);
      floor.cells.forEach((value, index) => {
        if (!value) {
          return;
        }
        const { x, y } = coordsFromIndex(index);
        const key = keyForCoord(x, y, z);
        seenKeys.add(key);
        if (!threeState.cellMeshes.has(key)) {
          spawnMark({ x, y, z }, value);
        }
      });
    });

    for (const key of Array.from(threeState.cellMeshes.keys())) {
      if (!seenKeys.has(key)) {
        removeMarkByKey(key);
      }
    }

    if (state.gameOver) {
      setHoverCell(null);
    }

    updateWinningHighlight();
    updateControlsTarget();
  }

  function ensureFloorsRendered(count) {
    if (!threeState.scene || !threeState.geometries) {
      return;
    }
    while (threeState.floorAnchors.length < count) {
      const z = threeState.floorAnchors.length;
      const anchor = buildFloorAnchor(z);
      threeState.floorAnchors.push(anchor);
      threeState.scene.add(anchor);
      if (threeState.pendingFloorAnimation === z) {
        anchor.scale.set(1, 0.05, 1);
        queueScaleAnimation(anchor, { x: 1, y: 0.05, z: 1 }, { x: 1, y: 1, z: 1 }, 0.45, easeOutCubic);
      }
    }
    while (threeState.floorAnchors.length > count) {
      const removedIndex = threeState.floorAnchors.length - 1;
      const anchor = threeState.floorAnchors.pop();
      removeFloorIndexData(removedIndex, anchor);
    }
    rebuildHitMeshes();
    threeState.pendingFloorAnimation = null;
  }

  function createGridGeometry() {
    const offset = ((BOARD_SIZE - 1) * CELL_SPACING) / 2;
    const y = PLATE_THICKNESS / 2 + 0.001;
    const positions = [];
    for (let i = 0; i < BOARD_SIZE; i += 1) {
      const p = i * CELL_SPACING - offset;
      positions.push(-offset, y, p, offset, y, p);
      positions.push(p, y, -offset, p, y, offset);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }

  function buildFloorAnchor(z) {
    const anchor = new THREE.Group();
    anchor.position.y = z * FLOOR_VERTICAL_SPACING;
    const activeMaterial = threeState.materials.plateActive.clone();
    const lockedMaterial = threeState.materials.plateLocked.clone();
    const plate = new THREE.Mesh(threeState.geometries.plate, activeMaterial);
    plate.receiveShadow = false;
    plate.castShadow = false;
    anchor.add(plate);
    anchor.userData.plate = plate;
    anchor.userData.materialActive = activeMaterial;
    anchor.userData.materialLocked = lockedMaterial;

    const gridGeometry = createGridGeometry();
    const gridMaterial = threeState.materials.gridLine.clone();
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    anchor.add(gridLines);

    const edgeGeometry = new THREE.EdgesGeometry(threeState.geometries.plate);
    const edgeMaterial = threeState.materials.gridEdge.clone();
    const edgeLines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    anchor.add(edgeLines);

    anchor.userData.gridLines = gridLines;
    anchor.userData.gridGeometry = gridGeometry;
    anchor.userData.gridMaterial = gridMaterial;
    anchor.userData.edgeLines = edgeLines;
    anchor.userData.edgeGeometry = edgeGeometry;
    anchor.userData.edgeMaterial = edgeMaterial;

    const offset = ((BOARD_SIZE - 1) * CELL_SPACING) / 2;
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const cellGroup = new THREE.Group();
        cellGroup.position.set(x * CELL_SPACING - offset, PLATE_THICKNESS / 2, y * CELL_SPACING - offset);
        const hitMesh = new THREE.Mesh(threeState.geometries.hit, threeState.materials.hit);
        hitMesh.visible = false;
        hitMesh.position.y = BLOCK_HEIGHT / 2;
        hitMesh.userData = { x, y, z };
        cellGroup.add(hitMesh);
        anchor.add(cellGroup);
        const key = keyForCoord(x, y, z);
        threeState.cellAnchors.set(key, { group: cellGroup, hitMesh, floorIndex: z });
      }
    }

    return anchor;
  }

  function removeFloorIndexData(z, anchor) {
    if (!anchor) {
      return;
    }
    for (const key of Array.from(threeState.cellAnchors.keys())) {
      const data = threeState.cellAnchors.get(key);
      if (data && data.floorIndex === z) {
        removeMarkByKey(key);
        threeState.cellAnchors.delete(key);
      }
    }
    if (threeState.hoveredCellKey) {
      const hoverData = threeState.cellAnchors.get(threeState.hoveredCellKey);
      if (!hoverData) {
        setHoverCell(null);
      }
    }
    if (anchor.userData.gridLines) {
      if (anchor.userData.gridLines.parent) {
        anchor.userData.gridLines.parent.remove(anchor.userData.gridLines);
      }
      if (anchor.userData.gridMaterial) {
        anchor.userData.gridMaterial.dispose();
      }
      if (anchor.userData.gridGeometry) {
        anchor.userData.gridGeometry.dispose();
      }
    }
    if (anchor.userData.edgeLines) {
      if (anchor.userData.edgeLines.parent) {
        anchor.userData.edgeLines.parent.remove(anchor.userData.edgeLines);
      }
      if (anchor.userData.edgeMaterial) {
        anchor.userData.edgeMaterial.dispose();
      }
      if (anchor.userData.edgeGeometry) {
        anchor.userData.edgeGeometry.dispose();
      }
    }
    threeState.scene.remove(anchor);
    anchor.traverse((child) => {
      if (child === threeState.hoverOutline) {
        threeState.hoverOutline.visible = false;
        threeState.scene.add(threeState.hoverOutline);
      }
      if (child.isMesh && child.material && child.material !== threeState.materials.hit) {
        child.material.dispose();
      }
    });
  }

  function rebuildHitMeshes() {
    threeState.hitMeshes = Array.from(threeState.cellAnchors.values(), (value) => value.hitMesh);
  }

  function spawnMark(coord, symbol) {
    const key = keyForCoord(coord);
    if (threeState.cellMeshes.has(key)) {
      return;
    }
    const anchor = threeState.cellAnchors.get(key);
    if (!anchor) {
      return;
    }
    const baseMaterial = symbol === 'X' ? threeState.materials.blockX : threeState.materials.blockO;
    const material = baseMaterial.clone();
    material.emissive = new THREE.Color(0x000000);
    material.emissiveIntensity = 0;
    const mesh = new THREE.Mesh(threeState.geometries.block, material);
    mesh.position.y = BLOCK_HEIGHT / 2;
    mesh.scale.setScalar(0.2);
    mesh.userData.symbol = symbol;
    anchor.group.add(mesh);
    threeState.cellMeshes.set(key, mesh);
    queueScaleAnimation(mesh, { x: 0.2, y: 0.2, z: 0.2 }, { x: 1, y: 1, z: 1 }, 0.42, easeOutBack);
    if (threeState.hoveredCellKey === key) {
      setHoverCell(null);
    }
  }

  function removeMarkByKey(key) {
    const mesh = threeState.cellMeshes.get(key);
    if (!mesh) {
      return;
    }
    if (threeState.winningPulse) {
      threeState.winningPulse.meshes = threeState.winningPulse.meshes.filter((target) => target !== mesh);
      if (!threeState.winningPulse.meshes.length) {
        threeState.winningPulse = null;
        threeState.winningKey = null;
      }
    }
    if (mesh.parent) {
      mesh.parent.remove(mesh);
    }
    if (mesh.material) {
      mesh.material.dispose();
    }
    threeState.cellMeshes.delete(key);
  }

  function setFloorLocked(z, locked) {
    const anchor = threeState.floorAnchors[z];
    if (!anchor || !anchor.userData) {
      return;
    }
    const plate = anchor.userData.plate;
    const targetMaterial = locked ? anchor.userData.materialLocked : anchor.userData.materialActive;
    if (plate && plate.material !== targetMaterial) {
      plate.material = targetMaterial;
    }
    if (anchor.userData.gridMaterial) {
      anchor.userData.gridMaterial.opacity = locked ? 0.35 : 0.6;
      anchor.userData.gridMaterial.needsUpdate = true;
    }
    if (anchor.userData.edgeMaterial) {
      anchor.userData.edgeMaterial.opacity = locked ? 0.5 : 0.85;
      anchor.userData.edgeMaterial.needsUpdate = true;
    }
    anchor.userData.isLocked = locked;
  }

  function updateWinningHighlight() {
    if (state.winningLine && state.winningLine.length) {
      highlightWinningLine(state.winningLine);
    } else if (threeState.winningKey) {
      clearWinningHighlight();
    }
  }

  function highlightWinningLine(coords) {
    const key = coords.map((coord) => keyForCoord(coord)).join('|');
    if (threeState.winningKey === key) {
      return;
    }
    clearWinningHighlight();
    const meshes = coords.map((coord) => threeState.cellMeshes.get(keyForCoord(coord))).filter(Boolean);
    if (!meshes.length) {
      return;
    }
    meshes.forEach((mesh) => {
      if (mesh.material) {
        mesh.material.emissive = new THREE.Color(0x2fb24c);
        mesh.material.emissiveIntensity = 0;
      }
    });
    threeState.winningPulse = {
      meshes,
      start: performance.now() / 1000
    };
    threeState.winningKey = key;
  }

  function clearWinningHighlight() {
    if (threeState.winningPulse && threeState.winningPulse.meshes) {
      threeState.winningPulse.meshes.forEach((mesh) => {
        if (mesh && mesh.material) {
          mesh.material.emissiveIntensity = 0;
          mesh.material.emissive.set(0x000000);
        }
      });
    }
    threeState.winningPulse = null;
    threeState.winningKey = null;
  }

  function updateWinningPulse(now) {
    if (!threeState.winningPulse) {
      return;
    }
    const elapsed = now - threeState.winningPulse.start;
    const normalized = Math.min(1, elapsed / WIN_PULSE_DURATION);
    const intensity = Math.sin(normalized * Math.PI);
    threeState.winningPulse.meshes.forEach((mesh) => {
      if (mesh.material) {
        mesh.material.emissiveIntensity = 0.9 * intensity;
      }
    });
    if (elapsed >= WIN_PULSE_DURATION) {
      clearWinningHighlight();
    }
  }

  function setHoverCell(key) {
    if (!threeState.hoverOutline) {
      return;
    }
    if (threeState.hoveredCellKey === key) {
      return;
    }
    if (threeState.hoverOutline.parent) {
      threeState.hoverOutline.parent.remove(threeState.hoverOutline);
    }
    threeState.hoveredCellKey = key || null;
    if (!key) {
      threeState.hoverOutline.visible = false;
      threeState.scene.add(threeState.hoverOutline);
      return;
    }
    const anchor = threeState.cellAnchors.get(key);
    if (!anchor) {
      threeState.hoverOutline.visible = false;
      threeState.scene.add(threeState.hoverOutline);
      threeState.hoveredCellKey = null;
      return;
    }
    anchor.group.add(threeState.hoverOutline);
    threeState.hoverOutline.visible = true;
  }

  function handleCanvasPointerMove(event) {
    if (!threeState.pointer) {
      return;
    }
    updatePointerFromEvent(event);
    updateHoverFromRaycast();
  }

  function handleCanvasPointerDown(event) {
    if (typeof event.button === 'number' && event.button !== 0) {
      return;
    }
    threeState.pointerDown = { x: event.clientX, y: event.clientY };
  }

  function handleCanvasPointerUp(event) {
    if (!threeState.pointer) {
      return;
    }
    if (!threeState.pointerDown) {
      return;
    }
    if (typeof event.button === 'number' && event.button !== 0) {
      threeState.pointerDown = null;
      return;
    }
    const start = threeState.pointerDown;
    threeState.pointerDown = null;
    updatePointerFromEvent(event);
    const movement = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (movement > 6) {
      return;
    }
    const hit = pickCell();
    if (hit) {
      attemptMove(hit.x, hit.y, hit.z);
    }
  }

  function updatePointerFromEvent(event) {
    const canvas = selectors.canvas;
    if (!canvas) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    threeState.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    threeState.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function updateHoverFromRaycast() {
    const hit = performRaycast();
    if (!hit || !isCellAvailable(hit.x, hit.y, hit.z)) {
      setHoverCell(null);
      return;
    }
    setHoverCell(keyForCoord(hit));
  }

  function performRaycast() {
    if (!threeState.raycaster || !threeState.camera) {
      return null;
    }
    threeState.raycaster.setFromCamera(threeState.pointer, threeState.camera);
    const intersections = threeState.raycaster.intersectObjects(threeState.hitMeshes, false);
    for (const hit of intersections) {
      if (hit.object && hit.object.userData) {
        return hit.object.userData;
      }
    }
    return null;
  }

  function pickCell() {
    const hit = performRaycast();
    if (!hit) {
      return null;
    }
    if (!isCellAvailable(hit.x, hit.y, hit.z)) {
      return null;
    }
    return hit;
  }

  function isCellAvailable(x, y, z) {
    if (state.gameOver) {
      return false;
    }
    const floor = state.floors[z];
    if (!floor || floor.locked) {
      return false;
    }
    const index = indexFrom(x, y);
    return !floor.cells[index];
  }

  function keyForCoord(arg1, arg2, arg3) {
    if (typeof arg1 === 'object') {
      return `${arg1.x}-${arg1.y}-${arg1.z}`;
    }
    return `${arg1}-${arg2}-${arg3}`;
  }

  function resetCamera(smooth = false) {
    if (!threeState.camera || !threeState.controls || !threeState.defaultCamera.position) {
      return;
    }
    const centerY = ((state.floors.length - 1) * FLOOR_VERTICAL_SPACING) / 2 + PLATE_THICKNESS;
    const target = threeState.defaultCamera.target.clone();
    target.y = Math.max(0, centerY);
    const offset = threeState.defaultCameraOffset ? threeState.defaultCameraOffset.clone() : new THREE.Vector3(6.5, 6.4, 6.4);
    const position = target.clone().add(offset);
    if (!smooth) {
      threeState.camera.position.copy(position);
      threeState.controls.target.copy(target);
      threeState.controls.update();
      threeState.cameraReset = null;
      return;
    }
    threeState.cameraReset = {
      start: performance.now() / 1000,
      duration: 0.6,
      from: {
        position: threeState.camera.position.clone(),
        target: threeState.controls.target.clone()
      },
      to: {
        position,
        target
      }
    };
  }

  function updateCameraReset(now) {
    if (!threeState.cameraReset) {
      return;
    }
    const data = threeState.cameraReset;
    const elapsed = now - data.start;
    const t = Math.min(1, elapsed / data.duration);
    const eased = easeOutCubic(t);
    threeState.camera.position.lerpVectors(data.from.position, data.to.position, eased);
    threeState.controls.target.lerpVectors(data.from.target, data.to.target, eased);
    if (t >= 1) {
      threeState.cameraReset = null;
    }
  }

  function queueScaleAnimation(object, fromVec, toVec, duration, easing) {
    if (!object || !object.scale) {
      return;
    }
    object.scale.set(fromVec.x, fromVec.y, fromVec.z);
    threeState.animations.push({
      object,
      from: { ...fromVec },
      to: { ...toVec },
      start: performance.now() / 1000,
      duration,
      easing
    });
  }

  function updateAnimations(now) {
    threeState.animations = threeState.animations.filter((animation) => {
      const elapsed = now - animation.start;
      const t = animation.duration === 0 ? 1 : Math.min(1, elapsed / animation.duration);
      const eased = animation.easing ? animation.easing(t) : t;
      const x = animation.from.x + (animation.to.x - animation.from.x) * eased;
      const y = animation.from.y + (animation.to.y - animation.from.y) * eased;
      const z = animation.from.z + (animation.to.z - animation.from.z) * eased;
      if (animation.object && animation.object.scale) {
        animation.object.scale.set(x, y, z);
      }
      return t < 1;
    });
  }

  function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    const p = t - 1;
    return 1 + c3 * p * p * p + c1 * p * p;
  }

  function easeOutCubic(t) {
    return 1 - (1 - t) ** 3;
  }

  function renderThreeFrame(time) {
    if (!threeState.renderer || !threeState.scene || !threeState.camera) {
      return;
    }
    const now = time / 1000;
    updateAnimations(now);
    updateCameraReset(now);
    updateWinningPulse(now);
    if (threeState.controls) {
      threeState.controls.update();
    }
    threeState.renderer.render(threeState.scene, threeState.camera);
  }

  function updateControlsTarget() {
    if (!threeState.controls) {
      return;
    }
    const desiredY = Math.max(0, ((state.floors.length - 1) * FLOOR_VERTICAL_SPACING) / 2 + PLATE_THICKNESS);
    threeState.controls.target.y = desiredY;
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
