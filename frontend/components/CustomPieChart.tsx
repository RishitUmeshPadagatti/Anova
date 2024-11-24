import { generateRandomColor } from '@/utils/utils';
import React from 'react';
import { View, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

interface CustomPieChartProps {
  dependentVariableValues: number[];
  independentVariableValues: string[];
}

export default function CustomPieChart({ dependentVariableValues, independentVariableValues }: CustomPieChartProps) {
  const aggregatedData = independentVariableValues.reduce((acc, label, index) => {
    const value = dependentVariableValues[index];
    const existing = acc.find((item) => item.name === label);

    if (existing) {
      existing.population += value; // Sum the values for repeated labels
    } else {
      acc.push({ name: label, population: value }); // Add new label to the accumulator
    }

    return acc;
  }, [] as { name: string; population: number }[]);

  const data = aggregatedData.map((item) => ({
    name: item.name,
    value: item.population,
    color: generateRandomColor(),
  }));

  return (
    <View style={{maxWidth: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}  // Responsive width
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor="value"  // Specify which field contains the value
        backgroundColor="transparent"
        paddingLeft="15"
        center={[0, 0]}
        absolute
      />
    </View>
  );
}
