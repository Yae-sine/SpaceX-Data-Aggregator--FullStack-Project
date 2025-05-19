import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const API_URL = "http://localhost:8000/api/accounts/profile/"; 

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef();

  // Replace with your auth token logic
  const token = localStorage.getItem("token");
  console.log(token); 
  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
        setForm({
          first_name: ""|| res.data.first_name,
          last_name: "" || res.data.last_name,
          bio: "" || res.data.bio,
        });
        setProfilePicPreview(res.data.profile_picture);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Profile fetch error:', error, error.response);
        setMessage("Failed to load profile. " + (error.response ? error.response.status + ': ' + (error.response.data?.detail || JSON.stringify(error.response.data)) : error.message));
        setLoading(false);
      });
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profile_picture: file });
    if (file) {
      setProfilePicPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      bio: profile.bio || "",
    });
    setProfilePicPreview(profile.profile_picture);
    setMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("bio", form.bio);
    if (form.profile_picture) {
      formData.append("profile_picture", form.profile_picture);
    }
    try {
      const res = await axios.put(API_URL, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile(res.data);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800 dark:text-white">My Profile</h1>
        
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
          </div>
        )}

        {!loading && !profile && (
          <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-lg text-center max-w-lg mx-auto shadow-sm dark:bg-red-900/30 dark:border-red-500 dark:text-red-200">
            <div className="flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-red-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-lg font-semibold">{message || "Failed to load profile"}</p>
            <p className="mt-2 text-sm text-red-500 dark:text-red-300">Please try again later or contact support.</p>
          </div>
        )}

        {!loading && profile && (
          <div className="max-w-4xl mx-auto">
            {message && (
              <div className={`mb-6 text-center p-4 rounded-lg shadow-sm ${message.includes('successfully') ? 'bg-green-50 border-2 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-200' : 'bg-red-50 border-2 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200'}`}>
                {message}
              </div>
            )}

            <div className="bg-white shadow-xl dark:bg-gray-800/60 backdrop-blur-sm border border-indigo-100 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="relative h-36 bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-900 dark:to-purple-900">
                {/* User could have a banner image here in a future feature */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={
                        profilePicPreview ||
                        (profile && (profile.first_name || profile.username)
                          ? "https://ui-avatars.com/api/?name=" + (profile.first_name || profile.username) + "&background=6366f1&color=fff&size=128"
                          : "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128")
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 shadow-md"
                    />
                    {editMode && (
                      <>
                        <label
                          htmlFor="profile-pic"
                          className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <span className="text-white text-sm font-medium">Change</span>
                        </label>
                        <input
                          id="profile-pic"
                          type="file"
                          accept="image/*"
                          name="profile_picture"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-20 px-8 pb-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 dark:text-white">
                    {profile.first_name && profile.last_name 
                      ? `${profile.first_name} ${profile.last_name}` 
                      : profile.username}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-300">@{profile.username}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-2">Username</label>
                      <input
                        type="text"
                        value={profile.username || ''}
                        disabled
                        className="w-full bg-gray-50 dark:bg-gray-900/60 border border-indigo-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email || ''}
                        disabled
                        className="w-full bg-gray-50 dark:bg-gray-900/60 border border-indigo-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={form.first_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`w-full rounded-lg px-4 py-3 ${
                          editMode 
                            ? "bg-white border-2 border-indigo-400 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-900 dark:border-indigo-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-1 dark:focus:ring-indigo-400" 
                            : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={form.last_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`w-full rounded-lg px-4 py-3 ${
                          editMode 
                            ? "bg-white border-2 border-indigo-400 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-900 dark:border-indigo-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-1 dark:focus:ring-indigo-400" 
                            : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-indigo-600 dark:text-indigo-300 text-sm font-medium mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={form.bio || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full rounded-lg px-4 py-3 min-h-[120px] ${
                        editMode 
                          ? "bg-white border-2 border-indigo-400 text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-gray-900 dark:border-indigo-600 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-1 dark:focus:ring-indigo-400" 
                          : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                      }`}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end pt-6">
                    {editMode ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors mr-4 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-md dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-md dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-600"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}