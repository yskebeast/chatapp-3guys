export type PostModalProps = {
  handleReply: () => Promise<void>;
  reply: string;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  board: any;
  open: boolean;
  handleClose: () => void;
};

export type PostProps = {
  board: {
    id: string;
    tweet: string;
    name: string;
    uid: string;
    time: any;
  };
};

export type ArrProps = {
  id: string;
  tweet: string;
  name: string;
  uid: string;
  time: any;
};

export type ReplyPostProps = {
  message: {
    name: string;
    tweet: string;
    id: string;
    time: any;
  };
  boardId: string;
};

export type ReplyPostModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  changeEdit: string;
  setChangeEdit: React.Dispatch<React.SetStateAction<string>>;
  handleReplyUpdate: () => Promise<void>;
  handleReplyDelete: () => Promise<void>;
};