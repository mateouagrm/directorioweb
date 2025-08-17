import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {get_payment_methods} from "../../redux/actions/payment";
import classNames from "classnames";


function PaymentMethod({get_payment_methods, payment_methods, update, data_payment}) {
    const [array_payment_methods, setArrayPaymentMethods] = useState([]);
    const [selected, setSelect] = useState('');

    useEffect(() => {
        if (payment_methods.length === 0) {
            get_payment_methods();
        } else {
            setSelect(data_payment.payment_method_id ? data_payment.payment_method_id : payment_methods[0].id );
            setArrayPaymentMethods(payment_methods);
        }
    }, [payment_methods]);

    
    useEffect(() => {
        if (selected) {
            update({'payment_method_id' : selected})
        }
    }, [selected]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Seleccionar el método de pago</h2>
            <div className="grid grid-cols-2 gap-2">
                {
                    array_payment_methods.map((item, index) => (
                        <div className={classNames("border", "p-3", "rounded-md", "flex", "flex-col", "items-center",
                            {
                                "bg-ecoprimary1": item.id === selected,
                            }
                        )}
                             key={index}
                             onClick={() => setSelect(item.id)}>
                            <span className="text-orange-500 text-xl">💲</span>
                            <span className="text-sm">{item.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    payment_methods: state.Payment.payment_methods,
    data_payment: state.Payment.data_payment,
})

export default connect(mapStateToProps, {
    get_payment_methods
})(PaymentMethod)