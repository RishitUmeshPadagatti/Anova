import { Slot } from "expo-router";

// Import your global CSS file
import "../global.css";
import { RecoilRoot } from "recoil";

export default function Root(){
    return (
        <RecoilRoot>
            <Slot />
        </RecoilRoot>
    )
};