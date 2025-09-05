
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  url: String,
  company_name: String,
  candidate_required_location: String,
  category: String,
  job_type: String,
  publication_date: String,
  savedAt: { type: Date, default: Date.now },
},
{ versionKey: false , }
);

export default mongoose.models.Job || mongoose.model('Job', JobSchema);


