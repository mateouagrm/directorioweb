import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {get_delivery_methods} from "../../redux/actions/payment";
import classNames from "classnames";


function Delivery({get_delivery_methods, delivery_methods, update, data_payment}) {
    const [array_delivery_methods, setArrayDeliveryMethods] = useState([]);
    const [selected, setSelect] = useState('');

    useEffect(() => {
        if (delivery_methods.length === 0) {
            get_delivery_methods();
        } else {
            setSelect(data_payment.delivery_method_id ? data_payment.delivery_method_id : delivery_methods[0].id);
            setArrayDeliveryMethods(delivery_methods);
        }
    }, [delivery_methods]);

    useEffect(() => {
        if (selected) {
            update({'delivery_method_id': selected})

        }
    }, [selected]);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Seleccionar el método de entrega</h2>
            <div className="grid grid-cols-2 gap-2">
                {
                    array_delivery_methods.map((item, index) => (
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
    delivery_methods: state.Payment.delivery_methods,
    data_payment: state.Payment.data_payment,
})

export default connect(mapStateToProps, {
    get_delivery_methods
})(Delivery)