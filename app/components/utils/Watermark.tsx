import React from "react";
import Url from "./Url";

export default function Watermark() {
    return <div 
        className="fixed bottom-2 right-2 text-white text-xs flex flex-col items-center transition duration-300 opacity-50 hover:opacity-100">
        Made with 🐈 by <Url url="https://github.com/IMXNOOBX">@imxnoobx</Url>
    </div>
};