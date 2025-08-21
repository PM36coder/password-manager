import React, { useState, useEffect } from "react";
import { API } from "../utils/Axios.jsx";
import { toast } from "react-toastify";
import { Eye, EyeOff, Edit, Trash, Copy, Plus } from "lucide-react";
// import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Manager = () => {
  const [passwords, setPasswords] = useState([]);
  const [form, setForm] = useState({ website: "", url: "", username: "", password: "" });
  const [editingId, setEditingId] = useState(null);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(false);
  const {  token } = useAuth(); // 'user' bhi use kar sakte hain

  const fetchPasswords = async () => {
    try {
      setLoading(true);
      const res = await API.get("/password/get-all-passwords");
      setPasswords(res.data.passwords);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching passwords");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Sirf tab passwords fetch karein jab token available ho
    if (token) {
      fetchPasswords();
    }
  }, [token]); // 'token' ko dependency mein add karein

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await API.put(`/password/edit-password/${editingId}`, form);
        toast.success(res.data.message);
        setEditingId(null);
      } else {
        const res = await API.post("/password/add-password", form);
        toast.success(res.data.message);
      }
      setForm({ website: "", url: "", username: "", password: "" });
      fetchPasswords();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving password");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this password?")) return;
    try {
      const res = await API.delete(`/password/delete-password/${id}`);
      toast.success(res.data.message);
      fetchPasswords();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting password");
    }
  };

  const handleEdit = (pass) => {
    setEditingId(pass._id);
    setForm({ website: pass.website, url: pass.url, username: pass.username, password: "" });
  };

  const handleShowPassword = async (id) => {
    if (visiblePasswords[id]) {
      setVisiblePasswords(prev => {
        const newVisible = { ...prev };
        delete newVisible[id];
        return newVisible;
      });
      return;
    }
    
    try {
      const res = await API.get(`/password/get-password/${id}`);
      setVisiblePasswords(prev => ({
        ...prev,
        [id]: res.data.password,
      }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching password");
    }
  };

  const handleCopy = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => toast.success("Copied to clipboard!"))
        .catch(() => toast.error("Failed to copy!"));
    } else {
      toast.error("Clipboard access not supported in this browser.");
    }
  };

  // Agar user login nahi hai, toh yeh UI render karein
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br mt-16 from-gray-900 via-zinc-900 to-black p-6 font-sans text-gray-200 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">You are not logged in</h1>
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black p-6 font-sans text-gray-200">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 drop-shadow-lg">
          🔑 Your Secure PassVault
        </h1>

        {/* Form to add/update password */}
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700 p-8 rounded-3xl shadow-2xl mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            {editingId ? "Update Existing Password" : "Add a New Password"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="website"
              placeholder="Website Name (e.g., Google)"
              value={form.website}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
              required
            />
            <input
              type="url"
              name="url"
              placeholder="Website URL (e.g., https://google.com)"
              value={form.url}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username or Email"
              value={form.username}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="bg-gray-700/50 border border-gray-600 text-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-500"
              required={!editingId}
            />
            <button
              type="submit"
              className="col-span-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl py-3 px-6 shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.01]"
            >
              {editingId ? <Edit size={20} /> : <Plus size={20} />}
              {editingId ? "Update Password" : "Add New Password"}
            </button>
          </form>
        </div>

        {/* Password Cards */}
        {loading ? (
            <p className="text-center text-gray-400 text-lg animate-pulse">Loading passwords...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {passwords.length === 0 ? (
                <p className="text-center text-gray-500 col-span-full text-lg">
                  No passwords saved yet. Add one above!
                </p>
              ) : (
                passwords.map((pass) => (
                  <div key={pass._id} className="bg-gray-800/50 backdrop-filter backdrop-blur-lg border border-gray-700 p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 relative">
                    <h2 className="font-bold text-xl mb-2 text-white">{pass.website}</h2>
                    <p className="text-gray-400 mb-1 flex items-center gap-2">
                      <span className="font-semibold text-gray-300">URL:</span>{" "}
                      <a href={pass.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors truncate w-2/3">
                        {pass.url}
                      </a>
                      <button onClick={() => handleCopy(pass.url)} className="text-gray-400 hover:text-white transition-colors">
                        <Copy size={16} />
                      </button>
                    </p>
                    <p className="text-gray-400 mb-1 flex items-center gap-2">
                      <span className="font-semibold text-gray-300">Username:</span>
                      <span className="truncate w-2/3">{pass.username}</span>
                      <button onClick={() => handleCopy(pass.username)} className="text-gray-400 hover:text-white transition-colors">
                        <Copy size={16} />
                      </button>
                    </p>
                    <p className="text-gray-400 mb-2 flex items-center gap-2">
                      <span className="font-semibold text-gray-300">Password:</span>{" "}
                      <span>
                        {visiblePasswords[pass._id] || "••••••••"}
                      </span>
                      <button onClick={() => handleCopy(visiblePasswords[pass._id] || pass.password)} className="text-gray-400 hover:text-white transition-colors">
                        <Copy size={16} />
                      </button>
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        onClick={() => handleShowPassword(pass._id)}
                        className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105"
                      >
                        {visiblePasswords[pass._id] ? <EyeOff size={16} /> : <Eye size={16} />} Show
                      </button>
                      <button
                        onClick={() => handleEdit(pass)}
                        className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(pass._id)}
                        className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <Trash size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
      </div>
    </div>
  );
};

export default Manager;
