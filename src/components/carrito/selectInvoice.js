import React, {useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {connect} from "react-redux";
import {check_user_invoice} from "../../redux/actions/payment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";

function SelectInvoice({check_user_invoice, invoices, invoice, user}) {
    const [open, setOpen] = useState(false);
    const [seleccionado, setSeleccionado] = useState(null);

    useEffect(() => {
        if (invoice) {
            setSeleccionado(invoice.id);
        }
    }, [invoice]);

    useEffect(() => {
        if (seleccionado) {
            localStorage.setItem("invoice_id", seleccionado);
        }
    }, [seleccionado]);

    const updateInvoice = (item) => {
        let data = {
            user_id: user.id,
            invoice_id: item.id
        }
        check_user_invoice(data);
        setSeleccionado(item.id)
        // setOpen(false);
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="px-1 text-sm cursor-pointer hover:text-white hover:bg-ecoprimary1 text-yellow-500 font-semibold"
            >
                Seleccionar otro
            </button>
            <Transition show={open} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <div className="fixed inset-0 bg-bgblack bg-opacity-30"/>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel
                            className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                            <div
                                className="bg-gradient-to-r from-orange-500 to-orange-700 text-white py-3 text-center font-semibold text-lg rounded-t-xl">
                                Seleccionar razón social y NIT
                            </div>
                            <div className="mt-4 px-4 pb-4">
                                <ul className="flex flex-col gap-2">
                                    {invoices.map((item) => (
                                        <li
                                            key={item.id}
                                            onClick={() => updateInvoice(item)}
                                            className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer border transition-all ${
                                                seleccionado === item.id
                                                    ? "bg-orange-100 border-orange-400 text-orange-800"
                                                    : "hover:bg-gray-100 border-gray-300"
                                            }`}
                                        >
                                            <span className="font-medium">{item.name} - {item.nit}</span>
                                            <FontAwesomeIcon
                                                icon={faTrashCan}
                                                className="text-red-500 hover:text-red-700 transition text-lg"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

const mapStateToProps = state => ({
    invoices: state.Payment.invoices,
    invoice: state.Payment.invoice,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    check_user_invoice
})(SelectInvoice)
