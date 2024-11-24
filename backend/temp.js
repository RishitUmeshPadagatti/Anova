import { oneWay } from 'ml-anova';
 
const data = [65, 70, 78, 85, 72, 75, 88, 92, 68, 72, 75, 82];
const classes = ["A", "A", "A", "A", "B", "B", "B", "B", "C", "C", "C", "C"];
 
const result = oneWay(data, classes, { alpha: 0.03 });
console.log(result)