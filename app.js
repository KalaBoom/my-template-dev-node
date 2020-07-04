const 
    http      = require('http'),
    fs        = require('fs'),
    url       = require('url')
    
const
    host      = '127.0.0.1',
    port      = process.env.PORT || 3000,
    public    = __dirname + '/public',
    mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.ico': 'image/x-icon',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2'
    }

http
    .createServer( (request, response) => {
        
        let urlParse = url.parse(request.url, true)
        let path = urlParse.pathname
        let mimeType = mimeTypes[changeContentType(path)]
        
        console.log(`Запрошенный url: ${request.url} | mime-type: ${mimeType}\n`)
    
        response.writeHead(200, {'Content-Type': mimeType})

        try {

            switch(mimeType) {
                case 'text/html':
                    let pagePath = path == '/' ? `${public}/index.html` : `${public}/pages${path}.html`
                    fs.accessSync(pagePath, (err) => {
                        if (err) {
                            throw new Error("404")
                        }
                    })
                    fs.readFile(pagePath, 'utf-8', (err, data) => {
                        if (err) console.log(err)
                        let message = 'Hello Node'
                        let title = 'Page'
                        data = data.replace('{title}', title).replace('{message}',message)
                        response.end(data)
                    })
                    return
                    
                case 'text/javascript' || 'text/css':
                    let file = public + path
                    let fileStream = fs.createReadStream(file)
                    fileStream.pipe(response)
                    return

                default:
                    fs.readFile(`${public}/${path}`, (err, file) => {
                        if (err) console.error(err)
                        response.end(file)
                    }) 
            }

        } catch(e) {
            console.error(`Error: ${e}\n`)
            response.statusCode = 404
            let error = fs.createReadStream(`${public}/pages/404.html`)
            error.pipe(response)
            return
        }
        
    })
    .listen( port, host,  () => {
        console.log(`Server start on http://${host}:${port}`)
    })

function changeContentType(path) {
    if (/\./.test(path)) {
        if(/\.css$/gi.test(path)) return '.css'
        if(/\.js$/gi.test(path)) return '.js'
        if(/\.ico$/gi.test(path)) return '.ico'
        if(/\.png$/gi.test(path)) return '.png'
        if(/\.jpg$/gi.test(path) || /\.jpeg$/gi.test(path)) return '.jpg'
        if(/\.gif$/gi.test(path)) return '.gif'
        if(/\.svg$/gi.test(path)) return '.svg'
        if(/\.json$/gi.test(path)) return '.json'
        if(/\.woff$/gi.test(path)) return '.woff'
        if(/\.woff2$/gi.test(path)) return '.woff2'
    } else {
        return '.html'
    }
}