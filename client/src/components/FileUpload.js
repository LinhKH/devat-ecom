import React, { useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [fileName, setFilename] = useState('Choose File');
    const [uploadFile, setUploadFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );
                }
            });
            // Clear percentage
            setTimeout(() => setUploadPercentage(0), 5000);

            const { fileName, filePath } = res.data;
            setUploadFile({ fileName, filePath });
            setFilename('');
            setMessage('File Uploaded.');
        } catch (err) {
            if (err.response.status === 500) {
                setMessage("There was a problem with the server.");
            } else {
                setMessage(err.response.data.msg);
            }
            setUploadPercentage(0)
        }

    }

    return (
        <>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file">
                    <input type="file" className="custom-file-upload" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="customFile">
                        {fileName}
                    </label>
                </div>
                {uploadPercentage !== 0 ? <Progress percentage={uploadPercentage} /> : null}
                <input type="submit" value="Upload" className="btn btn-primary btn-clock mt-4" />
            </form>
            {uploadFile ? <div className="row mt-5">
                <div className="col-md-6 m-auto">
                    <h3 className="text-center">{uploadFile.fileName}</h3>
                    <img style={{ width: '100%' }} src={uploadFile.filePath} />
                </div>
            </div> : null}
        </>
    )
}

export default FileUpload
