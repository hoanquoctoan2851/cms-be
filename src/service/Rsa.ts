import NodeRSA from "node-rsa";

class RSAService {
  private keysPublic;
  private keysPrivate;
  private privateKey;
  private publicKey;

  constructor({
    privateKey,
    publicKey,
  }: {
    privateKey?: string;
    publicKey?: string;
  }) {
    const keys = new NodeRSA({ b: 512 });
    this.privateKey = privateKey || keys.exportKey("private");
    this.publicKey = publicKey || keys.exportKey("public");
    this.keysPrivate = new NodeRSA(this.privateKey);
    this.keysPublic = new NodeRSA(this.publicKey);
  }

  getPublicKey() {
    return this.publicKey;
  }

  getPrivateKey() {
    return this.privateKey;
  }

  encrypt(text: string) {
    return this.keysPublic.encrypt(text, "base64");
  }

  decrypt(text: string) {
    return this.keysPrivate.decrypt(text, "utf8");
  }
}

export default RSAService;
