import { anovaType, receivedDataFormat } from "@/utils/utils";
import { atom, selector } from "recoil";

export const csvDataAtom = atom<receivedDataFormat>({
    key: "csvDataAtomKey",
    default: [['']]
    // default: [["Student", "Teaching_Method", "Study_Hours", "Class_Type", "Exam_Score_1", "Exam_Score_2"],
    //   ["1", "A", "1-2 hours", "Online", "65", "68"],
    //   ["2", "A", "1-2 hours", "Online", "70", "72"],
    //   ["3", "A", "3-4 hours", "Online", "78", "80"],
    //   ["4", "A", "3-4 hours", "In-person", "85", "87"],
    //   ["5", "B", "1-2 hours", "Online", "72", "74"],
    //   ["6", "B", "1-2 hours", "Online", "75", "77"],
    //   ["7", "B", "3-4 hours", "In-person", "88", "90"],
    //   ["8", "B", "3-4 hours", "In-person", "92", "94"],
    //   ["9", "C", "1-2 hours", "Online", "68", "70"],
    //   ["10", "C", "1-2 hours", "Online", "72", "74"],
    //   ["11", "C", "3-4 hours", "In-person", "75", "78"],
    //   ["12", "C", "3-4 hours", "In-person", "82", "85"]]
})

export const anovaTypeAtom = atom<anovaType>({
    key: "anovaTypeAtomKey",
    default: 'one-way'
    // default: 'two-way'
})

export const dvAtom = atom({
    key: "dvAtomKey",
    default: selector({
        key: 'dvAtomSelectorKey',
        get: ({get}) => {
            const data = get(csvDataAtom)
            return data[0][0]
        }
    })
    // default: 'Exam_Score_1'
})

export const iv1Atom = atom({
    key: "iv1AtomKey",
    default: selector({
        key: 'iv1AtomSelectorKey',
        get: ({get}) => {
            const data = get(csvDataAtom)
            return data[0][1]
        }
    })
    // default: 'Teaching_Method'
})

export const iv2Atom = atom({
    key: "iv2AtomKey",
    default: selector({
        key: 'iv2AtomSelectorKey',
        get: ({get}) => {
            const data = get(csvDataAtom)
            const type = get(anovaTypeAtom)
            if (type === "two-way") return data[0][2]
            else return null
        }
    })
    // default: 'Study_Hours'
})

export const significanceAtom = atom<number>({
    key: "significanceAtomKey",
    default: 0.05
})