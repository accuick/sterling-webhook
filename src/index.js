
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { Request } from 'express'

const app = express();
import cors from 'cors';


app.use(cors({
    exposedHeaders: ['authToken']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/indeed', indeedRoute)

app.all("/", (request, response) => {
    // console.log(request);
    if (request.method === "GET") {
        console.log(`Received challenge code! - ${JSON.stringify(request)}`);
    }

    if (request.method === "POST") {
        console.log('==========BODY DELTAS START==========');
        console.log(JSON.stringify(request.body));
        if (request.body.deltas[0].metadata) {
            for (const key in request.body.deltas[0].metadata) {
                console.log(key + ": " + request.body.deltas[0].metadata[key])
            }
        }
        console.log('==========BODY DELTAS END==========\n');
    }

    response.status(200).json({
        success: true
    }).end() // Responding is important
})

app.listen(3000);