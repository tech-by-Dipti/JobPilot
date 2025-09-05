"use client";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function JobCard({ job, onSave }) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-lg">{job.title}</CardTitle>
        <p className="text-sm text-slate-600">{job.company_name}</p>
        <p className="text-sm text-slate-600">{job.publication_date}</p>
      </CardHeader>
      <CardContent>
        <p className="text-xs bg-sky-100 text-sky-800 inline-block px-2 py-1 rounded mb-2">
          {job.candidate_required_location}
        </p>
        <div className="flex gap-2 mt-3">
          <a href={job.url} target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm">Apply</Button>
          </a>
          <Button size="sm" onClick={() => onSave(job)}>
            {job._id ? "Unsave" : "Save"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
