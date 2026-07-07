import { useState, useCallback } from 'react';

export type ImportStep = 'upload' | 'map' | 'options' | 'progress' | 'success';

export interface CSVRow {
  [key: string]: string;
}

export interface ColumnMapping {
  [csvHeader: string]: string; // maps csv header to Lead field (e.g. 'email', 'firstName')
}

export function useLeadImport() {
  const [currentStep, setCurrentStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<CSVRow[]>([]);
  
  const [mapping, setMapping] = useState<ColumnMapping>({});
  
  const [defaultStatus, setDefaultStatus] = useState('New');
  const [tags, setTags] = useState<string[]>([]);
  const [updateExisting, setUpdateExisting] = useState(false);
  
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<{ total: number; success: number; failed: number } | null>(null);

  const handleUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setIsParsing(true);
    
    // Simulate parsing
    setTimeout(() => {
      setCsvHeaders(['Email Address', 'First Name', 'Last Name', 'Company Name']);
      setPreviewData([
        { 'Email Address': 'john@acme.com', 'First Name': 'John', 'Last Name': 'Doe', 'Company Name': 'Acme Corp' },
        { 'Email Address': 'jane@startup.io', 'First Name': 'Jane', 'Last Name': 'Smith', 'Company Name': 'Startup IO' },
        { 'Email Address': 'bob@bigco.net', 'First Name': 'Bob', 'Last Name': 'Johnson', 'Company Name': 'BigCo' },
      ]);
      setIsParsing(false);
      setCurrentStep('map');
    }, 1500);
  }, []);

  const handleStartImport = useCallback(() => {
    setCurrentStep('progress');
    setImportProgress(0);
    
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setImportResult({ total: 150, success: 148, failed: 2 });
            setCurrentStep('success');
          }, 500);
          return 100;
        }
        return prev + 15;
      });
    }, 400);
  }, []);

  return {
    currentStep,
    setCurrentStep,
    file,
    isParsing,
    csvHeaders,
    previewData,
    mapping,
    setMapping,
    defaultStatus,
    setDefaultStatus,
    tags,
    setTags,
    updateExisting,
    setUpdateExisting,
    importProgress,
    importResult,
    handleUpload,
    handleStartImport
  };
}
