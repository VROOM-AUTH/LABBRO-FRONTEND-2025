import React, { useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdNumbers } from "react-icons/md";
import useAxios from "../utils/useAxios";
export default function RegisterUser() {
    const api = useAxios();
    const [rfids, setRfids] = useState([]);
    useEffect(() => {
        api.get("/rfids/").then((response) => {
            if (response.status === 200) {
                setRfids(response.data);
            }
        });
    }, []);

    // Message to display after a user is created
    const [responseMessage, setResponseMessage] = useState(null);

    const registerUser = async (e) => {
        e.preventDefault();
        api.post("/register/", {
            username: e.target.username.value,
            first_name: e.target.firstName.value,
            last_name: e.target.lastName.value,
            password: e.target.password.value,
            rfid_uid: e.target.rfid.value,
            discord_id: e.target.discord.value,
            is_staff: e.target.isStaff.checked,
        })
            .then((response) => {
                if (response.status === 201) {
                    setResponseMessage("User created successfully");
                }
            })
            .catch((error) => {
                setResponseMessage("Something went wrong! Try again!");
                console.log(error);
            });
    };
    return (
        <form
            onSubmit={registerUser}
            className="form-control flex justify-center items-center flex-col w-2/12 h-3/6 bg-[#201338] rounded-xl"
        >
            <h2 className="text-xl">Create a new user</h2>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <FaUser />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <FaUser />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <FaUser />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <FaLock />
                <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <MdNumbers />
                <select id="rfidDropdown" name="rfid">
                    {rfids?.map((item) => (
                        <option key={item.rfid_uid} value={item.rfid_uid}>
                            {item.rfid_uid}
                        </option>
                    ))}
                </select>
                {/* <input type="text"  placeholder="RFID" required /> */}
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1">
                <MdNumbers />
                <input
                    type="text"
                    name="discord"
                    placeholder="Discord Id"
                    required
                />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-1 w-58">
                <MdNumbers />
                Make user Staff
                <input type="checkbox" name="isStaff" placeholder="Is Staff" />
            </label>
            <button type="submit">Create User</button>
            <h2>{responseMessage}</h2>
        </form>
    );
}
