import { ApiCall } from "tsrpc";
import { ReqCompressImg, ResCompressImg } from "../../shared/tool/PtlCompressImg";
import sharp from 'sharp';
export default async function (call: ApiCall<ReqCompressImg, ResCompressImg>) {
    const imgBuf = call.req.imgBuf;
    // 使用 sharp 压缩图片
    const compressedImgBuf = await sharp(Buffer.from(imgBuf))
        .jpeg({ quality: 80 }) // 压缩质量设置为 80
        .toBuffer();

    call.succ({ imgBuf: new Uint8Array(compressedImgBuf) });
}