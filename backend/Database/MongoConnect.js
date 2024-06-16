import mongoose from "mongoose";

let connect =(coonection_string) => {
mongoose.connect(coonection_string, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log(error.message));
}

export default connect;
