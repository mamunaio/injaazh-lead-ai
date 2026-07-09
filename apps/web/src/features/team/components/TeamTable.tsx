import React from 'react';
import { User, UserRole } from '../../../lib/api/users.service';
import { User as UserIcon, Trash2 } from 'lucide-react';
import clsx from 'clsx';

interface TeamTableProps {
  members: User[];
  onUpdateRole: (id: string, role: UserRole) => void;
  onRemove: (id: string) => void;
}

export function TeamTable({ members, onUpdateRole, onRemove }: TeamTableProps) {
  return (
    <div className="w-full bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-secondary-foreground uppercase bg-secondary/10 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Member</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-foreground">
            {members.map(member => (
              <tr key={member.id} className="hover:bg-secondary/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <UserIcon className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{member.firstName} {member.lastName}</div>
                      <div className="text-xs text-secondary-foreground">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={member.role}
                    onChange={(e) => onUpdateRole(member.id, e.target.value as UserRole)}
                    className="h-8 px-2 bg-secondary/10 border border-border rounded text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary capitalize cursor-pointer"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Admin">Admin</option>
                    <option value="Member">Member</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "px-2.5 py-1 rounded text-xs font-semibold capitalize",
                    member.isActive ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"
                  )}>
                    {member.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary-foreground">
                  {new Date(member.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onRemove(member.id)}
                      className="p-1.5 text-secondary-foreground hover:text-red-500 bg-secondary/10 hover:bg-secondary/20 rounded transition-colors" 
                      title="Remove Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
