module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: '<YOUR_DATABASE_USERNAME>',
            password: '<YOUR_DATABASE_PASSWORD>',
            database: 'boilerplate-sample-database'
        },
        searchPath: ['knex', 'public']
    },
    production: {
        client: 'pg',
        debug: true,
        connection: process.env.DATABASE_URL,
        migrations: {
            tableName: 'migrations'
        },
        ssl: true
    }
}