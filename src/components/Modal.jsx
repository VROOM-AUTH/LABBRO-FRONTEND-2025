import React from "react";

export default function Modal({ id, title, content, clickFunction }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-2xl">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                    <button
                        className="btn bg-red-500 hover:bg-red-400 text-white"
                        onClick={clickFunction}
                    >
                        Yes
                    </button>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
