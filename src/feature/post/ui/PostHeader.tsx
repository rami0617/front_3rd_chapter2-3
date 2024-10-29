import { Button, CardHeader, CardTitle } from "../../../shared/ui";
import { Plus } from "lucide-react";
import { usePostContext } from "../model/PostContext.tsx";

export const PostHeader = () => {
  const { setShowAddDialog } = usePostContext();

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>게시물 관리자</span>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </CardTitle>
    </CardHeader>
  );
};