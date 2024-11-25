import express from 'express'
import { oneWay, twoWay } from 'ml-anova';
import cors from 'cors';
import 'dotenv/config'
import OpenAI from "openai"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
	return res.send('Hello World!')
})

app.post('/', (req, res) => {
	return res.send('Hello World!')
})

app.post('/one-way', (req, res) => {
	const dependentVariables = req.body.dependentVariables;
	const independentVariables = req.body.independentVariables;
	const alpha = req.body.alpha;

	const result = oneWay(dependentVariables, independentVariables, { alpha: alpha })

	return res.send(result)
})

app.post('/two-way', (req, res) => {
	const dependentVariables = req.body.dependentVariables;
	const independentVariables1 = req.body.independentVariables1;
	const independentVariables2 = req.body.independentVariables2;
	const alpha = req.body.alpha;

	const result = twoWay(dependentVariables, independentVariables1, independentVariables2, { alpha: alpha })

	return res.send(result)
})

app.post('/chatgpt', async (req, res) => {
	const openai = new OpenAI({apiKey: process.env.API_KEY});
	const prompt = req.body.prompt

	const completion = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{ role: "system", content: "You are an helpful assistant used in my math project on real life use of ANOVA to help students' marks" },
			{ role: "system", content: "I will give you Null Hypothesis of some variable, you should give me Inference of that. What more could we improve on to improve the marks." },
			{ role: "system", content: "If the null hypothesis is accepted, just tell that there's no significant difference. Dont still offer suggestions" },
			{ role: "system", content: "Give only recommendations to Improve. Dont use ** for bolder texts. Keep it short and simple" },
			{
				role: "user",
				content: prompt,
			},
		],
	});

	return res.send(completion.choices[0].message.content)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})