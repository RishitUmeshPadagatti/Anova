import { csvDataAtom } from "@/atoms/atoms"
import { useRecoilValue } from "recoil"

export function useValues(variable: string, integer = false) {
    const csvData = useRecoilValue(csvDataAtom)

    const index = csvData[0].findIndex((column) => column === variable);
    const result = csvData.slice(1).map((row) => {
        if (integer == true) {
            return parseInt(row[index])
        }
        else {
            return row[index]
        }
    });

    return result
}