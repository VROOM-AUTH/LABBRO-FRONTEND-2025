import React, { useState } from "react";
import useAxios from "../utils/useAxios";

const ProfilePictureUpdate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("");
    const api = useAxios();

    // Handle file change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setMessage("Please select a file to upload.");
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const token = localStorage.getItem("token"); // Assuming you have the JWT token stored in localStorage
            const response = await api.post(
                "/update-profile-picture/", // Use your actual endpoint
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                setMessage("Profile picture updated successfully!");
            }
        } catch (error) {
            setMessage("Error updating profile picture. Please try again.");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Update Profile Picture</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProfilePictureUpdate;
