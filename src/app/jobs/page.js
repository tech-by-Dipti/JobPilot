"use client";
import JobCard from "@/components/Jobcard";
import { useEffect, useState } from "react";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const skills = ["react", "nodejs", "mongo"];

  useEffect(() => {
    fetch("/api/search-jobs", {
      method: "POST",
      body: JSON.stringify({ skills }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then(setJobs);
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
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((j) => (
          <JobCard key={j.id || j._id} job={j} onSave={handleSave} />
        ))}
      </div>
    </div>
  );
}
