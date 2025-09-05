'use client';
import JobCard from '@/components/Jobcard';   // ✅ fixed
import { useEffect, useState } from 'react';

export default function SavedPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/saved-jobs')
      .then((r) => r.json())
      .then(setJobs);
  }, []);

  const handleUnsave = async (id) => {
    await fetch('/api/save-job', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
    });
    setJobs((prev) => prev.filter((j) => j._id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Saved Jobs</h2>
      {jobs.length === 0 && <p className="text-slate-600">No saved jobs yet.</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((j) => (
          <JobCard key={j._id} job={j} onSave={() => handleUnsave(j._id)} />
        ))}
      </div>
    </div>
  );
}