import CryptoJS from "crypto-js";

export default async function decrypt(req, res) {
    const { texto } = req.body;
    const decrypted = CryptoJS.AES.decrypt(texto, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);

    if (req.method === 'POST') {
        res.status(200).json({ decrypted })
    } else {
        res.status(404).json({ message: "Not found bro" })
    }
}