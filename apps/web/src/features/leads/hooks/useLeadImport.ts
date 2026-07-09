import { useState, useCallback } from 'react';
import { apiFetch } from '../../../lib/api';
import { useRouter } from 'next/navigation';

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
  const [allParsedData, setAllParsedData] = useState<CSVRow[]>([]);
  const router = useRouter();

  const handleUpload = useCallback((uploadedFile: File) => {
    setFile(uploadedFile);
    setIsParsing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        setIsParsing(false);
        return;
      }
      
      const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
      if (lines.length > 0) {
        // Basic CSV splitting by comma, ignoring commas in quotes would be better but this is a simple fallback
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        setCsvHeaders(headers);
        
        const allData: CSVRow[] = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const row: CSVRow = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          allData.push(row);
        }
        
        setAllParsedData(allData);
        setPreviewData(allData.slice(0, 3));
      }
      setIsParsing(false);
      setCurrentStep('map');
    };
    reader.readAsText(uploadedFile);
  }, []);

  const handleStartImport = useCallback(async () => {
    setCurrentStep('progress');
    setImportProgress(20);
    
    try {
      const payload = allParsedData.map(row => {
        const lead: Record<string, string | string[]> = {
          status: defaultStatus,
          tags: tags,
        };
        // Map CSV columns to Lead fields based on `mapping` state
        Object.entries(mapping).forEach(([csvHeader, leadField]) => {
          if (leadField && leadField !== 'ignore') {
            lead[leadField] = row[csvHeader];
          }
        });
        return lead;
      });

      setImportProgress(60);

      const response = await apiFetch<{totalProcessed: number, successCount: number, errorCount: number}>('/import', {
        method: 'POST',
        body: JSON.stringify({
          sourceType: 'CSV',
          payload
        })
      });

      setImportProgress(100);
      setImportResult({ total: response.totalProcessed, success: response.successCount, failed: response.errorCount });
      setCurrentStep('success');
      
      // Refresh the router to reload the lead list on navigation
      router.refresh();
      
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Import failed', error);
      alert('Import failed: ' + error.message);
      setCurrentStep('map'); // go back on error
    }
  }, [allParsedData, mapping, defaultStatus, tags, router]);

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
