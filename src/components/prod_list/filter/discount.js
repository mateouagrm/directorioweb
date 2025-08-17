import { useEffect, useState, useRef } from "react";

const DescuentoFiltro = ({ sendData, reset }) => {
    const [descuento, setDescuento] = useState("todo");
    const isFirstRender = useRef(true); // 👈

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // evita ejecutar en primer montaje
        }

        if (descuento) {
            let data = {
                descuento: Number(descuento === "todo" ? 0 : descuento),
            };
            sendData(data);
        }
    }, [descuento]);

    useEffect(() => {
        if (reset) {
            setDescuento("todo");
        }
    }, [reset]);

    return (
        <div className="rounded-lg">
            <h5 className="font-semibold mb-2 text-base md:text-lg">Descuento</h5>

            {["todo", "10", "25", "50"].map((valor) => (
                <label
                    key={valor}
                    className="flex items-center gap-2 cursor-pointer text-sm mb-2"
                >
                    <input
                        type="radio"
                        name="descuento"
                        value={valor}
                        checked={descuento === valor}
                        onChange={() => setDescuento(valor)}
                        className="w-4 h-4"
                    />
                    {valor === "todo"
                        ? "Todo"
                        : `${valor}% de descuento o más`}
                </label>
            ))}
        </div>
    );
};

export default DescuentoFiltro;
