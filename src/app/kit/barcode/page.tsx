"use client"
import dynamic from "next/dynamic";

const Barcode = dynamic(() => import("@/components/Kit/Barcode"), {
    ssr: false
});

const BarcodePage = () => {
    return(
        <Barcode></Barcode>
    )
}

export default BarcodePage;