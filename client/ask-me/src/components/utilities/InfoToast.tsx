import { ToastType } from "../../types/types"

function InfoToast({ toastText, isToast, setIsToast, toastType }:
    {
        toastText: string,
        isToast: boolean,
        setIsToast: React.Dispatch<React.SetStateAction<boolean>>,
        toastType: ToastType

    }) {
    return (
        <div
            className={`absolute top-10 right-15 w-[20vw] h-[20vh] rounded-4xl border-3 bg-secondary
                    ${toastType === ToastType.Info && "border-background "}
                    ${toastType === ToastType.Ok && "border-success"}
                    ${toastType === ToastType.Fail && "border-fail"}       
                    ${isToast ? "opacity-100 transform translate-y-0 z-50"  : "opacity-0 transform translate-y-10 -z-40 "}
                        transition duration-500 ease-in-out`}>
            <div className='grid grid-rows-[18%_40%_18%] gap-2 h-full'>
                <div className={`flex justify-center font-bold rounded-t-4xl
                    ${toastType === ToastType.Info && "bg-background"}
                    ${toastType === ToastType.Ok && "bg-success"}
                    ${toastType === ToastType.Fail && "bg-fail"}`}>
                    {toastType === ToastType.Info &&
                        "Info"
                    }
                    {toastType === ToastType.Ok &&
                        "Success"
                    }
                    {toastType === ToastType.Fail &&
                        "Failed"
                    }
                </div>
                <p className='text-center'>
                    {toastText}
                </p>
                <div className='buttons-container justify-center flex'>
                    <button className={`border-1 rounded-3xl w-[7vw] cursor-pointer 
                    ${toastType === ToastType.Info && "hover:bg-background"}
                    ${toastType === ToastType.Ok && "hover:bg-success"}
                    ${toastType === ToastType.Fail && "hover:bg-fail"}`}
                        onClick={() => setIsToast(false)}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default InfoToast