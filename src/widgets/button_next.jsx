import {cn} from "../libs/utils";

const ButtonNext = ({type = 'button', onClick, label='Continuar →',className}) => {
    return (
        <button className={cn('bg-ecoprimary1 text-white hover:text-black hover:bg-reterseary   py-2 px-2 rounded', className)}
                type={type}
                onClick={()=>onClick()}>
            {label}
        </button>
    );
};

export default ButtonNext;