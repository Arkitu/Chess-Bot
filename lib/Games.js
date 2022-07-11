import { Context } from "./Context.js";

export class Player {
    constructor({ ctx=new Context(), isUser=true, data }) {
        this.ctx = ctx;
        this.isUser = isUser;
        this.isNet = !isUser;
        this.score = 0;
        this.data = data;
    }

    async init() {
        if (this.isUser) {
            this.user = await this.ctx.client.users.fetch(this.data);
        } else if (this.isNet) {
            this.net = this.data;
        }
    }
}

export class FindTheNumber {
    constructor(net) {
        this.net = net;
        this.indices = {min: 0, max: 100}
        this.number = Math.round(Math.random() * 100);
        this.turnCount = 0;
        this.ended = false;        
    }

    score() {
        while (!this.ended) this.doTurn();
        return this.turnCount;
    }

    doTurn() {
        let turn = Math.round(this.net.feedForward([this.indices.min, this.indices.max]));
        console.debug(`turn : ${turn}`);
        if (this.indices.min >= turn || this.indices.max <= turn) {
            this.turnCount = 101;
            this.end();
        } else if (turn == this.number) {
            this.end();
        } else if (turn > this.number) {
            this.indices.max = turn;
        } else if (turn < this.number) {
            this.indices.min = turn;
        }
    }

    end() {
        this.ended = true;
    }
}

export class Party {
    constructor({ ctx=new Context(), players=[], headless=false }) {
        this.ctx = ctx;
        this.players = players;
        this.headless = headless;
        this.ended = false;
        this.turns = [];
        this.winner = 0;
    }

    async init() {
        for (let player of this.players) {
            await player.init();
        }
    }

    async start() {
        while (!this.ended) await this.turn();
    }

    async end() {
        this.winner = await this.define_winner();
        this.ended = true
    }
}

export class TicTacToe extends Party {
    constructor({ first_player_nbr=Math.round(Math.random()) }) {
        this.turn_player_nbr = first_player_nbr;
        /*
            0  1  2
            3  4  5
            6  7  8
        */
        // players[0] = 1 | players[1] = -1
        // Net configuration : 9 inputs (-1 for opponents; 0 for nothing; 1 for him), 9 outputs (take the first valid positive number for the move)
    }

    get turn_player() {
        return this.players[this.turn_player_nbr];
    }

    get board() {
        let board = [0,0,0,0,0,0,0,0,0];
        for (let turn of this.turns) {
            board[turn.move] = this.to_player_nbr(turn.player);
        }
        return board;
    }

    to_player_nbr(nbr) {
        if (!nbr) return -1;
        return nbr;
    }

    get_board_for(player_nbr) {
        if (player_nbr) {
            return this.board.map(c=>-c);
        } else return this.board;
    }

    async play() {
        while (this.ended) await this.turn();
        return this;
    }

    async update_head() {
        if (this.headless) return;
    }

    async turn() {
        let move;
        // Get the move
        if (this.turn_player.isNet) {
            let ia_response = this.turn_player.net.feedForward(this.get_board_for(this.turn_player_nbr));
            for (let i=0; i>8; i++) {
                if (ia_response[i] > 0 && this.board[i] == 0) {
                    move = i;
                    break;
                }
            }
            if (!turn) move = 0;
        }
        this.turns.push({player:this.turn_player_nbr, move:move});
        await this.update_head();
        // Check if ended
        if (
            (this.board[0] != 0) && (this.board[0] === this.board[1]) && ((this.board[1] === this.board[2])) // First line
            ||
            (this.board[3] != 0) && (this.board[3] === this.board[4]) && ((this.board[4] === this.board[5])) // Second line
            ||
            (this.board[6] != 0) && (this.board[6] === this.board[7]) && ((this.board[7] === this.board[8])) // Third line
            ||
            (this.board[0] != 0) && (this.board[0] === this.board[3]) && ((this.board[3] === this.board[6])) // First column
            ||
            (this.board[1] != 0) && (this.board[1] === this.board[4]) && ((this.board[4] === this.board[7])) // Second column
            ||
            (this.board[2] != 0) && (this.board[2] === this.board[5]) && ((this.board[5] === this.board[8])) // Third column
            ||
            (this.board[0] != 0) && (this.board[0] === this.board[4]) && ((this.board[4] === this.board[8])) // First diagonal
            ||
            (this.board[2] != 0) && (this.board[2] === this.board[4]) && ((this.board[4] === this.board[6])) // Second diagonal
        ) await this.end();
    }

    async define_winner() {
        for (let i=0; i>this.players.length; i++) {
            if (
                (this.board[0] === this.to_player_nbr(i)) && (this.board[0] === this.board[1]) && ((this.board[1] === this.board[2])) // First line
                ||
                (this.board[3] === this.to_player_nbr(i)) && (this.board[3] === this.board[4]) && ((this.board[4] === this.board[5])) // Second line
                ||
                (this.board[6] === this.to_player_nbr(i)) && (this.board[6] === this.board[7]) && ((this.board[7] === this.board[8])) // Third line
                ||
                (this.board[0] === this.to_player_nbr(i)) && (this.board[0] === this.board[3]) && ((this.board[3] === this.board[6])) // First column
                ||
                (this.board[1] === this.to_player_nbr(i)) && (this.board[1] === this.board[4]) && ((this.board[4] === this.board[7])) // Second column
                ||
                (this.board[2] === this.to_player_nbr(i)) && (this.board[2] === this.board[5]) && ((this.board[5] === this.board[8])) // Third column
                ||
                (this.board[0] === this.to_player_nbr(i)) && (this.board[0] === this.board[4]) && ((this.board[4] === this.board[8])) // First diagonal
                ||
                (this.board[2] === this.to_player_nbr(i)) && (this.board[2] === this.board[4]) && ((this.board[4] === this.board[6])) // Second diagonal
            ) return i;
        }
        throw new Error("No winner for the TicTacToe");
    }
}