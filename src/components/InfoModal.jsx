import React from "react";

export default function InfoModal({ id, title, content }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-2xl">{title}</h3>
                <p className="py-4">{content}</p>
                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Ok</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
}
