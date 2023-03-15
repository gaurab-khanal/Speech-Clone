import * as dotenv from 'dotenv';
dotenv.config();

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/dream', async (req,res)=>{

    const prompt = req.body.prompt;

    // const aiResponse = await openai.createImage({
    //     prompt,
    //     n:1,
    //     size: '1024x1024',
    // });

    const aiResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
    });

    // const image = aiResponse.data.data[0].url;
    const completeText = aiResponse.data.choices[0].text;
    res.send({completeText});

});

app.listen(8080, console.log('make art on http://localhost:8080/dream'));