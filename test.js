        // Data injected from Code.gs
        const GAS_ROLE = "<?= role ?>"; 
        const GAS_ROOM = "<?= room ?>";

        const API_BASE = 'https://api.restful-api.dev/objects';
        const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
        
        let game = new Chess();
        let board = null;
        let roomId = GAS_ROOM;
        let playerColor = GAS_ROLE === 'black' ? 'b' : 'w';
        let isOnline = true;
        let isSyncing = false;

        // Startup Logic
        const overlay = document.getElementById('setup-overlay');
        const startBtn = document.getElementById('start-game-btn');
        const onlineOpt = document.getElementById('mode-online');
        const offlineOpt = document.getElementById('mode-offline');
        const onlineConfig = document.getElementById('online-config');
        const setupRoomId = document.getElementById('setup-room-id');

        onlineOpt.onclick = () => {
            onlineOpt.classList.add('active');
            offlineOpt.classList.remove('active');
            onlineConfig.style.display = 'block';
            isOnline = true;
        };

        offlineOpt.onclick = () => {
            offlineOpt.classList.add('active');
            onlineOpt.classList.remove('active');
            onlineConfig.style.display = 'none';
            isOnline = false;
        };

        startBtn.onclick = () => {
            roomId = setupRoomId.value;
            overlay.style.display = 'none';
            document.getElementById('game-area').style.visibility = 'visible';
            initGame();
        };

        function initGame() {
            document.getElementById('my-status').textContent = `Role: ${GAS_ROLE.charAt(0).toUpperCase() + GAS_ROLE.slice(1)}`;
            document.getElementById('room-display').textContent = isOnline ? `ID: ${roomId}` : 'Local Mode';
            document.getElementById('game-mode-label').textContent = isOnline ? 'Online Match' : 'Offline Match';
            if (!isOnline) document.getElementById('copy-link-btn').style.display = 'none';

            const savedFen = localStorage.getItem(`chess_local_fen_${roomId}`) || STARTING_FEN;
            game.load(savedFen);

            board = Chessboard('board', {
                draggable: true,
                position: game.fen(),
                orientation: playerColor === 'b' ? 'black' : 'white',
                onDragStart: (source, piece) => {
                    if (game.game_over()) return false;
                    if (isOnline && piece.search(new RegExp(`^${playerColor}`)) === -1) return false;
                    if (isOnline && game.turn() !== playerColor) return false;
                },
                onDrop: (source, target) => {
                    const move = game.move({ from: source, to: target, promotion: 'q' });
                    if (move === null) return 'snapback';
                    updateUI();
                    saveState();
                },
                onSnapEnd: () => board.position(game.fen()),
                pieceTheme: (piece) => PIECES_BASE64[piece]
            });

            updateUI();
            if (isOnline) setInterval(pollCloud, 1500);
        }

        function updateUI() {
            const statusText = document.getElementById('game-status-text');
            if (game.in_checkmate()) statusText.textContent = 'CHECKMATE!';
            else if (game.in_draw()) statusText.textContent = 'DRAW';
            else statusText.textContent = game.turn() === 'w' ? "White's turn" : "Black's turn";

            const history = game.history();
            const moveHistoryEl = document.getElementById('move-history');
            moveHistoryEl.innerHTML = '';
            for (let i = 0; i < history.length; i += 2) {
                const num = Math.floor(i / 2) + 1;
                moveHistoryEl.innerHTML += `
                    <div class="move-num">${num}.</div>
                    <div class="move-val ${i === history.length-1 ? 'move-active' : ''}">${history[i]}</div>
                    <div class="move-val ${i+1 === history.length-1 ? 'move-active' : ''}">${history[i+1] || ''}</div>
                `;
            }
            moveHistoryEl.scrollTop = moveHistoryEl.scrollHeight;
        }

        async function saveState() {
            const fen = game.fen();
            localStorage.setItem(`chess_local_fen_${roomId}`, fen);
            if (!isOnline || !navigator.onLine) return;
            try {
                isSyncing = true;
                await fetch(`${API_BASE}/${roomId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: `Chess Room ${roomId}`, data: { fen: fen } })
                });
            } catch (e) {} finally { isSyncing = false; }
        }

        async function pollCloud() {
            if (!isOnline || !navigator.onLine || isSyncing) return;
            try {
                const response = await fetch(`${API_BASE}/${roomId}`);
                if (response.status === 404) return;
                const data = await response.json();
                const targetData = Array.isArray(data) ? data[0] : data;
                if (targetData?.data?.fen && targetData.data.fen !== game.fen()) {
                    game.load(targetData.data.fen);
                    board.position(game.fen());
                    updateUI();
                    localStorage.setItem(`chess_local_fen_${roomId}`, targetData.data.fen);
                }
            } catch (e) {}
        }

        document.getElementById('copy-link-btn').onclick = () => {
            // In GAS, we use URL parameters instead of hashes
            const baseUrl = window.location.href.split('?')[0];
            const opponentRole = GAS_ROLE === 'black' ? 'white' : 'black';
            const inviteUrl = `${baseUrl}?role=${opponentRole}&room=${roomId}`;
            
            navigator.clipboard.writeText(inviteUrl).then(() => {
                alert('Invite URL for ' + opponentRole.toUpperCase() + ' copied to clipboard!');
            });
        };
