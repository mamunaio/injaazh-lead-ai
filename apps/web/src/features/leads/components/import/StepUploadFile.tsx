import React, { useRef, useState } from 'react';
import { UploadCloud, File, Loader2 } from 'lucide-react';

interface StepUploadFileProps {
  onUpload: (file: File) => void;
  isParsing: boolean;
}

export function StepUploadFile({ onUpload, isParsing }: StepUploadFileProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-[400px]">
      <h2 className="text-xl font-semibold text-card-foreground mb-2">Upload Leads CSV</h2>
      <p className="text-sm text-secondary-foreground mb-8">
        Upload a CSV or Excel file containing your leads. Maximum file size is 10MB.
      </p>

      <div 
        className={`flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center transition-colors relative overflow-hidden ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50 bg-secondary/10'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx"
          onChange={handleChange}
          className="hidden"
        />

        {isParsing ? (
          <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-medium text-foreground">Parsing file...</h3>
            <p className="text-sm text-secondary-foreground mt-1">Please wait while we read your file.</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drag & drop your file here
            </h3>
            <p className="text-sm text-secondary-foreground mb-6 max-w-sm">
              Supports .csv and .xlsx files up to 10MB. Make sure your file includes a header row.
            </p>
            <button
              onClick={() => inputRef.current?.click()}
              className="h-10 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
            >
              Browse Files
            </button>
          </>
        )}
      </div>
    </div>
  );
}
