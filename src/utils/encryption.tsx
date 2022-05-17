import CryptoJS from "crypto-js";

export class Encryption {
    /*----- Encruption using Advanced Encryption Standard (AES) ------*/
    static encrypt = (secretPhrase: string) => {
        // Encrypt the encrypted string
        var encryption = CryptoJS.AES.encrypt(secretPhrase, CryptoJS.enc.Utf8.parse("1234567890123456"), {mode: CryptoJS.mode.ECB});
        let encrypted = encryption.toString();
        return encrypted;
    };

    static decrypt = (encryptedPhrase: string) => {
        // Decrypt the encrypted string
        return CryptoJS.AES.decrypt(encryptedPhrase, "Secret Phrase").toString(CryptoJS.enc.Utf8);
    };
}
