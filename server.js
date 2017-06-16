'use strict';
const config = require('./config');
// create an API server
const Restify = require('restify');
const server = Restify.createServer({
	name: 'Bot'
});
const PORT = process.env.PORT || 3000;

// FBeamer
const FBeamer = require('./fbeamer');
const f = new FBeamer(config.FB);

server.use(Restify.jsonp());
server.use(Restify.bodyParser());
server.use((req, res, next) => f.verifySignature(req, res, next));

// WIT.AI
const Wit = require('node-wit').Wit;
const wit = new Wit({
	accessToken: config.WIT_ACCESS_TOKEN
});
/////////////
//OMDB
const omdb = require('./omdb');

// Register the webhooks
server.get('/', (req, res, next) => {
	f.registerHook(req, res);
	return next();
});

// Handle incoming
server.post('/', (req, res, next) => {
	f.incoming(req, res, msg => {
		const {
			sender,
			postback,
			message
		} = msg;

		if(message.text) {
			// Process the message here
			//f.txt(sender, `You said: ${message.text}`);

			//WIT Message API
			wit.message(message.text, {})
				.then(omdb)
				.then(response => {
					f.txt(sender, response.text);
					if(response.image){
						f.img(sender, response.image);
					}
				})
				.catch(error => console.log(error));
		}

	});

	return next();
});

// Subscribe
f.subscribe();

server.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
