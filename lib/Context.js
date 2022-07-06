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
        return this.client;
    }

    get db () {
        if (!this.haveDb) {
            throw new Error("db not in context")
        }
        return this.db;
    }

    get config () {
        if (!this.haveConfig) {
            throw new Error("config not in context")
        }
        return this.config;
    }

    get interaction () {
        if (!this.haveInteraction) {
            throw new Error("interaction not in context")
        }
        return this.interaction;
    }

    get message () {
        if (!this.haveMessage) {
            throw new Error("message not in context")
        }
        return this.message;
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

}