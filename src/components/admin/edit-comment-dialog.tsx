
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
import { useState, useEffect } from "react";
import { type CommentWithContext } from "@/app/admin/comments/page";

interface EditCommentDialogProps {
  comment: CommentWithContext | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (slug: string, commentId: string, newText: string, newDate: string) => void;
}

export function EditCommentDialog({ comment, isOpen, onClose, onSave }: EditCommentDialogProps) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (comment) {
      setText(comment.text);
      // Format date for the input type="datetime-local"
      const localDate = new Date(comment.date);
      const year = localDate.getFullYear();
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const day = String(localDate.getDate()).padStart(2, '0');
      const hours = String(localDate.getHours()).padStart(2, '0');
      const minutes = String(localDate.getMinutes()).padStart(2, '0');
      setDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, [comment]);

  const handleSave = () => {
    if (comment && text.trim()) {
      onSave(comment.postSlug, comment.id, text, new Date(date).toISOString());
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
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment-date">Date</Label>
            <Input
              id="comment-date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
