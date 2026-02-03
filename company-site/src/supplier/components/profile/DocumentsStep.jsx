import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';

const DocumentsStep = () => {
  const [documents, setDocuments] = useState({
    gst: null,
    pan: null,
    registration: null,
    shopact: null,
  });

  const [uploading, setUploading] = useState({});

  const handleFileChange = (docType, file) => {
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setDocuments({ ...documents, [docType]: file });
    } else {
      alert('File size should not exceed 5MB');
    }
  };

  const handleUpload = async (docType) => {
    if (!documents[docType]) return;

    setUploading({ ...uploading, [docType]: true });
    
    // Simulate upload
    setTimeout(() => {
      setUploading({ ...uploading, [docType]: false });
      alert(`${docType.toUpperCase()} uploaded successfully!`);
    }, 2000);
  };

  const handleRemove = (docType) => {
    setDocuments({ ...documents, [docType]: null });
  };

  const documentTypes = [
    { key: 'gst', label: 'GST Certificate', required: true },
    { key: 'pan', label: 'PAN Card', required: true },
    { key: 'registration', label: 'Company Registration', required: true },
    { key: 'shopact', label: 'Shop Act Copy', required: false },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Documents</h2>
        <p className="text-gray-600">
          Please upload the following documents to verify your business
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Important Guidelines:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>All documents must be clear and readable</li>
              <li>Accepted formats: PDF, JPG, PNG</li>
              <li>Maximum file size: 5MB per document</li>
              <li>Documents should be valid and not expired</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {documentTypes.map((docType) => (
          <div key={docType.key} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {docType.label}
                    {docType.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {documents[docType.key] ? 'Uploaded' : 'Not uploaded'}
                  </p>
                </div>
              </div>
              {documents[docType.key] && (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
            </div>

            {!documents[docType.key] ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-3">
                  Drag and drop or click to upload
                </p>
                <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer text-sm">
                  Choose File
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(docType.key, e.target.files[0])}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-800">{documents[docType.key].name}</p>
                      <p className="text-sm text-gray-600">
                        {(documents[docType.key].size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleUpload(docType.key)}
                      disabled={uploading[docType.key]}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
                    >
                      {uploading[docType.key] ? 'Uploading...' : 'Upload'}
                    </button>
                    <button
                      onClick={() => handleRemove(docType.key)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default DocumentsStep;
