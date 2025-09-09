'use client';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ResumeUploader() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const form = new FormData();
    form.append('resume', file);

    try {
      const res = await fetch('/api/parse-resume', {
        method: 'POST',
        body: form,
      });

      let finalText = '';

      if (!res.ok) {
        const msg = await res.text();
        finalText = ` Error: ${res.status} ${msg}`;
      } else {
        const json = await res.json();
        finalText = json.text || 'No text extracted';
      }

      setText(finalText);

      
      if (finalText && finalText.length > 20) {
        const skillsRes = await fetch('/api/extract-skill', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeText: finalText }),
        });

       if (skillsRes.ok) {
  const { skills } = await skillsRes.json();

  // Clean the skills
  const cleanedSkills = skills.map(s =>
    s.replace(/```json|```/g, '')  
     .replace(/\n/g, '')             
     .trim()                         
     .toLowerCase()                  
  );

  localStorage.setItem("userSkills", JSON.stringify(cleanedSkills));
  console.log("Cleaned Skills:", cleanedSkills);
}

      }
    } catch (err) {
      console.error('Upload failed:', err);
      setText(' Upload or parsing failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="relative border-2 border-dashed border-slate-300 rounded-2xl p-10 hover:border-sky-500 transition bg-white shadow-sm">
        <input
          id="resume"
          type="file"
          accept=".pdf,.docx"
          onChange={handleUpload}
          className="hidden"
        />
        <label htmlFor="resume" className="cursor-pointer flex flex-col items-center">
          {loading ? (
            <span className="text-sm text-sky-600 animate-pulse">⏳ Uploading & parsing…</span>
          ) : (
            <>
              <DocumentIcon className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-3 text-sm text-slate-700 font-medium">
                Drop your resume or{" "}
                <span className="text-sky-600 font-semibold">click to browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Only .pdf or .docx allowed[max:4.5MB]</p>
            </>
          )}
        </label>
      </div>

      {text && (
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl shadow-inner p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">📄 Extracted Text</h3>
          <div className="max-h-60 overflow-y-auto">
            <pre className="text-xs text-slate-600 whitespace-pre-wrap">{text}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
