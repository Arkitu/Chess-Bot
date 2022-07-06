import { Context } from "./Context.js";

export class Player {
    constructor({ ctx=new Context(), isUser=true, data }) {
        this.ctx = ctx;
        this.isUser = isUser;
        this.isNet = !isUser;
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

export class Morpion {
    constructor({ ctx=new Context(), playerA, playerB}) {
        this.ctx = ctx;
        this.playerA = new Player(playerA);
        this.playerB = new Player(playerB);
        this.board = [];
        /*
            1  2  3
            4  5  6
            7  8  9
        */
    }

    async init() {
        await this.playerA.init();
        await this.playerB.init();
    }

    async
}