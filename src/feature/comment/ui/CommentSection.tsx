import { Button, HighlightText } from "../../../shared/ui";
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react";
import { Comments } from "../../../entities/comment/model/types.ts";
import { useComment, useDeleteComment, useUpdateLike } from "../model";
import { usePost } from "../../post/model";
import { useState } from "react";

interface CommentSectionProps {
  postId: number;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const {
    comments,
    setNewComment,
    setSelectedComment,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setComments,
  } = useComment();

  const { searchQuery } = usePost();

  const [id, setId] = useState<number>();

  const { mutate: deleteComment } = useDeleteComment({
    onSuccess: () => {
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment: Comments) => comment.id !== id),
      }));
    },
  });

  const { mutate: updateLike } = useUpdateLike({
    onSuccess: (data) => {
      if (data) {
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].map((comment: Comments) => (comment.id === data.id ? data : comment)),
        }));
      }
    },
  });

  const handleDeleteComment = (id: number) => {
    setId(id);
    deleteComment({ id: id });
  };

  const handleLikeComment = (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);

    if (!comment) {
      console.error("댓글을 찾을 수 없습니다.");
      return;
    }

    updateLike({ id: id, body: comment.likes });
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment: Comments) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{HighlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment);
                  setShowEditCommentDialog(true);
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
