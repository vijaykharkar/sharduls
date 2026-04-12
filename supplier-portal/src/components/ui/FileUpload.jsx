import React, { useRef, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const FileUpload = ({ label, accept, maxSize = 10, value, onChange, status = 'Not Uploaded', disabled = false }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (files) => {
    if (!files?.length) return;
    const f = files[0];
    if (f.size > maxSize * 1024 * 1024) return;
    onChange(f);
  };

  const openPicker = (e) => {
    e.stopPropagation();
    if (disabled) return;
    inputRef.current?.click();
  };

  const clearFile = (e) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const displayName = value?.name || (typeof value === 'object' && value?.name) || null;
  const displaySize = value?.size ? (value.size / 1024).toFixed(0) : null;
  const hasFile = !!value;
  const statusColor = status === 'Verified' ? 'border-green-500' : hasFile ? 'border-violet-400' : 'border-dashed border-gray-300';

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-gray-700">{label}</label>}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={(e) => { handleFile(e.target.files); e.target.value = ''; }}
      />
      <div
        onClick={openPicker}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files); }}
        className={cn(
          'relative border-2 rounded-xl p-4 text-center transition-all cursor-pointer',
          statusColor,
          dragging && 'border-violet-500 bg-violet-50',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        {hasFile ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {status === 'Verified' ? <CheckCircle size={20} className="text-green-500" /> : <FileText size={20} className="text-violet-600" />}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{displayName || 'File selected'}</p>
              {displaySize && <p className="text-[10px] text-gray-500">{displaySize} KB</p>}
            </div>
            <button type="button" onClick={clearFile} className="text-gray-400 hover:text-red-500 cursor-pointer"><X size={16} /></button>
          </div>
        ) : (
          <div className="py-3">
            <Upload size={24} className="mx-auto text-gray-400 mb-2" />
            <p className="text-xs text-gray-500">Drop file or <span className="text-violet-600 font-semibold">browse</span></p>
            <p className="text-[10px] text-gray-400 mt-1">Any document — max {maxSize}MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
