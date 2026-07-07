import React from 'react';
import { CSVRow, ColumnMapping } from '../../hooks/useLeadImport';

interface StepMapColumnsProps {
  headers: string[];
  previewData: CSVRow[];
  mapping: ColumnMapping;
  setMapping: React.Dispatch<React.SetStateAction<ColumnMapping>>;
}

const LEAD_FIELDS = [
  { value: 'skip', label: 'Skip Column' },
  { value: 'email', label: 'Email Address (Required)' },
  { value: 'firstName', label: 'First Name' },
  { value: 'lastName', label: 'Last Name' },
  { value: 'company', label: 'Company' },
  { value: 'jobTitle', label: 'Job Title' },
  { value: 'phone', label: 'Phone' },
  { value: 'website', label: 'Website' },
  { value: 'linkedin', label: 'LinkedIn URL' },
];

export function StepMapColumns({ headers, previewData, mapping, setMapping }: StepMapColumnsProps) {
  const handleMapChange = (header: string, field: string) => {
    setMapping(prev => ({
      ...prev,
      [header]: field === 'skip' ? '' : field
    }));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold text-card-foreground mb-2">Map Columns</h2>
      <p className="text-sm text-secondary-foreground mb-6">
        Match the columns from your file to the corresponding lead fields. You must map the Email field.
      </p>

      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-secondary-foreground uppercase bg-secondary/20">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-6 py-4 border-b border-border min-w-[200px]">
                  <div className="mb-2 font-semibold text-foreground truncate" title={header}>
                    File: {header}
                  </div>
                  <select 
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={mapping[header] || 'skip'}
                    onChange={(e) => handleMapChange(header, e.target.value)}
                  >
                    {LEAD_FIELDS.map(field => (
                      <option key={field.value} value={field.value}>
                        {field.label}
                      </option>
                    ))}
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-secondary/5">
                {headers.map((header) => (
                  <td key={`${i}-${header}`} className="px-6 py-3 text-secondary-foreground truncate max-w-[200px]" title={row[header]}>
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-secondary-foreground">
        Showing 3 preview rows
      </div>
    </div>
  );
}
