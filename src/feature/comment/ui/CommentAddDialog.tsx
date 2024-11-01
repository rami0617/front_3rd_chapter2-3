import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui";
import { useAddComment, useComment } from "../model";

export const CommentAddDialog = () => {
  const { newComment, setComments, setNewComment, showAddCommentDialog, setShowAddCommentDialog } = useComment();

  const { mutate: addComment } = useAddComment({
    onSuccess: (data) => {
      if (data) {
        setComments((prev) => ({
          ...prev,
          [data.postId]: [...(prev[data?.postId] || []), data],
        }));
        setShowAddCommentDialog(false);
        setNewComment({ body: "", postId: null, userId: 1 });
      }
    },
  });

  const handeAddComment = () => {
    addComment(newComment);
  };

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handeAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
