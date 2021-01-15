module.exports = {
    apps: [
        {
            name: 'railab.tech/api',
            exec_mode: 'cluster',
            instances: 'max',
            script: './index.js',
            env_production: {
                "NODE_ENV": "production",
                "PORT": 3010
            }
        }
    ]
}