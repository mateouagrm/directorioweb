import { useState, useEffect, useRef } from "react";

const PrecioRango = ({ sendData, reset }) => {
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const isFirstRender = useRef(true); // 👈

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // evita ejecutar en primer montaje
        }

        const minValue = Number(min || 0);
        const maxValue = Number(max || 10000);

        if (maxValue >= minValue) {
            let data = {
                min: minValue,
                max: maxValue,
            };
            sendData(data);
        }
    }, [min, max]);

    useEffect(() => {
        if (reset) {
            setMin("");
            setMax("");
        }
    }, [reset]);

    return (
        <div className="w-full max-w-xs md:max-w-sm">
            <h5 className="font-semibold mb-2 text-base md:text-lg">Rango de precio</h5>
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="number"
                    placeholder="Min"
                    value={min}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) >= 0) {
                            setMin(value);
                        }
                    }}
                    className="border rounded p-2 w-full text-sm"
                    min="0"
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={max}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || Number(value) >= 0) {
                            setMax(value);
                        }
                    }}
                    className="border rounded p-2 w-full text-sm"
                    min="0"
                />
            </div>
        </div>
    );
};

export default PrecioRango;
