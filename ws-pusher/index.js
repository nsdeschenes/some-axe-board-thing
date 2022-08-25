const Pusher = require("pusher");
const express = require("express");
const cors = require("cors");

const pusher = new Pusher({
  appId: "app-id",
  key: "app-key",
  secret: "app-secret",
  host: "localhost",
  port: 6001,
  useTLS: false,
  cluster: "",
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.post("/pusher/auth", (req, res) => {
  const { channel_name, socket_id } = req.body;
  const { user_id } = req.headers;

  const auth = pusher.authorizeChannel(socket_id, channel_name, {
    user_id,
    user_info: {
      name: "cool user name"
    }
  })

  res.send(auth)
});

app.post("/push", (req, res) => {
  console.debug('pushing message')
  pusher.trigger("pushed-point", { message: "hello world" });
  res.send({ send: true })
})

const port = 6987
app.listen(port)
