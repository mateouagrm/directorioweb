
const ButtonBack = ({onClick, label='← volver'}) => {
    return (
        <button className="bg-default1 hover:bg-default2 text-default3 py-2 px-2 rounded" onClick={()=>onClick()}>
            {label}
        </button>
    );
};

export default ButtonBack;