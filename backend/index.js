import express from 'express'
import { oneWay, twoWay } from 'ml-anova';
const app = express()
const port = 3000
import cors from 'cors';

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/one-way', (req, res) => {
  const dependentVariables = req.body.dependentVariables;
  const independentVariables = req.body.independentVariables;
  const alpha = req.body.alpha || 0.05;

  // console.log(dependentVariables, independentVariables)
  
  const result = oneWay(dependentVariables, independentVariables, {alpha: alpha})
  
  return res.send(result)
})

app.post('/two-way', (req, res) => {
  const dependentVariables = req.body.dependentVariables;
  const independentVariables1 = req.body.independentVariables1;
  const independentVariables2 = req.body.independentVariables2;
  const alpha = req.body.alpha || 0.05;
  
  const result = twoWay(dependentVariables, independentVariables1, independentVariables2, {alpha: alpha})

  return res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})