const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { Readable } = require('stream');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 10 // Maximum 10 files
    }
});

// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Creates a stream from a buffer
 * @param {Buffer} buffer - The buffer to create a stream from
 * @returns {Readable} A readable stream
 */
const bufferToStream = (buffer) => {
    const readable = new Readable({
        read() {
            this.push(buffer);
            this.push(null);
        }
    });
    return readable;
};

/**
 * Uploads a single file to Cloudinary using streams
 * @param {Object} file - The file object from multer middleware
 * @param {Object} options - Additional options for upload (optional)
 * @returns {Promise<Object>} Object containing the secureUrl and other Cloudinary response data
 */
const uploadFile = (file, options = {}) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        // Set default options for upload
        const uploadOptions = {
            resource_type: "auto",
            folder:  process.env.CLOUDINARY_FOLDER_NAME,
            ...options
        };

        // Create upload stream
        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    console.error(`Error uploading file ${file.originalname}:`, error);
                    reject(new Error(`Failed to upload file ${file.originalname}`));
                    return;
                }

                resolve({
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    secureUrl: result.secure_url,
                    publicId: result.public_id,
                    format: result.format,
                    resourceType: result.resource_type,
                    size: result.bytes,
                    createdAt: result.created_at
                });
            }
        );

        // Convert buffer to stream and pipe to Cloudinary
        const fileStream = bufferToStream(file.buffer);
        fileStream.pipe(uploadStream)
            .on('error', (error) => {
                console.error(`Error streaming file ${file.originalname}:`, error);
                reject(new Error(`Failed to stream file ${file.originalname}`));
            });
    });
};

/**
 * Uploads multiple files to Cloudinary in parallel using streams
 * @param {Array<Object>} files - Array of file objects from multer middleware
 * @param {Object} options - Additional options for upload (optional)
 * @returns {Promise<Object>} Object containing upload results
 */
const uploadMultipleFiles = async (files, options = {}) => {
    try {
        if (!Array.isArray(files) || files.length === 0) {
            throw new Error('No files provided');
        }

        // Upload all files in parallel using Promise.all
        const uploadPromises = files.map(file => uploadFile(file, options));
        const results = await Promise.all(uploadPromises);

        // Filter out any failed uploads
        const successfulUploads = results.filter(result => result !== null);
        const failedUploads = results.length - successfulUploads.length;

        return {
            success: true,
            totalFiles: results.length,
            successfulUploads: successfulUploads.length,
            failedUploads,
            files: successfulUploads
        };
    } catch (error) {
        console.error('Error in bulk upload:', error);
        throw new Error('Failed to process one or more files');
    }
};

module.exports = {
    upload,
    uploadFile,
    uploadMultipleFiles
};
