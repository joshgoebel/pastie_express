const migrations = {
    directory: "./db/migrations",
    tableName: "migrations"
}

const config = {
    production: {
        client: 'pg',
        connection: process.env["DATABASE_URL"],
        migrations
    },
    development: {
        client: 'pg',
        connection: {
            host: "localhost",
            user: "pastie",
            password: "localdev",
            database: "pastie"
        },
        migrations
    },
    development_sqlite: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
          filename: "./db/development.sqlite"
        },
        migrations
    }
}

module.exports=config;