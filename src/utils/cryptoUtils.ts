import { BinaryLike, createHash } from "crypto";

export const hashData = (data: BinaryLike, opts?: HashDataOptions) => {
  const { hashType, digestType } = {
    ...defaultHashDataOptions,
    ...opts,
  };

  const hash = createHash(hashType).update(data).digest(digestType);
  return hash;
};

const defaultHashDataOptions = {
  hashType: "md5",
  digestType: "base64" as DigestType,
};

export interface HashDataOptions {
  hashType?: string;
  digestType?: DigestType;
}

export type DigestType = "latin1" | "hex" | "base64";
