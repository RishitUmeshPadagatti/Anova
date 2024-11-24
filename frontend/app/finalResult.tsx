import { anovaTypeAtom, csvDataAtom, dvAtom, iv1Atom, iv2Atom, significanceAtom } from "@/atoms/atoms";
import { useValues } from "@/hooks/useValues";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import CustomPieChart from "@/components/CustomPieChart";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from 'axios'
import { serverLocation } from "@/utils/utils";
import { router } from "expo-router";

export default function FinalResult() {
    // const csvData = useRecoilValue(csvDataAtom)
    const anovaType = useRecoilValue(anovaTypeAtom)
    const significance = useRecoilValue(significanceAtom)

    const dv = useRecoilValue(dvAtom)
    const iv1 = useRecoilValue(iv1Atom)
    const iv2 = useRecoilValue(iv2Atom)

    const dvValues = useValues(dv, true) as number[]
    const iv1Values = useValues(iv1) as string[]
    const iv2Values = useValues(iv2 as string) as string[]

    let nullHypothesis1Statement = `There is no significant difference between ${iv1} and ${dv}`
    let nullHypothesis2Statement;
    let nullHypothesisInteractionStatement;

    const [nullHypothesis1AcceptedOrRejected, setNullHypothesis1AcceptedOrRejected] = useState<boolean>(false);
    const [nullHypothesis2AcceptedOrRejected, setNullHypothesis2AcceptedOrRejected] = useState<boolean>(false);
    const [nullHypothesisInteractionAcceptedOrRejected, setNullHypothesisInteractionAcceptedOrRejected] = useState<boolean>(false);

    if (anovaType === "two-way") {
        nullHypothesis2Statement = `There is no significant difference between ${iv2} and ${dv}`
        nullHypothesisInteractionStatement = `There is no significant difference between ${iv1} and ${iv2} on ${dv}`
    }

    useEffect(() => {
        const fetchOneWay = async () => {
            const result = await axios.post(`${serverLocation}/one-way`, {
                dependentVariables: dvValues,
                independentVariables: iv1Values,
                alpha: significance
            });
            setNullHypothesis1AcceptedOrRejected(result.data.rejected)
        }

        const fetchTwoWay = async () => {
            const result = await axios.post(`${serverLocation}/two-way`, {
                dependentVariables: dvValues,
                independentVariables1: iv1Values,
                independentVariables2: iv2Values,
                alpha: significance
            });
            setNullHypothesis1AcceptedOrRejected(result.data.classA.rejected)
            setNullHypothesis2AcceptedOrRejected(result.data.classB.rejected)
            setNullHypothesisInteractionAcceptedOrRejected(result.data.interaction.rejected)
        }

        if (anovaType === "one-way") {
            fetchOneWay()
        } else {
            fetchTwoWay()
        }
    }, [])

    // console.log(nullHypothesis1AcceptedOrRejected, nullHypothesis2AcceptedOrRejected, nullHypothesisInteractionAcceptedOrRejected)

    return <SafeAreaView edges={['top']}  >
        <ScrollView className="">
            <View className={`gap-y-8`}>
                <Text className="text-3xl text-center font-bold text-size mt-5">Anova Analysis</Text>
                {(Platform.OS === "ios" || Platform.OS === "android") && (
                    <>
                        <CustomPieChart dependentVariableValues={dvValues} independentVariableValues={iv1Values} />
                        {anovaType === "two-way" && <CustomPieChart dependentVariableValues={dvValues} independentVariableValues={iv2Values} />}
                    </>
                )}

                <View className=" gap-5 p-4 mb-10">
                    <View style={{ marginTop: 20, padding: 10, borderRadius: 8 }}>
                        <Text className="text-lg font-semibold">Null Hypotheses:</Text>

                        <Text className="text-base mt-4">
                            <Text className="font-semibold">H₀ (1):</Text> {nullHypothesis1Statement}
                        </Text>
                        {anovaType === "two-way" && (
                            <>
                                <Text className="text-base mt-2">
                                    <Text className="font-semibold">H₀ (2):</Text> {nullHypothesis2Statement}
                                </Text>
                                <Text className="text-base mt-2">
                                    <Text className="font-semibold">H₀ (Interaction):</Text> {nullHypothesisInteractionStatement}
                                </Text>
                            </>
                        )}
                    </View>

                    <View style={{ marginTop: 20, padding: 10, borderRadius: 8 }}>
                        <Text className="text-lg font-semibold">Results:</Text>

                        <Text className="text-base mt-4">
                            <Text className="font-semibold">H₀ (1):</Text>{" "}
                            {nullHypothesis1AcceptedOrRejected
                                ? "Rejected (Significant difference)"
                                : "Accepted (No significant difference)"}
                        </Text>

                        {anovaType === "two-way" && (
                            <>
                                <Text className="text-base mt-2">
                                    <Text className="font-semibold">H₀ (2):</Text>{" "}
                                    {nullHypothesis2AcceptedOrRejected
                                        ? "Rejected (Significant difference)"
                                        : "Accepted (No significant difference)"}
                                </Text>
                                <Text className="text-base mt-2">
                                    <Text className="font-semibold">H₀ (Interaction):</Text>{" "}
                                    {nullHypothesisInteractionAcceptedOrRejected
                                        ? "Rejected (Significant interaction effect)"
                                        : "Accepted (No significant interaction effect)"}
                                </Text>
                            </>
                        )}
                    </View>

                    <View className="flex-row gap-4 mt-6">
                            {/* Go Back Button */}
                            <TouchableOpacity
                                onPress={() => {
                                    router.replace('/select')
                                }}
                                className="bg-black py-3 px-6 rounded-lg flex-1 justify-center items-center"
                            >
                                <Text className="text-white text-lg">Go Back</Text>
                            </TouchableOpacity>

                            {/* Go Home Button */}
                            <TouchableOpacity
                                onPress={() => {
                                    router.replace('/')
                                }}
                                className="bg-white py-3 px-6 rounded-lg flex-1 justify-center items-center border border-black"
                            >
                                <Text className="text-black text-lg">Go Home</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
}