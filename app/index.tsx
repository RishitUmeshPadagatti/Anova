import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import Papa from 'papaparse';

export default function HomeScreen() {
    const [csvData, setCsvData] = useState<any[]>([]);

    const handleFileUpload = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'text/csv'
            })

            if (!result.canceled) {
                const fileUri = result.assets[0].uri

                const response = await fetch(fileUri);
                const text = await response.text();

                // Parse the CSV text using PapaParse
                Papa.parse(text, {
                    complete: (parsedResult) => {
                        console.log('Parsed CSV data:', parsedResult.data);
                        setCsvData(parsedResult.data); // Store the parsed data
                    },
                    // header: true, // If the CSV has headers
                });
            }

        } catch (error) {
            console.log("Error picking or parsing the data")
        }


        // router.push("/select")
    }
    return <SafeAreaView className="flex-1 justify-center items-center">
        <TouchableOpacity
            onPress={handleFileUpload}
            className="px-6 py-3 bg-blue-500 shadow-md active:bg-blue-600"
        >
            <Text className="text-white font-semibold">Upload CSV</Text>
        </TouchableOpacity>
    </SafeAreaView>
}