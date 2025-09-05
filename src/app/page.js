import ResumeUploader from "@/components/ResumeUploader";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <main className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-800">
          Get AI-Powered Job Recommendations
        </h2>
        <p className="text-slate-600 mb-8 text-lg">
          Upload your resume and let our AI instantly match you with the best
          remote jobs worldwide.
        </p>

        {/* Upload box */}
        <ResumeUploader />
      </main>
    </div>
  );
}
