import {Circles} from "react-loader-spinner";

const LoaderSpinner = ({bool}) => {
    return (
            <div className="flex justify-center w-100"
                 style={{visibility: bool === true ? 'visible' : 'hidden'}}>
                <Circles
                    color="#32338E"
                    width={50}
                    height={50}
                    ariaLabel="circles-loading"
                    visible={true}
                />
            </div>
    );
};

export default LoaderSpinner