"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv")); // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
const express_1 = __importStar(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)({
    exposedHeaders: ['authToken']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use('/indeed', indeedRoute)
app.all("/", (request, response) => {
    // console.log(request);
    if (request.method === "GET" && request.query.challenge) {
        console.log(`Received challenge code! - ${request.query}`);
        response.send(request.query.challenge);
        console.log(`Sending challenge code! - ${request.query.challenge}`);
    }
    if (request.method === "POST") {
        console.log('==========BODY DELTAS START==========');
        console.log(JSON.stringify(request.body));
        // console.log("parsed data");
        // console.log(JSON.parse(request.body));
        if (request.body.deltas[0].metadata) {
            for (const key in request.body.deltas[0].metadata) {
                console.log(key + ": " + request.body.deltas[0].metadata[key]);
            }
        }
        console.log('==========BODY DELTAS END==========\n');
    }
    response.status(200).end(); // Responding is important
});
// https://api.render.com/deploy/srv-cfusp3ta499aogr9h8tg?key=02TFc8rz4vI
// https://search.accuick.com/Twilio/webhook_nylas.jsp
app.listen(3000);
