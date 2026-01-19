import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import supabase from "@/config/supabase";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // For modal
  const navigate = useNavigate();

  // Check admin
  useEffect(() => {
    const checkAdmin = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate("/signup");
        return;
      }

      setUser(session.user);

      // check admins table
      const { data, error } = await supabase
        .from("admins")
        .select("isAdmin")
        .eq("user_id", session.user.id)
        .single();

      if (error || !data?.isAdmin) {
        alert("Access denied! You are not an admin.");
        navigate("/");
        return;
      }

      setIsAdmin(true);
      fetchDoctors();
    };

    checkAdmin();
  }, [navigate]);

  // Fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("available_docters")
      .select(
        "docter_id, docter_name, specialization, is_verified, identity_doc_path, license_doc_path"
      );

    if (error) {
      console.error("Error fetching doctors:", error);
      setLoading(false);
      return;
    }

    setDoctors(data);
    setLoading(false);
  };

  // Toggle verification
  const toggleVerification = async (doctor) => {
    const { error } = await supabase
      .from("available_docters")
      .update({ is_verified: !doctor.is_verified })
      .eq("docter_id", doctor.docter_id);

    if (error) {
      console.error("Error updating verification:", error);
      alert("Failed to update verification");
      return;
    }

    // update local state
    setDoctors((prev) =>
      prev.map((d) =>
        d.docter_id === doctor.docter_id
          ? { ...d, is_verified: !d.is_verified }
          : d
      )
    );
  };

  // Get public URL for files
  const getFileUrl = (filePath) => {
    if (!filePath) return null;
    const { data } = supabase.storage.from("documents").getPublicUrl(filePath);
    return data.publicUrl;
  };

  if (!isAdmin) return null;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {user?.email}! You are an admin.</p>

      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.docter_id}
              className="p-4 border border-green-400/30 rounded-xl bg-white/5 backdrop-blur-sm flex flex-col gap-2"
            >
              <h2 className="text-xl font-semibold">{doctor.docter_name}</h2>
              <p className="text-gray-300">Specialization: {doctor.specialization}</p>
              <p
                className={`font-semibold ${
                  doctor.is_verified ? "text-green-400" : "text-red-400"
                }`}
              >
                {doctor.is_verified ? "Verified ✅" : "Pending ❌"}
              </p>

              {/* Identity & License */}
              <div className="flex flex-col gap-1">
                {doctor.identity_doc_path && (
                  <a
                    href={getFileUrl(doctor.identity_doc_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View Identity Document
                  </a>
                )}
                {doctor.license_doc_path && (
                  <a
                    href={getFileUrl(doctor.license_doc_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    View License Document
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <Button
                  className={`w-full ${
                    doctor.is_verified
                      ? "bg-red-500 hover:bg-red-400 text-black"
                      : "bg-green-500 hover:bg-green-400 text-black"
                  }`}
                  onClick={() => toggleVerification(doctor)}
                >
                  {doctor.is_verified ? "Unverify" : "Verify"}
                </Button>

                <Button
                  className="w-full bg-blue-500 hover:bg-blue-400 text-black"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  See Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for doctor details */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white/5 p-6 rounded-xl w-11/12 max-w-lg text-white flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-green-400">
              {selectedDoctor.docter_name} Details
            </h2>
            <p>Specialization: {selectedDoctor.specialization}</p>
            <p>Status: {selectedDoctor.is_verified ? "Verified ✅" : "Pending ❌"}</p>

            {selectedDoctor.identity_doc_path && (
              <a
                href={getFileUrl(selectedDoctor.identity_doc_path)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View Identity Document
              </a>
            )}

            {selectedDoctor.license_doc_path && (
              <a
                href={getFileUrl(selectedDoctor.license_doc_path)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                View License Document
              </a>
            )}

            <Button
              className="mt-4 bg-red-500 hover:bg-red-400 text-black w-full"
              onClick={() => setSelectedDoctor(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminDashboard;
