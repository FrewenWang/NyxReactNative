package com.helloreactnative.multibundle;

import android.content.Context;

import com.frewen.aura.toolkits.common.FileUtils;
import com.frewen.aura.toolkits.common.IOStreamUtils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * @filename: DownLoaderManager
 * @introduction:
 * @author: Frewen.Wong
 * @time: 2020/6/7 21:51
 *         Copyright ©2020 Frewen.Wong. All Rights Reserved.
 */
class DownLoaderManager {

    public static final String BUNDLE_DOWNLOAD_PATH = "bundle-downloaded";//下载目录
    public static final String RN_NAME = "rn_bundle";//临时下载名


    public static final String FOLDER_RN = "bundles";//Bundle文件存储目标目录
    public static final String PACKAGE_FILE_NAME = "app.json";  // Bundle文件中中的App.json
    public static final String UNZIPPED_FOLDER_NAME = "unzipped"; // Bundle的解压路径

    public static final int DOWNLOAD_BUFFER_SIZE = 1024 * 256;   // 下载的缓存数据256KB

    public interface UpdateProgressListener {
        /**
         * 下载进度更新
         *
         * @param percent
         */
        void updateProgressChange(int percent);

        /**
         * 下载完成
         *
         * @param success
         */
        void complete(boolean success);
    }

    public static void downloadRNBundle(final Context context, final String url, final String md5, final UpdateProgressListener listener) {
        final String downloadPath = context.getFilesDir() + File.separator + BUNDLE_DOWNLOAD_PATH;
        final String fileName = RN_NAME;
        new Thread(new Runnable() {
            @Override
            public void run() {
                boolean result = true;
                try {
                    /// 文件下载
                    boolean tmpRet = DownLoaderManager.downloadFile(url, downloadPath, fileName, listener);
                    if (!tmpRet) {
                        result = false;
                    } else {
                        String filePath = downloadPath + File.separator + fileName;
                        String successStr = DownLoaderManager.processRnPackage(context, md5, filePath);
                        if (!"success".equals(successStr)) {
                            result = false;
                        }
                    }
                } catch (Exception e) {
                    result = false;
                } finally {
                    if (listener != null) {
                        listener.complete(result);
                    }
                }
            }
        }).start();
    }

    /**
     * 下载后的解压操作，这里是没有md5校验的，md5只作为一个目录来使用，实际中请自行添加md5校验
     *
     * @param context
     * @param md5     下载的文件的md5，这个可由服务端提供，这里的demo由于没服务端因此只当中目录
     * @param path    下载完的bundle的路径
     */
    public static String processRnPackage(Context context, String md5, String path) {
        String result = "failed";
        File downloadFile = new File(path);
        String newUpdateHash = md5;

        String newUpdateFolderPath = getPackageFolderPath(context, newUpdateHash);

        String newUpdateMetadataPath = appendPathComponent(newUpdateFolderPath, PACKAGE_FILE_NAME);

        if (FileUtils.isDirExist(newUpdateFolderPath)) {
            FileUtils.deleteFile(newUpdateFolderPath);
        }

        // Unzip the downloaded file and then delete the zip
        String unzippedFolderPath = appendPathComponent(getRNCodePath(context), UNZIPPED_FOLDER_NAME);
        //FileUtils.unZip(downloadFile, unzippedFolderPath);
        return "";
    }

    /**
     * 获取/data/data/com.helloreactnative/files/bundles/md5路径
     *
     * @param context
     * @param packageHash
     */
    public static String getPackageFolderPath(Context context, String packageHash) {
        return appendPathComponent(getRNCodePath(context), packageHash);
    }

    /**
     * 获取/data/data/com.helloreactnative/files/bundles的Bundle下载之后的拷贝路径
     *
     * @param context
     */
    public static String getRNCodePath(Context context) {
        String codePath = appendPathComponent(context.getFilesDir().getAbsolutePath(), FOLDER_RN);
        return codePath;
    }


    /**
     * @param basePath
     * @param appendPathComponent
     */
    public static String appendPathComponent(String basePath, String appendPathComponent) {
        return new File(basePath, appendPathComponent).getAbsolutePath();
    }

    /**
     * 文件下载相关逻辑
     *
     * @param url          下载地址URL
     * @param downloadPath 文件下载路径
     * @param fileName     下载文件名称
     * @param listener     下载进度回调
     */
    private static boolean downloadFile(String url, String downloadPath, String fileName, UpdateProgressListener listener) throws IOException {
        BufferedInputStream bufferedInputStream = null;
        BufferedOutputStream bufferedOutputStream = null;
        FileOutputStream fileOutputStream = null;
        HttpURLConnection connection = null;
        try {
            URL downloadUrl = new URL(url);
            // 打开Http连接
            connection = (HttpURLConnection) downloadUrl.openConnection();
            connection.setRequestProperty("Accept-Encoding", "identity");
            /// 实例化缓冲输入流，然后包装InputStream
            bufferedInputStream = new BufferedInputStream(connection.getInputStream());
            /// 获取传输数据的字节数
            long totalBytes = connection.getContentLength();

            // 记录接收到的字节数
            long receivedBytes = 0;

            // 根据传入的下载路径进行创建文件夹
            File downloadFolder = new File(downloadPath);
            downloadFolder.mkdirs();
            /// 实例化下载文件
            File downloadFile = new File(downloadFolder, fileName);
            // 实例化文件输出流
            fileOutputStream = new FileOutputStream(downloadFile);

            bufferedOutputStream = new BufferedOutputStream(fileOutputStream, DOWNLOAD_BUFFER_SIZE);
            // 实例化一个256KB的缓冲字节数组
            byte[] data = new byte[DOWNLOAD_BUFFER_SIZE];
            /// 4个字节的header字节数组
            byte[] header = new byte[4];

            int numBytesRead = 0;

            /// 按照每256KB的缓冲数据进行输入流的字节读取
            while ((numBytesRead = bufferedInputStream.read(data, 0, DOWNLOAD_BUFFER_SIZE)) >= 0) {
                if (receivedBytes < 4) {
                    for (int i = 0; i < numBytesRead; i++) {
                        int headerOffset = (int) (receivedBytes) + i;
                        if (headerOffset >= 4) {
                            break;
                        }

                        header[headerOffset] = data[i];
                    }
                }

                receivedBytes += numBytesRead;
                bufferedOutputStream.write(data, 0, numBytesRead);
                listener.updateProgressChange((int) (receivedBytes * 100 / totalBytes));
            }

            if (totalBytes != receivedBytes) {
                throw new IOException("Received " + receivedBytes + " bytes, expected " + totalBytes);
            }

        } catch (MalformedURLException e) {
            throw new IOException(url, e);
        } finally {
            try {
                // 先把输出流关闭，再把输入流关闭
                IOStreamUtils.closeAll(bufferedOutputStream, fileOutputStream);
                IOStreamUtils.closeAll(bufferedInputStream);
                if (connection != null) {
                    connection.disconnect();
                }
            } catch (Exception e) {
                throw new IOException("Error closing IO resources.", e);
            }

        }
        return true;
    }
}
