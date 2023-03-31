import CryptoJS from "crypto-js";

export default async function encrypt(req, res) {
    const { texto } = req.body;
    const encrypted = CryptoJS.AES.encrypt(texto, process.env.SECRET_KEY).toString();

    if (req.method === 'POST') {
        res.status(200).json({ encrypted })
    } else {
        res.status(404).json({ message: "Not found bro" })
    }
}