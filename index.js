const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
const fs = require("fs");

const app = express();

// middleware

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());

// axios headers

const headers = {
  Accept: "application/vnd.github.v3+json",
};

async function getCheckRun(run_id) {
  const result = await axios.get(
    `https://api.github.com/repos/wechorg/testwebhookcheckrun/check-runs/${run_id}`,

    {
      headers,
    }
  );

  return result.data;
}

async function listCheckRun(ref) {
  const result = await axios.get(
    `https://api.github.com/repos/wechorg/testwebhookcheckrun/commits/${ref}/check-runs`,

    {
      headers,
    }
  );

  return result.data;
}
//

app.post("/", async (req, res) => {
  try {
    // const payload = JSON.parse(req.body.payload);
    const payload = req.body;

    const payload_obj = JSON.parse(payload["payload"] + '"}}');
    const run_id = payload_obj.check_run.id;
    console.log(payload_obj.check_run.id);
    if (payload_obj.action === "created") {
      //const checkRun = await getCheckRun(payload_obj.check_run.id);

      const listcheckRuns = listCheckRun("main");
      const checkRun = getCheckRun(run_id);

      console.log(await checkRun);
      console.log(await listcheckRuns);
    }

    res.status(200).json({ message: "It works" });
  } catch (error) {
    res.status(500).json({ message: "ooops error" });
  }
});

app.use(async (req, res) => {
  try {
    res.status(404).json({ message: "Root Unavailable" });
  } catch (error) {
    res.status(500).json({ message: "ooops error" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`);
});
