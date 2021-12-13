export type ArrPostType = {
   name: string;
   post: string;
   id: string;
   time: any;
   image?: string;
};

export type ArrReplyType = {
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
      image?: string;
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
   image: string;
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

export type BoardReplyPostModalProps = {
   handleClose: () => void;
   open: boolean;
   replypostId: string;
   replypost: string;
   postId: string;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};
