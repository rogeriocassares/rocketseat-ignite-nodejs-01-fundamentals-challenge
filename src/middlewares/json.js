export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    let bufferString = Buffer.concat(buffers).toString();
    req.body = JSON.parse(bufferString);
  } catch (e) {
    console.error(`error message: ${e.message}`);
    req.body = null;
  }
}


