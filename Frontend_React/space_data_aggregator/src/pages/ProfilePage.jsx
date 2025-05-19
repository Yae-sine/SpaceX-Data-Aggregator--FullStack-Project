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
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-300 to-slate-100 text-gray-900 dark:from-black dark:via-gray-900 dark:to-indigo-950 dark:text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300/40 dark:bg-indigo-800/20 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-300/30 dark:bg-blue-900/20 rounded-full filter blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900 dark:text-white relative">
          <span className="relative inline-block">
            My Profile
            <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2/3 h-2 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700 rounded-full"></div>
          </span>
        </h1>
        
        {loading && (          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600 dark:border-indigo-500"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-indigo-200 dark:border-indigo-900/30 opacity-30"></div>
            </div>
          </div>
        )}

        {!loading && !profile && (            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center max-w-lg mx-auto shadow-lg dark:bg-red-900/30 dark:border-red-500 dark:text-red-200 backdrop-blur-sm">
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
            {message && (              <div className={`mb-6 text-center p-4 rounded-lg shadow-sm ${message.includes('successfully') ? 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-200 flex items-center justify-center' : 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-500 dark:text-red-200 flex items-center justify-center'}`}>
                {message.includes('successfully') ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {message}
              </div>
            )}            <div className="bg-indigo-50/95 dark:bg-gray-900/80 backdrop-blur-sm border border-indigo-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
              <div className="h-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-700"></div>
              <div className="absolute top-3 right-3 opacity-30 dark:opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-700 dark:text-indigo-300">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <div className="relative h-36 bg-gradient-to-r from-indigo-400 to-purple-400 dark:from-indigo-900 dark:to-purple-900">
                {/* User could have a banner image here in a future feature */}                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={
                        profilePicPreview ||
                        (profile && (profile.first_name || profile.username)
                          ? "https://ui-avatars.com/api/?name=" + (profile.first_name || profile.username) + "&background=6366f1&color=fff&size=128"
                          : "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128")
                      }
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 shadow-lg ring-2 ring-indigo-300/40 dark:ring-indigo-700/30"
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

              <div className="pt-20 px-8 pb-8">              <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-indigo-800 dark:text-white">
                    {profile.first_name && profile.last_name 
                      ? `${profile.first_name} ${profile.last_name}` 
                      : profile.username}
                  </h2>
                  <p className="text-indigo-600 dark:text-indigo-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    {profile.username}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">Username</label>                      <input
                        type="text"
                        value={profile.username || ''}
                        disabled
                        className="w-full bg-indigo-50/80 dark:bg-gray-900/60 border border-indigo-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">Email</label>                      <input
                        type="email"
                        value={profile.email || ''}
                        disabled
                        className="w-full bg-indigo-50/80 dark:bg-gray-900/60 border border-indigo-200 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">First Name</label>                      <input
                        type="text"
                        name="first_name"
                        value={form.first_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`w-full rounded-lg px-4 py-3 ${
                          editMode 
                            ? "bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                            : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">Last Name</label>                      <input
                        type="text"
                        name="last_name"
                        value={form.last_name || ''}
                        onChange={handleChange}
                        disabled={!editMode}
                        className={`w-full rounded-lg px-4 py-3 ${
                          editMode 
                            ? "bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                            : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-indigo-700 dark:text-indigo-300 mb-1 font-medium text-sm">Bio</label>                    <textarea
                      name="bio"
                      value={form.bio || ''}
                      onChange={handleChange}
                      disabled={!editMode}
                      className={`w-full rounded-lg px-4 py-3 min-h-[120px] ${
                        editMode 
                          ? "bg-white/80 dark:bg-gray-800 border border-indigo-200 dark:border-indigo-700 text-indigo-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                          : "bg-gray-50 border border-indigo-200 text-gray-700 dark:bg-gray-900/60 dark:border-gray-700 dark:text-white"
                      }`}
                      rows={4}
                    />
                  </div>                  <div className="flex justify-end pt-6">
                    {editMode ? (
                      <>
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all duration-300 mr-4 border border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-gray-700 transform hover:translate-y-[-2px] active:translate-y-0"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner dark:from-indigo-700 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-500 transform hover:translate-y-[-2px] active:translate-y-0"
                        >
                          Save Changes
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg active:shadow-inner dark:from-indigo-700 dark:to-indigo-600 dark:hover:from-indigo-600 dark:hover:to-indigo-500 transform hover:translate-y-[-2px] active:translate-y-0"
                      >
                        Edit Profile
                      </button>
                    )}                  </div>
                </form>
              </div>
              <div className="bg-indigo-200/60 dark:bg-indigo-900/20 py-3 px-6 text-center text-xs text-indigo-700 dark:text-indigo-400/70">
                <p>Explore the cosmos with our space data aggregator</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}