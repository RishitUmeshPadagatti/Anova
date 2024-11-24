import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import Papa from 'papaparse';
import { router } from "expo-router";
import { useSetRecoilState } from "recoil";
import { csvDataAtom } from "@/atoms/atoms";
import { receivedDataFormat } from "@/utils/utils";

export default function HomeScreen() {
    const setCsvData = useSetRecoilState(csvDataAtom)

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/csv'
            })

            if (!result.canceled) {
                const fileUri = result.assets[0].uri

                const response = await fetch(fileUri);
                const text = await response.text();

                Papa.parse(text, {
                    complete: (parsedResult) => {
                        const receivedData = parsedResult.data as receivedDataFormat;
                        setCsvData(receivedData);
                    },
                    // header: true, // If the CSV has headers
                });

                router.push("/select")
            }

        } catch (error) {
            console.log("Error picking or parsing the data")
        }
        // router.push('/select')
        // router.push('/finalResult')
    }
    return <SafeAreaView className="flex-1 justify-center items-center">
        <TouchableOpacity
            onPress={handleFileUpload}
            // className="px-6 py-3 bg-blue-500 shadow-md active:bg-blue-600"
            className="px-6 py-3 bg-black text-white shadow-md rounded-md"
        >
            <Text className="text-white font-semibold">Upload CSV</Text>
        </TouchableOpacity>
    </SafeAreaView>
}