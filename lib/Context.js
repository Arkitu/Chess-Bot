export class Context {
    constructor ({ client, db, config, interaction, message }) {
        this.setClient(client)
            .setDb(db)
            .setConfig(config)
            .setInteraction(interaction)
            .setMessage(message);
    }

    get client () {
        if (!this.haveClient) {
            throw new Error("client not in context")
        }
        return this.Iclient;
    }

    get db () {
        if (!this.haveDb) {
            throw new Error("db not in context")
        }
        return this.Idb;
    }

    get config () {
        if (!this.haveConfig) {
            throw new Error("config not in context")
        }
        return this.Iconfig;
    }

    get interaction () {
        if (!this.haveInteraction) {
            throw new Error("interaction not in context")
        }
        return this.Iinteraction;
    }

    get message () {
        if (!this.haveMessage) {
            throw new Error("message not in context")
        }
        return this.Imessage;
    }

    set client (c) {
        this.Iclient = c;
    }

    set db (d) {
        this.Idb = d;
    }

    set config (c) {
        this.Iconfig = c;
    }

    set interaction (i) {
        this.Iinteraction = i;
    }

    set message (m) {
        this.Imessage = m;
    }

    setClient (client) {
        this.client = client;
        this.haveClient = !!client;
        return this;
    }

    setDb (db) {
        this.db = db;
        this.haveDb = !!db;
        return this;
    }

    setConfig (config) {
        this.config = config;
        this.haveConfig = !!config;
        return this;
    }

    setInteraction (interaction) {
        this.interaction = interaction;
        this.haveInteraction = !!interaction;
        return this;
    }

    setMessage (message) {
        this.message = message;
        this.haveMessage = !!message;
        return this;
    }

    clone () {
        let opts = {};
        if (this.haveClient) opts.client = this.client;
        if (this.haveDb) opts.db = this.db;
        if (this.haveConfig) opts.config = this.config;
        if (this.haveInteraction) opts.interaction = this.interaction;
        if (this.haveMessage) opts.message = this.message;
        return new Context(opts);
    }
}