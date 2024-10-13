import React, { useState } from "react";
import useAxios from "../utils/useAxios";

const ProfilePictureUpdate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState("");
    const api = useAxios();

    // Handle file change
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Set the image preview to the result
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        } else {
            setImagePreview(null); // Reset the preview if no file is selected
        }
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
            const response = await api.put(
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
        <div className="bg-[#190C34] p-2 rounded-xl w-1/3 md:mt-4 justify-center items-center flex flex-col shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] md:w-11/12">
            <h2 className="text-2xl text-center">Update Profile Picture</h2>
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center w-full flex-col "
            >
                <div className="flex w-full justify-center items-center">
                    <input
                        className="w-full"
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        name="profileImage"
                    />

                    <button type="submit">Upload</button>
                </div>
                {imagePreview && (
                    <img className="w-32 h-32" src={imagePreview}></img>
                )}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProfilePictureUpdate;
