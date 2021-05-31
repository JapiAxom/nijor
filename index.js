const path = require('path');
module.exports = {
    'nijor':path.join(__dirname,'src/nijor.js'),
    'nijor/electron':path.join(__dirname,'src/nijor-electron.js'),
    'nijor/components':path.join(__dirname,'src/components.js'),
    'nijor/router':path.join(__dirname,'src/router.js'),
    'nijor/#router':path.join(__dirname,'src/hashrouter.js'),
    'nijor/requests':path.join(__dirname,'src/requests.js'),
    'nijor/views':path.join(__dirname,'src/views.js')
};