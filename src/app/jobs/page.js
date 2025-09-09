"use client";
import JobCard from "@/components/Jobcard";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get skills from localStorage
    const storedSkills = JSON.parse(localStorage.getItem("userSkills") || "[]");
    setSkills(storedSkills);

    if (storedSkills.length > 0) {
      fetch("/api/search-jobs", {
        method: "POST",
        body: JSON.stringify({ skills: storedSkills }),
        headers: { "Content-Type": "application/json" },
      })
        .then((r) => r.json())
        .then((data) => {
          setJobs(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Job fetch error:", err);
          setLoading(false);
        });
    } else {
      setLoading(false); 
    }
  }, []);

  const handleSave = (job) => {
    fetch("/api/save-job", {
      method: "POST",
      body: JSON.stringify(job),
      headers: { "Content-Type": "application/json" },
    }).then(() => alert("Saved!"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Recommended Jobs</h2>

      {loading ? (
        <p className="text-sm text-slate-500">Loading jobs…</p>
      ) : jobs.length === 0 ? (
        <p className="text-sm text-slate-500">No jobs found for your skills.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((j) => (
            <JobCard key={j.id || j._id} job={j} onSave={handleSave} />
          ))}
        </div>
      )}
    </div>
  );
}
