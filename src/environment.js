const defaultEnvironment = 'dev'
const environment = {
    production: {
        url: 'https://',
    },
    dev: {
        url:'http://localhost:5000'
    }
}

export default environment[defaultEnvironment]
