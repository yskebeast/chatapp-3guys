export type Arrtype = {
  name: string;
  post: string;
  id: string;
  time: any;
};

export type InputPostType = {
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BoardPostType = {
  post: {
    name: string;
    post: string;
    id: string;
    time: any;
  };
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BoardPostModalType = {
  open: boolean;
  handleClose: () => void;
  formatTime: any;
  name: string;
  post: string;
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type BoardReplyPostType = {
  replypost: {
    name: string;
    post: string;
    id: string;
    time: any;
  };
  postId: string;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};