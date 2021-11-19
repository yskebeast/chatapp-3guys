import { ReactNode, VFC } from "react";

type Props = {
  children: ReactNode;
};

export const AuthButton: VFC<Props> = (props) => {
  const { children } = props;

  return (
    <div>
      <button>{children}</button>
    </div>
  );
};
