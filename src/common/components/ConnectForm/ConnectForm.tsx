import { useFormContext } from "react-hook-form";

type UseFormContextType = ReturnType<typeof useFormContext>;

interface Props {
  children: (props: UseFormContextType) => JSX.Element;
}

export const ConnectForm = ({ children }: Props) => {
  const methods = useFormContext();
  return children({ ...methods });
};
