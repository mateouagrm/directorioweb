import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {get_user_invoices} from "../../redux/actions/payment";
import SelectInvoice from "./selectInvoice";

function Invoice({get_user_invoices, user, invoices, invoice, update}) {
    const [razon, setRazon] = useState('');
    const [nit, setNit] = useState('');

    useEffect(() => {
        if (invoices.length === 0) {
            let data = {
                'user_id': user.id
            }
            get_user_invoices(data);
        } else {
        }
    }, [invoices]);

    useEffect(() => {
        if (invoice) {
            setRazon(invoice.name);
            setNit(invoice.nit);
        }
    }, [invoice]);

    useEffect(() => {
        if (razon && nit) {
            let data = {
                'razon': razon,
                'nit': nit
            }
            update(data)
        }
    }, [razon,nit]);



    return (
        <>
            <div className="mt-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold mb-2">Datos de la factura</h3>
                    <SelectInvoice/>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Nit/Ci :</label>
                        <input type="text" className="form-control w-full" value={nit}
                               onChange={(e) => setNit(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="block text-sm font-medium">Razón social :</label>
                        <input type="text" className="form-control w-full" value={razon}
                               onChange={(e) => setRazon(e.target.value)}/>
                    </div>
                </form>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    user: state.Auth.user,
    invoices: state.Payment.invoices,
    invoice: state.Payment.invoice,
})

export default connect(mapStateToProps, {
    get_user_invoices
})(Invoice)