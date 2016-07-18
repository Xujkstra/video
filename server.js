'use strict'

let http = require('http')

let fs = require('fs')

let url = require('url')

let path = require('path')

let mime = require('./type').types

let server = http.createServer((req,res) => {
	let pathname = url.parse(req.url).pathname

	let realPath = "public"+pathname

	let ext = path.extname(realPath)

	ext = ext ? ext.slice(1): 'unknown'

	let contentType = mime[ext] || 'text/plain'

	fs.exists(realPath, (exists) => {
		if(exists) {
			read(realPath,res,contentType)
		}
	})
}).listen(8000,() => {
	console.log('listening on port 8000 🌍')
})

function read(file,res,contenttype) {
	fs.readFile(file,'binary',(err,data) => {
		if(err) {

		} else {
			res.writeHeader(200, {
				'Content-Type': contenttype
			})
			res.write(data,'binary')
			res.end()
		}
	})
}