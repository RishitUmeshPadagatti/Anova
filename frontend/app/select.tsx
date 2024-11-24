import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';
import { useRecoilState, useRecoilValue } from "recoil";
import { anovaTypeAtom, csvDataAtom, dvAtom, iv1Atom, iv2Atom, significanceAtom } from "@/atoms/atoms";
import { router } from "expo-router";

export default function SelectOptions() {
    const csvData = useRecoilValue(csvDataAtom)
    const [anovaType, setAnovaType] = useRecoilState(anovaTypeAtom)

    const [dv, setDv] = useRecoilState(dvAtom)
    const [iv1, setIv1] = useRecoilState(iv1Atom)
    const [iv2, setIv2] = useRecoilState(iv2Atom)
    const [significance, setSignificance] = useRecoilState(significanceAtom)
    
    const dependentVariableOptions = csvData[0]
    const independentVariableOptions = csvData[0]

    const isSubmitDisabled = dv === iv1 || (anovaType === "two-way" && (iv1 === iv2 || iv2 === dv));

    const handleSubmit = () => {
        router.push('/finalResult')
    };
    return (
        <SafeAreaView className="flex-1" edges={['top']}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                contentContainerClassName="flex justify-center items-center px-6 py-3">
                <View className="w-full p-2 flex gap-10">
                    <View>
                        <Text className="text-2xl font-bold text-center text-gray-800">
                            ANOVA Selection
                        </Text>
                    </View>

                    {/* Option 1: One-Way or Two-Way ANOVA */}
                    <View>
                        <Text className="text-lg font-medium text-gray-700 mb-2">Select ANOVA Type</Text>
                        <View className="flex flex-row justify-between items-center">
                            <TouchableOpacity
                                onPress={() => setAnovaType("one-way")}
                                className={`flex-1 py-2 mr-2 rounded-lg border ${anovaType === "one-way" ? "bg-black" : "border-gray-300"
                                    }`}>
                                <Text
                                    className={`text-center ${anovaType === "one-way" ? "text-white" : "text-gray-700"
                                        }`}>
                                    One-Way
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setAnovaType("two-way")}
                                className={`flex-1 py-2 rounded-lg border ${anovaType === "two-way" ? "bg-black" : "border-gray-300"}`}>
                                <Text
                                    className={`text-center ${anovaType === "two-way" ? "text-white" : "text-gray-700"}`}>
                                    Two-Way
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Dependent Variable */}
                    <View className="flex gap-2.5">
                        <Text className="text-lg font-medium text-gray-700">Select Dependent Variable</Text>
                        <Picker
                            selectedValue={dv}
                            onValueChange={(itemValue, itemIndex) =>
                                setDv(itemValue)
                            }>
                            {dependentVariableOptions.map((element, index) => (
                                <Picker.Item key={index} label={element} value={element} />
                            ))}
                        </Picker>
                    </View>

                    {/* Independent Variable 1 */}
                    <View className="flex gap-2.5">
                        <Text className="text-lg font-medium text-gray-700">Select Independent Variable {anovaType === "one-way" ? "" : "1"}</Text>
                        <Picker
                            selectedValue={iv1}
                            onValueChange={(itemValue, itemIndex) =>
                                setIv1(itemValue)
                            }>
                            {independentVariableOptions.map((element, index) => (
                                <Picker.Item key={index} label={element} value={element} />
                            ))}
                        </Picker>
                    </View>

                    {/* Independent Variable 2 */}
                    <View>
                        {anovaType === "two-way" && (
                            <View className="flex gap-2.5">
                                <Text className="text-lg font-medium text-gray-700">Select Independent Variable 2</Text>
                                <Picker
                                    selectedValue={iv2}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setIv2(itemValue)
                                    }>
                                    {independentVariableOptions.map((element, index) => (
                                        <Picker.Item key={index} label={element} value={element} />
                                    ))}
                                </Picker>
                            </View>
                        )}
                    </View>
                    {/* Significance Level Selection */}
                    <View className="flex gap-4">
                        <Text className="text-lg font-medium text-gray-700">Select Significance Level</Text>
                        <View className="flex flex-row items-center gap-2">
                            <TouchableOpacity
                                onPress={() => setSignificance(0.03)}
                                className={`flex-1 py-2 rounded-lg border ${significance === 0.03 ? "bg-black" : "border-gray-300"
                                    }`}>
                                <Text
                                    className={`text-center ${significance === 0.03 ? "text-white" : "text-gray-700"
                                        }`}>
                                    0.03
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => setSignificance(0.05)}
                                className={`flex-1 py-2 mr-2 rounded-lg border ${significance === 0.05 ? "bg-black" : "border-gray-300"
                                    }`}>
                                <Text
                                    className={`text-center ${significance === 0.05 ? "text-white" : "text-gray-700"
                                        }`}>
                                    0.05
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <View>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={isSubmitDisabled}
                            className={`w-full py-3 rounded-lg ${isSubmitDisabled ? "bg-gray-400" : "bg-black"}`}>
                            <Text className="text-center text-white font-medium text-lg ">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}