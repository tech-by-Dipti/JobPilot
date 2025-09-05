const {MONGODB_USERNAME, MONGODB_PASSWORD}=process.env

export const connectionStr = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.vrje1bz.mongodb.net/jobpilot?retryWrites=true&w=majority&appName=Cluster0`