import ScaleLoader from "react-spinners/ScaleLoader";

function Spinner({ condition }: { condition: boolean }) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <ScaleLoader
                color="black"
                loading={condition}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default Spinner;
