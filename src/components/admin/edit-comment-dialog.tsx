
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditCommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  text: string;
  date: string;
  onTextChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export function EditCommentDialog({ 
    isOpen, 
    onClose, 
    onSave,
    text,
    date,
    onTextChange,
    onDateChange,
}: EditCommentDialogProps) {

  const handleSave = () => {
    if (text.trim()) {
      onSave();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Make changes to the comment below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="comment-text">Comment Text</Label>
            <Textarea
              id="comment-text"
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment-date">Date</Label>
            <Input
              id="comment-date"
              type="datetime-local"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
