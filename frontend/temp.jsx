const temp = {
  classA: {
    freedom: [2, 6],
    pValue: 0.0470335479553328,
    rejected: true,
    testValue: 5.310975609756097,
  },
  classB: {
    freedom: [1, 6],
    pValue: 0.0008913263937980902,
    rejected: true,
    testValue: 37.09756097560976,
  },
  interaction: {
    freedom: [2, 6],
    pValue: 0.35784553645913075,
    rejected: false,
    testValue: 1.225609756097561,
  },
};


<><View style={{ marginTop: 20, padding: 10, borderRadius: 8 }}>
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
</View><View style={{ marginTop: 20, padding: 10, borderRadius: 8 }}>
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
    </View></>