import { ReactNode, VFC } from "hoist-non-react-statics/node_modules/@types/react";

type Props = {
  children: ReactNode
};

export const AuthButton: VFC<Props> = (props) => {
  const { children } = props;

  return (
    <div>
      <button>{children}</button>
    </div>
  );
};
