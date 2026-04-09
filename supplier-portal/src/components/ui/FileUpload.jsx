import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { cn } from '../../utils/helpers';

const FileUpload = ({ label, accept = '.pdf,.jpg,.png', maxSize = 5, value, onChange, status = 'Not Uploaded' }) => {
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const simulateUpload = (file) => {
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setUploading(false); return 100; }
        return p + 20;
      });
    }, 200);
    onChange({ name: file.name, size: file.size });
  };

  const handleFile = (files) => {
    if (!files?.length) return;
    const f = files[0];
    if (f.size > maxSize * 1024 * 1024) return;
    simulateUpload(f);
  };

  const statusColor = status === 'Verified' ? 'border-green-500' : value ? 'border-accent' : 'border-dashed border-border';

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-semibold text-highlight">{label}</label>}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files); }}
        className={cn('relative border-2 rounded-xl p-4 text-center transition-all cursor-pointer', statusColor, dragging && 'border-primary bg-primary/5')}
      >
        {value ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              {status === 'Verified' ? <CheckCircle size={20} className="text-green-400" /> : <FileText size={20} className="text-primary" />}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-semibold text-highlight truncate">{value.name}</p>
              <p className="text-[10px] text-muted">{(value.size / 1024).toFixed(0)} KB</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); onChange(null); setProgress(0); }} className="text-muted hover:text-red-400 cursor-pointer"><X size={16} /></button>
          </div>
        ) : (
          <label className="cursor-pointer block py-4">
            <Upload size={24} className="mx-auto text-muted mb-2" />
            <p className="text-xs text-muted">Drop file or <span className="text-primary font-semibold">browse</span></p>
            <p className="text-[10px] text-muted mt-1">PDF, JPG, PNG — max {maxSize}MB</p>
            <input type="file" className="hidden" accept={accept} onChange={(e) => handleFile(e.target.files)} />
          </label>
        )}
        {uploading && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-border rounded-b-xl overflow-hidden">
            <div className="h-full bg-primary transition-all duration-200 rounded-b-xl" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
