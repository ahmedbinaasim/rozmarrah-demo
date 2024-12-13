import * as React from "react"
import { X } from 'lucide-react'
import { Button } from "../../components/ui/Button"

interface EditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (value: string) => void
  title: string
  value: string
  children: React.ReactNode
}

export function EditModal({
  isOpen,
  onClose,
  onSave,
  title,
  value,
  children
}: EditModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(value)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

